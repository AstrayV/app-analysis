import { getRepository, getConnection, getManager } from 'typeorm';

import { Version_Entity } from '../entity/version_entity';

import * as _ from 'lodash';

import makePlist from '../common/makeplist';

interface insert_params {
    app_url: string,
    name: string,
    code: string,
    introdution: string,
    icon_url: string,
    type: number
    version: string,
    identifier?: string,
    plist?: string,
}
interface find_params {
    name: string,
    version: string,
    type: number
}

interface list_query {
    page: number,
    name?: string,
    limit?: number
}

class Version_Dao {
    constructor() {

    };
    async find_app_version(params: find_params) {
        const { name, version, type } = params;
        const result = await getRepository(Version_Entity).findOne({ name: name, version: version, type: type });
        return result;
    }

    async upload_version(params: insert_params) {
        const { name, version ,type} = params;
        const result = await getRepository(Version_Entity).findOne({ name: name, version: version ,type: type});
        if (result) {

            let plist:string
            if(params.type ===1){
                plist = await makePlist({
                    url: params.app_url,
                    name: params.name,
                    icon: params.icon_url,
                    version: params.version,
                    identifier: params.identifier
                });
            }
            const newValue = {
                app_url: params.app_url,
                name: params.name,
                code: params.code,
                introdution: params.introdution,
                icon_url: params.icon_url,
                built_times: result.built_times + 1,
                plist: plist,
            };
            const resValue = await getConnection()
                .createQueryBuilder()
                .update(Version_Entity)
                .set(newValue)
                .where("code =:code", { code: result.code })
                .execute();
            return resValue;
        } else {
            const newValue = _.cloneDeep(params);
            let plist:string
            if(params.type ===1){
                plist = await makePlist({
                    url: params.app_url,
                    name: params.name,
                    icon: params.icon_url,
                    version: params.version,
                    identifier: params.identifier
                });
                newValue.plist = plist
            };
            
            
            const resValue = await getConnection()
                .createQueryBuilder()
                .insert()
                .into(Version_Entity)
                .values([newValue])
                .execute();
            return resValue;
        }
    }

    async find_app_list(query: list_query) {
        const count = await getRepository(Version_Entity)
            .createQueryBuilder()
            .select('count(1)', 'count')
            .execute();
        console.log(count);
        const result = await getRepository(Version_Entity)
            .createQueryBuilder()
            .select("code")
            .addSelect("name")
            .addSelect("version")
            .addSelect("app_url")
            .addSelect("introdution")
            .addSelect("icon_url")
            .addSelect("type")
            .addSelect("download_times")
            .addSelect("built_times")
            .addSelect("size")
            .addSelect("DATE_FORMAT(update_at,'%Y-%m-%d %H:%i:%s') as update_at")
            .skip((query.page - 1) * 10)
            .take(query.limit || 10)
            .execute();
        return {
            data: result,
            total: count[0].count
        }
    }

    async download_count_add(code: string) {
        // const result = await getConnection()
        // .createQueryBuilder()
        // .update(Version_Entity)
        // .set('')
        // .where("code =:code", { code: code })
        // .execute();
        const result = await getConnection().createQueryBuilder()
            .update(Version_Entity)
            .set({ download_times: () => "download_times + 1" })
            .where("code =:code", { code: code })
            .execute();
        return result;
    }
    //
    async get_download_info(code: string) {
        const result = await getRepository(Version_Entity).createQueryBuilder()
            .select("code")
            .addSelect("name")
            .addSelect("version")
            .addSelect("app_url")
            .addSelect("introdution")
            .addSelect("icon_url")
            .addSelect("type")
            .addSelect("download_times")
            .addSelect("built_times")
            .addSelect("size")
            .addSelect('plist')
            .addSelect("DATE_FORMAT(update_at,'%Y-%m-%d %H:%i:%s') as update_at")
            .where("code =:code", { code: code })
            .execute();
        return result;
    }
}

export default new Version_Dao();