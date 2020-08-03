import { Injectable, HttpException, HttpStatus, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { Person } from '../entities/person.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePersonDto } from '../dtos/create-person-dto';
import { error } from 'console';


@Injectable()
export class PersonService {

    constructor(
        @InjectRepository(Person)
        private readonly personRepository: Repository<Person>,
    ){}


// Let's fill services operations: 

    async findAll(): Promise<Person[]> {
        return await this.personRepository.find();
    }


    async findOne(id: string): Promise<Person> {
        return await this.personRepository.findOne(id);
    }


    async findByNationalityId(idNat: string): Promise<Person> {
        const person = await this.personRepository.findOne({ where: { nationalId: idNat} });
        if(person == undefined){throw new Error('Person not found') ;}
        // return new HttpException('number1 504', HttpStatus.GATEWAY_TIMEOUT);
        return person;
    }


    async createPerson(personDto: CreatePersonDto): Promise<Person>{
        const newPerson = new Person();                
        newPerson.nationalId = personDto.nationalId;
        newPerson.name = personDto.name;
        newPerson.lastName = personDto.lastName;
        newPerson.age = personDto.age;
        newPerson.pictureUrl = personDto.pictureUrl;        
        return await this.personRepository.save(newPerson);
    }


    async update(personDto: CreatePersonDto, id: string): Promise<Person>{
        const personTobeUpdated = await this.personRepository.findOne(id);
        if(personTobeUpdated == undefined){throw new Error('Person not found') ;}
        personTobeUpdated.name = personDto.name;
        personTobeUpdated.lastName = personDto.lastName;
        personTobeUpdated.age = personDto.age;
        personTobeUpdated.pictureUrl = personDto.pictureUrl;
        return this.personRepository.save(personTobeUpdated);
    }



    async remove(id: number): Promise<any> {
        return await this.personRepository.delete(id);
    }


    /*
    async removeFake(id: number): Promise<any> {
        if (id == 1) {
            return new HttpException('number1 504', HttpStatus.GATEWAY_TIMEOUT);
          } else if (id == 2) {
            return new HttpException('other 500', HttpStatus.INTERNAL_SERVER_ERROR);
          }
          else{
              return error;
          }        
    }
    */


}