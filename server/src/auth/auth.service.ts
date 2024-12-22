import {
  ForbiddenException,
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { Login_DTO, Register_DTO } from './dto';
import { PrismaClient, Prisma } from '@prisma/client';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
const prisma = new PrismaClient();
@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  async login(loginDTO: Login_DTO) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: loginDTO.email,
        },
      });

      console.log('Login attempt:', {
        email: loginDTO.email,
        userFound: !!user,
      });

      if (!user) {
        throw new UnauthorizedException('Invalid email or password');
      }

      const passwordValid = await argon.verify(
        user.password,
        loginDTO.password,
      );

      console.log('Password verification:', { valid: passwordValid });

      if (!passwordValid) {
        throw new UnauthorizedException('Invalid email or password');
      }

      const { password, ...userWithoutPassword } = user;
      const payload = { sub: user.id, username: user.username };

      return {
        user: userWithoutPassword,
        message: 'Login successful',
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }
  async register(registerDTO: Register_DTO) {
    try {
      console.log('Registration attempt:', {
        ...registerDTO,
        password: '[REDACTED]',
      });

      const { username, email, password } = registerDTO;

      if (!username || !email || !password) {
        throw new ForbiddenException('All fields are required');
      }

      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [{ email }, { username }],
        },
      });

      if (existingUser) {
        const errorMessage =
          existingUser.email === email
            ? 'Email already registered'
            : 'Username already taken';
        console.log('Registration failed:', errorMessage);
        throw new ConflictException(errorMessage);
      }

      const hashedPassword = await argon.hash(password);

      const user = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
        select: {
          id: true,
          username: true,
          email: true,
        },
      });

      console.log('Registration successful:', {
        userId: user.id,
        username: user.username,
      });

      return {
        message: 'User created successfully',
        user,
      };
    } catch (error) {
      console.error('Registration error:', error);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Username or email already exists');
        }
      }

      if (error.status) {
        throw error;
      }

      throw new Error('Registration failed: ' + error.message);
    }
  }
}
