import "reflect-metadata";

import { getRepository, getConnection, getManager } from 'typeorm';
import { User_Entity } from '../entity/user_entity';


interface params {
    username: string,
    password: string,
}

interface add_params extends params {
    phone: string,
    apartment_id: number,
    name: string,
}

interface user {
    username: string,
    id: number
}

interface query {
    page: number,
    limit?: number,
    name?: string,
}


class User_dao {
    constructor() {

    }

    find_user_by_username = async (params: params) => {
        const userRepository = getRepository(User_Entity);
        const user = await userRepository.findOne({ username: params.username });
        return user;
    }

    add_new_user = async (params: add_params) => {
        const result = await getConnection()
            .createQueryBuilder()
            .insert()
            .into(User_Entity)
            .values([params])
            .execute();
        return result;
    }



    delete_user = async (id: number) => {
        const result = await getConnection()
            .createQueryBuilder()
            .delete().from(User_Entity)
            .where(`id = ${id}`)
            .execute();
        return result;
    }
}



export default new User_dao();

