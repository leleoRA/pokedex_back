import { getRepository } from "typeorm";
import Sessions from "../entities/Sessions";

export async function validateSession(token: string) {
    const session = await getRepository(Sessions).findOne({ where: { token }, relations: ["user"]});
    console.log(session)   
    if (!session){
        return null;
    } 

    return session;
}