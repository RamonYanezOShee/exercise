import { Exclude } from 'class-transformer';

export class PersonResponseDto { 
    nationalId: string;
    name: string;
    lastName: string;
    age: number;
    pictureUrl: string;
}
