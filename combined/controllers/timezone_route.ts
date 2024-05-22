import {  Request, Response } from 'express';
import {con} from '../executequery';
import {RowDataPacket} from 'mysql2';

export const tk15route= async (req:Request,res:Response)=>{
    let timezones:string[] = [];
    let qr = `select timezone from timezone order by timezone asc`;
    let data = await con.getall(qr) as Array<RowDataPacket>;
        for (let i = 0; i < data.length; i++) {
            timezones.push(data[i].timezone)
        }
       res.render('timezone', { timezones });
}
export const tk15route_convert=(req:Request,res:Response)=>{
    let timezone = req.query.timezone;
    const currentTime = new Date().toLocaleString('en-US', { timeZone:`${timezone}`});
    res.send({currentTime});
}
