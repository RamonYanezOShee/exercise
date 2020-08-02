import { Injectable } from '@nestjs/common';
import { Person } from '../entities/person.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePersonDto } from '../dtos/create-person-dto';
//import { CreatePersonDto } from '../dtos/create-person-dto';

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


// this it will the real find method (but isn't real database id)    
/*
    async findByNationalityId(id: string): Promise<Person> {
    return await this.personRepository.find()
    }
*/

    async create(personDto: CreatePersonDto){
        const newPerson = new Person();
        newPerson.nationalId = personDto.nationalId;
        newPerson.name = personDto.name;
        newPerson.lastName = personDto.lastName;
        newPerson.age = personDto.age;
        newPerson.pictureUrl = personDto.pictureUrl;
        return await this.personRepository.save(newPerson);
    }


    async update(personDto: CreatePersonDto, id: string){
        const personTobeUpdated = await this.personRepository.findOne(id);        
        personTobeUpdated.name = personDto.name;
        personTobeUpdated.lastName = personDto.lastName;
        personTobeUpdated.age = personDto.age;
        personTobeUpdated.pictureUrl = personDto.pictureUrl;
        return this.personRepository.save(personTobeUpdated);
    }



    async remove(id: number) {
        return await this.personRepository.delete(id);
    }


}