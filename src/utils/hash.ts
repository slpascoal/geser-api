import bcrypt from "bcrypt";

export function validatePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}
