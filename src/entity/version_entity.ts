import { Entity, Column, PrimaryGeneratedColumn,OneToOne,CreateDateColumn,UpdateDateColumn,PrimaryColumn} from "typeorm";


@Entity('tbl_version')
export class Version_Entity {

    // @PrimaryGeneratedColumn()
    // public id:number;

    @PrimaryColumn('varchar')
    public name:string;

    @Column('varchar')
    public app_url: string;
    //生成随机码;
    @Column('varchar')
    public code: string;

    @Column('varchar')
    public introdution: string;



    @CreateDateColumn()
    public create_at: string;

    @UpdateDateColumn()
    public update_at: string;
    
    // @OneToOne(type => Apartment, apartment => apartment.id)
    // public apartment_name: string;
}