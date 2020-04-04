import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne} from 'typeorm'
import {Point} from "./Point";

@Entity("military")
export class Military extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    name!: string;

    @Column()
    value!: string;

    @OneToMany(type => Point, point => point.military)
    points!: Point[]
}