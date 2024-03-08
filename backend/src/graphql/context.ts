import { PrismaClient, user } from "@prisma/client";
import { RedisClient } from "redis";

export interface ContextInterface {
  prisma: PrismaClient;
  redis: RedisClient;
  authUser: user;
}
