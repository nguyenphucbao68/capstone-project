import { user } from "@prisma/client";
import { ContextInterface } from "../context";
import dotenv from "dotenv";
import {
  OktaAuth,
  OktaAuthOptions,
  // TokenManagerInterface,
  // AccessToken,
  // IDToken,
  // UserClaims,
  // TokenParams
} from '@okta/okta-auth-js';
import okta from "@okta/okta-sdk-nodejs";
dotenv.config();
const client = new okta.Client({
  orgUrl: 'https://trial-7162432.okta.com',
  token: '00Lro-6tQleA85IJK7ebwNFkJBJXnAVA3FLCqVzwpd',
});

const config: OktaAuthOptions = {
  issuer: process.env.OKTADOMAIN || 'https://trial-7162432.okta.com/oauth2/default',
};

const authClient: OktaAuth = new OktaAuth(config);
// const tokenManager: TokenManagerInterface = authClient.tokenManager;
// const accessToken: AccessToken = await tokenManager.get('accessToken') as AccessToken;
// const idToken: IDToken = await tokenManager.get('idToken') as IDToken;
// const userInfo: UserClaims = await authClient.token.getUserInfo(accessToken, idToken);

// if (!userInfo) {
//   const tokenParams: TokenParams = {
//     scopes: ['openid', 'email', 'custom_scope'],
//   };
//   authClient.token.getWithRedirect(tokenParams);
// }


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
    try {
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

    }
    catch (err: any) {
      throw new Error(err);
    }
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
    try {
      const user = await prisma.user.update({
        where: {
          id,
        },
        data: {
          is_deleted: { set: true }
        },
      });
      return user;
    } catch (err: any) {
      throw new Error(err);
    }
  },
  hardDelUser: async (
    _: any,
    { id }: { id: string },
    { prisma }: ContextInterface,
  ): Promise<user> => {
    try {
      const user = await prisma.user.delete({
        where: {
          id,
        },
      });
      await client.userApi.deactivateUser({ userId: user.okta_id ?? "" });
      await client.userApi.deleteUser({ userId: user.okta_id ?? "" });
      return user;
    } catch (err: any) {
      throw new Error(err);
    }
  },


  //auth
  signUp: async (_: any,
    { input }: { input: user },
    { prisma }: ContextInterface,
  ): Promise<String> => {
    try {
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
    }
    catch (err: any) {
      throw new Error(err);
    }
  },
  signIn: async (_: any,
    { input }: { input: user },
    { prisma }: ContextInterface,
  ): Promise<String | undefined> => {
    return authClient.signInWithCredentials({
      username: input.email ?? '',
      password: input.password?.toString() ?? ''
    })
      .then(function (transaction) {
        if (transaction.status === 'SUCCESS') {
          // authClient.session.setCookieAndRedirect(transaction.sessionToken); // Sets a cookie on redirect
          console.log(transaction.sessionToken)
          return transaction.sessionToken;
        } else {
          throw new Error(transaction.status);
        }
      })
      .catch(function (err) {
        throw new Error(err);
      });
  },
  resetPassword: async (_: any,
    { email }: { email: string },
    { prisma }: ContextInterface,
  ): Promise<String> => {
    try {
      // const response = await axios.get(`https://${yourOktaDomain}/api/v1/users/${email}`, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     // 'Authorization': apiToken
      //   }
      // });
      // const userId = response.data.id;
      // await axios.post(`https://${yourOktaDomain}/api/v1/users/${userId}/lifecycle/reset_password?sendEmail=false`, {}, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     // 'Authorization': apiToken
      //   }
      // });
      return "ok";
    } catch (error) {
      // console.error(error);
      return "Reset password failed";
    }
  },
};
export default { Query, Mutation };
