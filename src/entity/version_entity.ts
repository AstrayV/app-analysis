import { Entity, Column, PrimaryGeneratedColumn,OneToOne,CreateDateColumn,UpdateDateColumn,PrimaryColumn} from "typeorm";


@Entity('tbl_version')
export class Version_Entity {

    // @PrimaryGeneratedColumn()
    // public id:number;

    @Column('varchar')
    public name:string;

    @Column('varchar')
    public version: string;

    @Column('varchar')
    public app_url: string;
    //生成随机码;
    @PrimaryColumn('varchar')
    public code: string;

    @Column('varchar')
    public introdution: string;

    @Column('varchar')
    public icon_url: string;
    //1 ios 2 android
    @Column('int')
    public type: number;

    @Column({
        type: 'int',
        default: 0
    })
    public download_times: number;

    @Column({
        type: 'int',
        default: 1
    })
    public built_times: number;

    @Column('int')
    public size: number;

    @Column({
        type: 'varchar',
        default: ''
    })
    public plist: string;


    @CreateDateColumn({
        length: 0
    })
    public create_at: Date;

    @UpdateDateColumn({
        length: 0
    })
    public update_at: Date;
    
    // @OneToOne(type => Apartment, apartment => apartment.id)
    // public apartment_name: string;
}