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

    
   @Get(':nationalId')
   getById(@Param('nationalId') personId,@Res() response){
       this.personService.findByNationalityId(personId).then( person => {
           response.status(HttpStatus.OK).json(person);
       }
       ).catch( (error) => {
           if(error.message == 'nf'){
            response.status(HttpStatus.NOT_FOUND).json({"statusCode": 404, "message": "Person not found"});
           }
           else{
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({"statusCode": 500, "message": "INTERNAL SERVER ERROR"});                      
           }        
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
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({person: 'Error creating a person'});
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

}
