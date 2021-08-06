import { Request, Response, NextFunction } from "express";

function error (err: any, req: Request, res: Response, next: NextFunction){
    if (err){
        console.log(err)
        return res.sendStatus(500)    
    }
};

export { error }