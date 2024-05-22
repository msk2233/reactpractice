import { log } from 'console';
import {  Request, Response, NextFunction } from 'express';
import * as  jwt from 'jsonwebtoken';

const auth = (req:Request,res:Response,next:NextFunction)=>{
    const token = req.cookies.access_token;
        try{
            const data = jwt.verify(token,"linkedproject");
            if (data) {
                next();
            }
            else{
                console.log("token expired");
                res.redirect('/login')
                return;
            }
        }
        catch{
            console.log("token expired (catch)");
            res.redirect('/login');
            return;
        }  
}
export default auth;
