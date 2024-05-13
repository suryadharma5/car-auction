import { Exclude } from "class-transformer";
import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterUpdate, AfterRemove } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    //agar password tidak ikut dikirimkan
    @Exclude()
    password: string

    @AfterInsert()
    logInsert() {
        console.log(`inserted : ${this.id}`)
    }

    @AfterUpdate()
    logUpdate() {
        console.log(`updated: ${this.id}`)
    }

    @AfterRemove()
    logRemove() {
        console.log(`removed: ${this.id}`)
    }
}