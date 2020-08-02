import { Controller, Get } from '@nestjs/common';
import { PersonService } from '../services/person.service';


@Controller('person')
export class PersonController {

    constructor(private readonly personService: PersonService) {}

}
