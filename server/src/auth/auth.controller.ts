import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login_DTO, Register_DTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authServies: AuthService) {}

  @Post('register')
  register(@Body() regidterDto: Register_DTO) {
    return this.authServies.register(regidterDto);
  }

  @Post('login')
  login(@Body() loginDto: Login_DTO) {
    return this.authServies.login(loginDto);
  }
}
