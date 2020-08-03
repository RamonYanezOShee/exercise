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


    async findAll(): Promise<Person[]> {
        return await this.personRepository.find();
    }


    async findOne(id: string): Promise<Person> {
        return await this.personRepository.findOne(id);
    }


    async findByNationalityId(idNat: string): Promise<Person> {
        const person = await this.personRepository.findOne({ where: { nationalId: idNat} });
        if(person == undefined){
            throw new Error("nf");
        }
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


    async update(personDto: CreatePersonDto, natId: string): Promise<Person>{
        const personTobeUpdated = await this.findByNationalityId(natId);
        // if(personTobeUpdated == undefined){throw new Error('Person not found') ;}
        personTobeUpdated.name = personDto.name;
        personTobeUpdated.lastName = personDto.lastName;
        personTobeUpdated.age = personDto.age;
        personTobeUpdated.pictureUrl = personDto.pictureUrl;
        return this.personRepository.save(personTobeUpdated);
    }

    async remove(natId: string): Promise<any> {
        const personToBeDeleted = await this.findByNationalityId(natId);
        //if(personToBeDeleted == undefined){throw new Error('Person not found') ;}
        console.log('here?');
        return await this.personRepository.delete(personToBeDeleted.id);
    }
    
}