import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne} from 'typeorm'
import {Military} from "./Military";

@Entity("users")
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    name!: string;

    @Column()
    surName!: string;

    @Column()
    place!: string;

    @Column()
    militaryDate!: Date;

    @OneToOne(type => Military)
    military!: Military;
}