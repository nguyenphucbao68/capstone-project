import { user } from "@prisma/client";
import { ContextInterface } from "../context";
import { client, authClient } from "../../utils/okta-config"

const Query = {
  user: async (
    _: any,
    {
      id,
    }: {
      id: string;
    },
    { prisma }: ContextInterface,
  ): Promise<user> => {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new Error("User not found!");
    }
    return user;
  },
  users: async (
    _: any,
    __: any,
    { prisma }: ContextInterface,
  ): Promise<user[]> => {
    return await prisma.user.findMany();
  },


  helloWord: async (): Promise<string> => {
    return "Hello Word";
  },
};

const Mutation = {
  //user CRUD
  createUser: async (
    _: any,
    { input }: { input: user },
    { prisma }: ContextInterface,
  ): Promise<user | null> => {
    const body = {
      profile: {
        firstName: input.name ? input.name.toString() : undefined,
        lastName: ".",
        email: input.email ? input.email.toString() : undefined,
        login: input.email ? input.email.toString() : undefined
      },
      credentials: {
        password: { value: input.password?.toString() ?? "" }
      }
    }
    const result = await client.userApi.createUser({ body });
    const user = await prisma.user.create({
      data: {
        ...input,
        role: input.role || 0,
        password: Buffer.from(input.password ?? ""),
        okta_id: result.id,
      },
    });
    return user;
  },
  updateUser: async (
    _: any,
    { id, input }: { id: string; input: user },
    { prisma }: ContextInterface,
  ): Promise<user> => {
    console.log(input.dob); // nhan vao date o dang dd/mm/yyyy
    // const dobDate = input.dob ? new Date(input.dob.toString().split("/").reverse().join("/")) : null;
    // console.log(dobDate)
    const _data = {
      ...input,
      dob: input.dob ? new Date(input.dob.toString().split("/").reverse().join("/")) : null,
    }
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: _data,
    });
    return user;
  },
  deleteUser: async (
    _: any,
    { id }: { id: string },
    { prisma }: ContextInterface,
  ): Promise<user> => {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        is_deleted: { set: true }
      },
    });
    return user;
  },
  hardDelUser: async (
    _: any,
    { id }: { id: string },
    { prisma }: ContextInterface,
  ): Promise<user> => {
    const user = await prisma.user.delete({
      where: {
        id,
      },
    });
    await client.userApi.deactivateUser({ userId: user.okta_id ?? "" });
    await client.userApi.deleteUser({ userId: user.okta_id ?? "" });
    return user;
  },


  //auth
  signUp: async (_: any,
    { input }: { input: user },
    { prisma }: ContextInterface,
  ): Promise<string> => {
    const body = {
      profile: {
        firstName: input.name ? input.name.toString() : undefined,
        lastName: ".",
        email: input.email ? input.email.toString() : undefined,
        login: input.email ? input.email.toString() : undefined
      },
      credentials: {
        password: { value: input.password?.toString() ?? "" }
      }
    }
    const result = await client.userApi.createUser({ body });
    const user = await prisma.user.create({
      data: {
        ...input,
        role: input.role || 0,
        password: Buffer.from(input.password ?? ""),
        okta_id: result.id,
      },
    });
    if (result && user)
      return "Sign up success";
    else
      return "Sign up faild";
  },
  signIn: async (_: any,
    { input }: { input: user },
    { prisma }: ContextInterface,
  ): Promise<string | undefined> => {
    // return authClient.signInWithCredentials({
    //   username: input.email ?? '',
    //   password: input.password?.toString() ?? ''
    // })
    //   .then(function (transaction) {
    //     if (transaction.status === 'SUCCESS') {
    //       // authClient.session.setCookieAndRedirect(transaction.sessionToken); // Sets a cookie on redirect
    //       return transaction.sessionToken;
    //     } else {
    //       throw new Error(transaction.status);
    //     }
    //   })
    //   .catch(function (err) {
    //     throw new Error(err);
    //   });
    const transaction = await authClient.signInWithCredentials({
      username: input.email ?? '',
      password: input.password?.toString() ?? ''
    });
    if (transaction.status === 'SUCCESS') {
      return transaction.sessionToken;
    } else {
      throw new Error(transaction.status);
    }
  },
  resetPassword: async (_: any,
    { email }: { email: string },
    { prisma }: ContextInterface,
  ): Promise<string | undefined> => {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    const rp = await client.userApi.forgotPassword({
      userId: user?.okta_id ?? "",
      sendEmail: false
    })
    return rp.resetPasswordUrl;
  },
};
export default { Query, Mutation };
