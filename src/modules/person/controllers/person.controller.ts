import { Controller, Get, Body, Post, Put, Delete, Res, HttpStatus, Param, HttpException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { PersonService } from '../services/person.service';
import { CreatePersonDto } from '../dtos/create-person-dto';
import { exception } from 'console';



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

    /*
    @Get(':id')
    getById(@Param('id') personId,@Res() response){
        this.personService.findOne(personId).then( personList => {
            response.status(HttpStatus.OK).json(personList);
        }
        ).catch( () => {
            response.status(HttpStatus.NOT_FOUND).json({person: 'Person not found'});
        }
        );
    }
    */

   @Get(':nationalId')
   getById(@Param('nationalId') personId,@Res() response){
       this.personService.findByNationalityId(personId).then( person => {
           response.status(HttpStatus.OK).json(person);
       }
       ).catch( () => {
           response.status(HttpStatus.NOT_FOUND).json({person: 'Person not found'});
           //return new HttpException('Person not found', HttpStatus.NOT_FOUND);
       }
       );
   }



    // TODO: IMPLEMENT OTHERS  ERROR TYPES  201, 400, 500
    @Post()
    create(@Body() createPersonDTO: CreatePersonDto, @Res() response){
        console.log('el DTO es:', createPersonDTO)
        this.personService.createPerson(createPersonDTO).then( person => {
            response.status(HttpStatus.CREATED).json(person);
        }).catch( () => {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({person: 'Error to create a person'});
        }
        );
    }

        
    // TODO: IMPLEMENT OTHERS  ERROR TYPES  200, 404, 400, 500
    @Put(':id')
    update(@Body() updatePersonDto: CreatePersonDto, @Res() response, @Param('id') personId){
        this.personService.update(updatePersonDto,personId).then( person => {
            response.status(HttpStatus.OK).json(person);
        }
        ).catch(() => {
            response.status(HttpStatus.FORBIDDEN).json({person: 'exception'});
        }
        );
    }


    @Delete(':id')
    delete(@Res() response, @Param('id') personId ){
        this.personService.remove(personId).then( res => {
            response.status(HttpStatus.OK).json(res);
        }
        ).catch( () => {
            response.status(HttpStatus.NOT_FOUND).json({person: 'cannot delete this id'});
        }
        );
    }


/*
    @Delete(':errortype')
    deleteFake(@Res() response, @Param('errortype') errortype ){
        // throw new HttpException('custom message', HttpStatus.FORBIDDEN); // this it works        
        this.personService.removeFake(errortype).then( res => {
            response.status(HttpStatus.OK).json(res);
        }).catch(()=> {
            response.status(HttpStatus.FORBIDDEN).json({person: 'exception default ? 403 '});
        }
        );
    }
*/

}
