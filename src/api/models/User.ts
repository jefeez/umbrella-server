import { PrismaClient, User as IUser } from '@prisma/client';

const prisma = new PrismaClient();

const User = prisma.user;

export { IUser };

export default User;
