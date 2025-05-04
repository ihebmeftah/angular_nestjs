import { Module } from '@nestjs/common';
import { CongesService } from './conges.service';
import { CongesController } from './conges.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conge } from './entities/conge.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([
      Conge,
    ])
  ],
  controllers: [CongesController],
  providers: [CongesService],
})
export class CongesModule { }
