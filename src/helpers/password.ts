import * as bcrypt from 'bcrypt';

export const hashPassword = async (pwd: string) => {
  const salt = await bcrypt.genSalt();
  const hashedPwd = await bcrypt.hash(pwd, salt);
  return hashedPwd;
};

export const comparePassword = async (pwd: string, hashPwd: string) => {
  const result = await bcrypt.compare(pwd, hashPwd);
  return result;
};
