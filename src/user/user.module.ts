import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { providers } from 'src/providers';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [...providers, UserService],
})
export class UserModule {}
