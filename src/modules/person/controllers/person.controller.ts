import { Controller, Get, Body, Post, Put, Delete, Res, HttpStatus, Param, HttpException, BadRequestException, UnauthorizedException, SerializeOptions } from '@nestjs/common';
import { PersonService } from '../services/person.service';
import { CreatePersonDto } from '../dtos/create-person-dto';
import { exception } from 'console';
import { promises } from 'dns';
import { PersonResponseDto } from '../dtos/person-response-dto';
import { response } from 'express';



@Controller('person')
export class PersonController {

    constructor(private personService: PersonService) {}


    @Get()
    getAll(@Res() response){
        this.personService.findAll().then(personList => {
            response.status(HttpStatus.OK).json(personList);
        }
        ).catch(() => {
            response.status(HttpStatus.FORBIDDEN).json({person:'Cant obtain person list'});
        }
        );
    }
   
    @Get(':nationalId')
    async getById(@Param('nationalId') personId){
        return this.personService.findByNationalityId(personId);
    }

    
    @Post()
    create(@Body() createPersonDTO: CreatePersonDto): Promise<PersonResponseDto>{        
        return this.personService.createPerson(createPersonDTO);
    }

            
    @Put(':id')
    update(@Body() updatePersonDto: CreatePersonDto, @Param('id') personId): Promise<PersonResponseDto>{
        return this.personService.update(updatePersonDto,personId);
    }


    @Delete(':id')
    delete(@Param('id') personId): Promise<any>{
        return this.personService.remove(personId);
    }

}
