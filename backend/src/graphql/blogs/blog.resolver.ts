import { blog } from "@prisma/client";
import { ContextInterface } from "../context";

const Query = {
  //Show list of blogs
  blogs: async (
    _: any,
    _args: any,
    { prisma }: ContextInterface,
  ): Promise<blog[]> => {
    const blogs = await prisma.blog.findMany();
    return blogs;
  },
  //Show single blog
    blog: async (
        _: any,
        { id }: { id: number },
        { prisma }: ContextInterface,
    ): Promise<blog | null> => {
        const singleBlog = await prisma.blog.findUnique({
        where: {
            id,
        },
        });
        return singleBlog;
    },
};
const Mutation = {
    //Add a new blog
    createBlog: async (
        _: any,
        { input }: { input: blog },
        { prisma }: ContextInterface,
    ): Promise<blog> => {
        const newBlog = await prisma.blog.create({
        data: input,
        });
        return newBlog;
    },
    // Update an existing blog by ID
    updateBlog: async (
        _: any,
        { id, input }: { id: string; input: blog },
        { prisma }: ContextInterface,
    ): Promise<blog | null> => {
        const blogId = parseInt(id);
    
        const existingBlog = await prisma.blog.findUnique({
        where: { id: blogId },
        });
    
        if (!existingBlog) {
        throw new Error(`Blog with ID ${id} does not exist`);
        }
    
        const updatedBlog = await prisma.blog.update({
        where: { id: blogId },
        data: input,
        });
    
        return updatedBlog;
    },
    // Delete a blog by ID
    deleteBlog: async (
        _: any,
        { id }: { id: string },
        { prisma }: ContextInterface,
    ): Promise<blog | null> => {
        const blogId = parseInt(id);
    
        const existingBlog = await prisma.blog.findUnique({
        where: { id: blogId },
        });
    
        if (!existingBlog) {
        throw new Error(`Blog with ID ${id} does not exist`);
        }
    
        const deletedBlog = await prisma.blog.delete({
        where: { id: blogId },
        });
    
        return deletedBlog;
    },
    };
export default { Query, Mutation };