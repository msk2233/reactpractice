import {con} from '../executequery';
import {RowDataPacket} from 'mysql2';
import {  Request, Response } from 'express';

export const tk7route_main = async (req:Request,res:Response) => {
    res.render('dynemicgrid_main');
}
export const tk7route_submit = async (req:Request,res:Response) => {
    let qr = req.body.query
    res.json(qr)
}
export const tk7route = async (req:Request,res:Response) => {
    let query = req.query.qr;
    let lim = 0;
    let pgno = Number(req.query.pgno);
    if (pgno == 1 || pgno == 0) {
        pgno = 1;
    }
    else {
        lim = (pgno - 1) * 20;
    }
    let values = [lim];
    let sqldis = `${query} limit ?,20`;
    let sql = `${query}`;
    let data:Array<RowDataPacket> = await con.getall(sql);
    let length = Math.ceil(data.length / 20);
    let Data:Array<RowDataPacket> = await con.getall(sqldis,values);
    res.render('dynemicgrid_display', { userData: Data, pgno: pgno, length, query });
}
