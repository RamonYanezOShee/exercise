import { Injectable, HttpException, HttpStatus, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { Person } from '../entities/person.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Entity } from 'typeorm';
import { CreatePersonDto } from '../dtos/create-person-dto';
import { PersonResponseDto } from '../dtos/person-response-dto';
import { classToPlain } from 'class-transformer';



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

    
    // Universal 404
    private async _findByNationalId(idNat: string): Promise<Person> {
        const person = await this.personRepository.findOne({ where: { nationalId: idNat} });
        if(person == undefined){throw new HttpException('Person not Found', HttpStatus.NOT_FOUND);}
        return person;
    }


    async findByNationalityId(idNat: string): Promise<PersonResponseDto> {
        const person = await this._findByNationalId(idNat);
        return this.entityToDTO(person);
    }

    
    async createPerson(personDto: CreatePersonDto): Promise<PersonResponseDto>{
            const newPerson = new Person();                
            newPerson.nationalId = personDto.nationalId;
            newPerson.name = personDto.name;
            newPerson.lastName = personDto.lastName;
            newPerson.age = personDto.age;
            newPerson.pictureUrl = personDto.pictureUrl;
        try{
            const person =  await this.personRepository.save(newPerson);
            return this.entityToDTO(person);
        }catch{ // OTHER ERRORS 500
            throw new HttpException('INTERNAL SERVER ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }

    
    async update(personDto: CreatePersonDto, natId: string): Promise<PersonResponseDto>{
        const personTobeUpdated = await this._findByNationalId(natId);        
        try{
        personTobeUpdated.name = personDto.name;
        personTobeUpdated.lastName = personDto.lastName;
        personTobeUpdated.age = personDto.age;
        personTobeUpdated.pictureUrl = personDto.pictureUrl;        
        const person = await this.personRepository.save(personTobeUpdated);
        return this.entityToDTO(person);
        }catch{ // OTHER ERRORS 500
            throw new HttpException('INTERNAL SERVER ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async remove(natId: string): Promise<any> {        
        const personToBeDeleted = await this._findByNationalId(natId);
        const personDeleted = this.entityToDTO(personToBeDeleted);
        this.personRepository.delete(personToBeDeleted.id);
        return personDeleted;
    }
    

    private entityToDTO(person: Person): PersonResponseDto{
        const resp = new PersonResponseDto();
        resp.nationalId = person.nationalId;
        resp.name = person.name;
        resp.lastName = person.lastName;
        resp.age = person.age;
        resp.pictureUrl = person.pictureUrl;
        return resp;
    }

    


}