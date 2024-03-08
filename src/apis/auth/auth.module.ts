import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';

@Module({
  imports: [
    JwtModule.register({}),
    UsersModule, //
  ],
  providers: [
    JwtAccessStrategy,
    AuthResolver, //
    AuthService,
  ],
})
export class AuthModule {}
