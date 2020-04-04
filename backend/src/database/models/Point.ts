import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from 'typeorm'
import {User} from "./User";
import {Military} from "./Military";

@Entity("points")
export class Point extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    name!: string;

    @Column()
    xPoint!: number;

    @Column()
    yPoint!: number;

    @ManyToOne(() => P)
    military: Military;
}