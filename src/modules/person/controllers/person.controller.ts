import { Controller, Get, Body, Post, Put, Delete, Res, HttpStatus, Param, HttpException, BadRequestException, UnauthorizedException, SerializeOptions, UseInterceptors } from '@nestjs/common';
import { PersonService } from '../services/person.service';
import { CreatePersonDto } from '../dtos/create-person-dto';
import { PersonResponseDto } from '../dtos/person-response-dto';
import { Errorinterceptor } from '../interceptors/errorinterceptor';
import { response } from 'express';


@UseInterceptors(Errorinterceptor)
@Controller('people')
export class PersonController {

    constructor(private personService: PersonService) {}


    @Get()
    getAll(){
        return this.personService.findAll();
    }

   
    @Get(':nationalId')
    async getById(@Param('nationalId') personId): Promise<PersonResponseDto>{
        return this.personService.findByNationalityId(personId);
    }

    
    @Post()
    create(@Body() createPersonDTO: CreatePersonDto,@Res() response){        
        return this.personService.createPerson(createPersonDTO).then(p => {
            response.status(HttpStatus.CREATED).json(p);
        });
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
