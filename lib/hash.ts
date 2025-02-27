import { hash, compare } from "bcryptjs";

export const hashPassword = async (password: string) => {
  return await hash(password, 10);
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string
) => {
  return await compare(password, hashedPassword);
};
