import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class FsContainer {

    constructor(filename) {
        this.path = (path.join(__dirname, '/', filename));
        console.log(this.path)
    };

    async create(data){
        try{
            data.timestamp = Date.now();
            const items = await fs.promises.readFile(this.path);
            const itemsObject = JSON.parse(items);
            itemsObject.push(data);
            await fs.promises.writeFile(this.path, JSON.stringify(itemsObject, null, 2));
            return data;
        }catch(err){
            throw new Error(err);
        }
    };

    async getAll(){
        try{
            const data = await fs.promises.readFile(this.path);
            return JSON.parse(data);
        }catch(err){
            throw new Error(err);
        }
    };

    async getOne(uuid){
        try{
            const items = await this.getAll();
            const item = items.filter(i => i.uuid == uuid);
            if(item.length === 0){
                return null
            };
            return item[0];
        }catch(err){
            throw new Error(err);
        }
    };

    async update(uuid, data){
        try{
            const items = await this.getAll();
            const item = items.find( i => i.uuid === uuid );
            if(item === undefined){
                return null
            } 
            const newList = await items.map(i => {
                if(i.uuid === uuid){
                    return {
                        name: data.name,
                        description: data.description,
                        image: data.image,
                        price: data.price,
                        stock: data.stock,
                        timestamp: i.timestamp,
                        uuid
                    }  
                }
                return i;
            });
            await fs.promises.writeFile(this.path, JSON.stringify(newList, null, 2)); 
            const result = await this.getOne(uuid);
            return result;
        }catch(err){
            throw new Error(err);
        }
    };

    async delete(uuid){
        try{
            const items = await this.getAll();
            const newItems = items.filter(i => i.uuid != uuid);
            if(items.length === newItems.length){
                return 'Item not found';
            } 
            const data = await fs.promises.writeFile(this.path, JSON.stringify(newItems, null, 2)); 
            return data;
        }catch(err){
            throw new Error(err);
        }
    };
};

export default FsContainer;