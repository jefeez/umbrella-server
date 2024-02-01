import { Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';
import { IUser } from '../models/User';
import userRepository from '../repositories/user.repository';
import { HttpExcept } from '../../utils/helper';

const already = async (where: Prisma.UserWhereUniqueInput, message: string) => {
  const user = await userRepository.findOne(where);
  if (user) {
    HttpExcept(message, 409);
    return null;
  }
  return user;
};

const existing = async (
  where: Prisma.UserWhereUniqueInput,
  error: { message: string; status: number }
) => {
  const user = await userRepository.findOne(where);
  if (!user) {
    HttpExcept(error.message, error.status);
    return null;
  }
  return user;
};

const signup = async (data: Omit<IUser, 'id'>) => {
  await already({ username: data.username }, 'username already used');
  await already({ email: data.email }, 'email already registered');
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(data.password, salt);
  const user = await userRepository.create({ ...data, password: hashed });
  if (!user) {
    HttpExcept('something wrong when registering new user', 500);
  }
  return { ...user, password: undefined };
};

const signin = async (data: Omit<IUser, 'id' | 'avatar' | 'username'>) => {
  const user = await existing(
    { email: data.email },
    { message: 'no user found with this email', status: 401 }
  );
  if (user) {
    // checking password
    const isMatch = await bcrypt.compare(data.password, user.password);

    if (!isMatch) {
      HttpExcept('wrong password', 401);
    }
    return { ...user, password: undefined };
  }

  return null;
};

const auth = async (id: string) => {
  const user = await existing({ id }, { message: 'no user found with this id', status: 401 });
  if (user) {
    return { ...user, password: undefined };
  }
  return null;
};

const avatar = async (id: string, url: string) => {
  await existing({ id }, { message: 'user not found', status: 404 });
  const user = await userRepository.update({ id }, { avatar: url });
  return { ...user, password: undefined };
};

export default { signup, signin, avatar, auth };
