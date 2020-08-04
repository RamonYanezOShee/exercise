import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './modules/person/entities/person.entity';
import { PersonModule } from './modules/person/person.module';
import { PersonService } from './modules/person/services/person.service';
import { PersonController } from './modules/person/controllers/person.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
	  type: 'mysql',
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
