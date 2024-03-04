import { user } from "@prisma/client";
import { ContextInterface } from "../context";
import axios from "axios";
import { error } from "console";

const yourOktaDomain = 'trial-7162432.okta.com';
const apiToken = 'SSWS 00Lro-6tQleA85IJK7ebwNFkJBJXnAVA3FLCqVzwpd';
// const apiToken = 'SSWS 00fbaYJG2PFnl4vyCD6jf4R3HMK9WFsMdeL6IZenrK';


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
  currentUser: async (_: any, __: any, { user }: any) => {
    if (!user) {
      throw new Error('You must be logged in to view this information.');
    }
    return user;
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
    const signupData = {
      profile: {
        firstName: input.name,
        lastName: ".",
        email: input.email,
        login: input.email
      },
      credentials: {
        password: { value: input.password }
      }
    }
    await axios.post(`https://${yourOktaDomain}/api/v1/users?activate=true`, signupData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiToken
      }
    })
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
    try {
      const _id = Number(id);
      const user = await prisma.user.delete({
        where: {
          id: _id,
        },
      });

      const response = await axios.get(`https://${yourOktaDomain}/api/v1/users/${user.email}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': apiToken
        }
      });
      const userId = response.data.id;
      await axios.delete(`https://${yourOktaDomain}/api/v1/users/${userId}?sendEmail=true`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': apiToken
        }
      });
      return user;
    } catch (error) {
      // console.error(error);
      throw new Error("Delete fail");
    }
  },


  //auth
  signUp: async (_: any,
    { input }: { input: user },
    { prisma }: ContextInterface,
  ): Promise<String> => {

    const userData = {
      ...input,
      role: input.role || 0,
      password: input.password ? Buffer.from(input.password) : undefined,
      // password: input.password ? encoder.encode(input.password.toString()) : undefined,
    };
    const user = await prisma.user.create({
      data: userData,
    });

    const signupData = {
      profile: {
        firstName: input.name,
        lastName: ".",
        email: input.email,
        login: input.email
      },
      credentials: {
        password: { value: input.password }
      }
    }
    console.log(signupData);
    return await axios.post(`https://${yourOktaDomain}/api/v1/users?activate=true`, signupData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiToken
      }
    }).then(response => {
      // console.log(response.data);
      return "ok";
    }).catch(error => {
      console.log(error)
      return "Signup failed";
    });


  },
  signIn: async (_: any,
    { input }: { input: user },
    { prisma }: ContextInterface,
  ): Promise<{ authToken: String, user: user }> => {
    const signinData = {
      username: input.email,
      password: input.password,
      options: {
        multiOptionalFactorEnroll: false,
        warnBeforePasswordExpired: false,
      }
    }
    try {
      const response = await axios.post(`https://${yourOktaDomain}/api/v1/authn`, signinData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': apiToken
        }
      })
      // if (error)
      //   throw new Error("Authentication failed");
      console.log(error)
      // if (response.data)
      console.log(response.data.sessionToken)
      const user = await prisma.user.findFirst({
        where: {
          email: input.email,
        },
      });
      if (response && user)
        return { authToken: response.data.sessionToken, user: user };
      else {
        throw new Error("User not found");
      }
    } catch (error) {
      console.error(error);
      throw new Error("Authentication failed");
    }
  },
  resetPassword: async (_: any,
    { email }: { email: string },
    { prisma }: ContextInterface,
  ): Promise<String> => {
    try {
      const response = await axios.get(`https://${yourOktaDomain}/api/v1/users/${email}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': apiToken
        }
      });
      const userId = response.data.id;
      await axios.post(`https://${yourOktaDomain}/api/v1/users/${userId}/lifecycle/reset_password?sendEmail=false`, {}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': apiToken
        }
      });
      return "ok";
    } catch (error) {
      // console.error(error);
      return "Reset password failed";
    }
  },
};
export default { Query, Mutation };
