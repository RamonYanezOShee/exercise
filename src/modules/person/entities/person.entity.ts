import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Person {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nationalId: string;

    @Column()
    name: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @Column()
    pictureUrl: string;
}
