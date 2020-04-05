import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, PrimaryColumn} from 'typeorm'
import {Military} from "./Military";

@Entity("users")
export class User extends BaseEntity {
    @PrimaryColumn()
    id!: string;

    @Column()
    name!: string;

    @Column()
    img!: string;

    @Column()
    userName!: string;

    @Column()
    userSurName!: string;

    @Column()
    userImgLink!: string;

    @Column()
    patronymic!: string;

    @Column()
    surName!: string;

    @Column()
    military!: string;
}