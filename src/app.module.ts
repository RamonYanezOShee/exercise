import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './modules/person/entities/person.entity';
import { PersonService } from './modules/person/services/person.service';
import { PersonController } from './modules/person/controllers/person.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
<<<<<<< HEAD
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
	  type: 'mysql',
=======
    ConfigModule.forRoot(),    
    TypeOrmModule.forRoot({
      type: 'mysql',
>>>>>>> feature/8080
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Person])
  ],

  controllers: [AppController, PersonController],
  providers: [AppService, PersonService],
})
export class AppModule {}
