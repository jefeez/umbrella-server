import { Prisma } from '@prisma/client';
import User, { IUser } from '../models/User';

const create = async (data: Omit<IUser, 'id'>) => {
  const entity = await User.create({ data });
  return entity;
};

const findAll = async (where: Prisma.UserWhereInput) => {
  const entity = await User.findMany({ where });
  return entity;
};

const findOne = async (where: Prisma.UserWhereUniqueInput) => {
  const entity = await User.findUnique({ where });
  return entity;
};

export default { create, findAll, findOne };
