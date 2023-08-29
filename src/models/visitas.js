import dotenv from 'dotenv'

import { mongoConn, getDB } from '../config/connection.js'

dotenv.config()

const db = JSON.parse(process.env.DB)
export class Visitas {
    static async initialize(Db, collection = null) {
        this.clints = await mongoConn();
        try {
          this.db = getDB(Db);
          this.collection = this.db.collection(collection);
        } catch (error) {
          console.error(error);
        }
    }
    
    static async getEventos(){
        await this.initialize(db.ATLAS_DATABASE, "evento");
        try {
            const result = await this.collection.find().toArray();
            return result;
        } catch (error) {
            console.error(error);
        } finally {
            await this.clints.close();
        }   
    }

    static async createVisitaInvestigacion(data) {
        await this.initialize(db.ATLAS_DATABASE, "visitantes");
        try {
            const result = await this.collection.insertOne(data);
            return {
                status: 200,
                message: "Visita de investigacion creada correctamente",
                data: result.insertedId
            };
        } catch (error) {
            console.error(error);
        } finally {
            await this.clints.close();
        }
    }
}