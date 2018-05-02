import { Entity, Column, PrimaryGeneratedColumn,OneToOne,CreateDateColumn,UpdateDateColumn} from "typeorm";

import "reflect-metadata";
@Entity('user')
export class User_Entity {

    @PrimaryGeneratedColumn()
    public id:number;

    @Column('varchar')
    public username:string;

    @Column('varchar')
    public password:string;

    @CreateDateColumn()
    public create_at: string;

    @UpdateDateColumn()
    public update_at: string;
    
    // @OneToOne(type => Apartment, apartment => apartment.id)
    // public apartment_name: string;
}