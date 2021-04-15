import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SignUpDto } from './dto/signup.dto';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { JwtPayload } from './interfaces/jwt-payload.interface';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}
  async signUp(authDto: SignUpDto): Promise<any> {
    const { username, password } = authDto;
    const exist = await this.userModel.findOne({ username });
    if (exist) {
      throw new ConflictException(`username already exist`);
    }
    try {
      const user = new this.userModel();
      user.username = username;
      user.password = await this.hashPassword(password);
      await user.save();
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
  async login(authDto: SignUpDto): Promise<any> {
    const { username, password } = authDto;
    const exist = await this.userModel.findOne({ username });
    if (!exist) {
      throw new UnauthorizedException('username not found');
    }
    const isMatch = await this.comparePassword(password, exist.password);
    if (!isMatch) {
      throw new UnauthorizedException('inavlid password');
    }
    const payload: JwtPayload = { username: exist.username, id: exist._id };
    const accessToken = await this.createJwtToken(payload);
    return { accessToken, payload };
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  private async comparePassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  private async createJwtToken(payload: any): Promise<string> {
    return this.jwtService.sign(payload);
  }
}
