import { Body, Controller, Get, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { GetUser } from './decorator/get-user.decorator';
import { SignUpDto } from './dto/signup.dto';
import {User} from './interfaces/user.interface'
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) authDto: SignUpDto): Promise<any> {
    return this.authService.signUp(authDto);
  }
  @Post('/login')
  login(@Body(ValidationPipe) authDto: SignUpDto): Promise<{acessToken :string}> {
    return this.authService.login(authDto);
  }

  @Post('/')
  @UseGuards(AuthGuard())
  current(@GetUser() user:User) {
    return user
  }
}
