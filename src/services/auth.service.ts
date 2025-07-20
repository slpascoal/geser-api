import prisma from '../config/prisma';
import { hashPassword, validatePassword } from '../utils/hash';
import { generateToken } from '../utils/token';

export class AuthService {
  async register(email: string, password: string) {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new Error('Email already in use');

    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
      data: { email, passwordHash },
    });

    const token = generateToken({ id: user.id, email: user.email });
    return { user, token };
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.passwordHash) throw new Error('Invalid credentials');

    const isValid = await validatePassword(password, user.passwordHash);
    if (!isValid) throw new Error('Invalid credentials');

    const token = generateToken({ id: user.id, email: user.email });
    return { user, token };
  }
}
