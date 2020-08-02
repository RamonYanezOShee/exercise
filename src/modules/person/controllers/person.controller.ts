import { Controller, Get, Body, Post, Put, Delete } from '@nestjs/common';
import { PersonService } from '../services/person.service';
import { CreatePersonDto } from '../dtos/create-person-dto';


@Controller('person')
export class PersonController {

    constructor(private personService: PersonService) {}

    // Mock services 
    @Get()
    getAll(){
        return 'All person list';
    }

    @Get(':id')
    getById(){
        return 'Getting single person by id';
    }

    @Post()
    create(@Body() createPersonDTO: CreatePersonDto){
        return 'Persona creada';
    }
    
    @Put(':id')
    update(){
        return 'Person id updated!';
    }

    @Delete(':id')
    delete(){
        return 'Person id deleted!';
    }






}
