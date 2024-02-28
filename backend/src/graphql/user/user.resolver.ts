import { user } from "@prisma/client";
import { ContextInterface } from "../context";

const Query = {
  user: async (
    _: any,
    {
      id,
    }: {
      id: number;
    },
    { prisma }: ContextInterface,
  ): Promise<user> => {
    const _id = Number(id);
    const user = await prisma.user.findUnique({
      where: {
        id: _id,
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
  createUser: async (
    _: any,
    { input }: { input: user },
    { prisma }: ContextInterface,
  ): Promise<user> => {

    const userData = {
      ...input,
      role: input.role || 0,
      password: input.password ? Buffer.from(input.password) : undefined,
      // password: input.password ? encoder.encode(input.password.toString()) : undefined,
    };

    const user = await prisma.user.create({
      data: userData,
    });
    return user;
  },

  updateUser: async (
    _: any,
    { id, input }: { id: string; input: user },
    { prisma }: ContextInterface,
  ): Promise<user> => {
    const _id = Number(id);
    console.log(input.dob); // nhan vao date o dang dd/mm/yyyy
    // const dobDate = input.dob ? new Date(input.dob.toString().split("/").reverse().join("/")) : null;
    // console.log(dobDate)
    const _data = {
      ...input,
      dob: input.dob ? new Date(input.dob.toString().split("/").reverse().join("/")) : null,
    }
    const user = await prisma.user.update({
      where: {
        id: _id,
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
    const _id = Number(id);
    const user = await prisma.user.delete({
      where: {
        id: _id,
      },
    });
    return user;
  },
};
export default { Query, Mutation };
