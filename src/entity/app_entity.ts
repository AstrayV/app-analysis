import { Entity, Column, PrimaryGeneratedColumn,OneToOne,CreateDateColumn,UpdateDateColumn} from "typeorm";


@Entity('tbl_app')
export class App_Entity {

    @PrimaryGeneratedColumn()
    public id:number;

    @Column('varchar')
    public name:string;

    @CreateDateColumn()
    public create_at: string;

    @UpdateDateColumn()
    public update_at: string;
    
    // @OneToOne(type => Apartment, apartment => apartment.id)
    // public apartment_name: string;
}