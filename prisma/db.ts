import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

const globalForPrisma = globalThis;

/**
 * @type {PrismaClient}
 */
const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// e.g. in `pages/index.tsx`
/*
import prisma from './db'

export const getServerSideProps = async () => {
  const posts = await prisma.post.findMany()

  return { props: { posts } }
}
*/