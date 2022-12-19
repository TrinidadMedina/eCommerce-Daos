import _ from "lodash";

class MemoryContainer {
  constructor() {
    this.array = [];
  }

  async create(data) {
    try{
        data.timestamp = Date.now();
        this.array.push(data);
        return data;
    }catch(err){
        throw new Error(err.message);
    }
  };

  async getAll() {
    try{
        return this.array
    }catch(err){
        throw new Error(err.message);
    }
  };

  async getOne(uuid) {
    try{
        const item = this.array.filter(i => i.uuid == uuid);
        return item.length === 0 ? null : item[0];
    }catch(err){
        throw new Error(err.message);
    }
  };

  async update(uuid, body) {
    try{
        const index = this.array.findIndex(i => i.uuid === uuid);
        if (index < 0) {
          return null;
        }
        const updated = { ...this.array[index], ...body };
        this.array[index] = updated;
        return this.array[index];
    }catch(err){
        throw new Error(err.message);
    }
  };

  async delete(uuid) {
    try{
        const newArray = this.array.filter(i => i.uuid !== uuid);
        if(newArray.length === this.array.length){
            return null;
        };
        this.array = newArray;
        return {}; 
    }catch(err){
        throw new Error(err.message);
    }
  };
}

export default MemoryContainer;