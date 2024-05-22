import {  Request, Response } from 'express';
import {con} from '../executequery';
import {RowDataPacket} from 'mysql2';

let id = '';
let data:Array<RowDataPacket>;
export const tk8route_main = async (req:Request,res:Response) => {
    let sqldis = 'select * from student_master2_res;'
     data = await con.getall(sqldis);
    res.render('Searching', { title: 'User List', userData: data, id: id });
}
export const tk8route = async (req:Request,res:Response) => {
    let id = req.body.id || '';
    let op = req.body.operator;
    let fname = req.body.firstname || '';
    let lname = req.body.lastname || '';
    let city = req.body.city || '';
    let country = req.body.country || '';
    if (id != '') {
        let queryfromid = `select * from student_master2_res where stu_id in (${id});`;
        data = await con.getall(queryfromid);
        res.render('Searching', { title: 'User List', userData: data, id: id });
    }
    else {
        let queryfromdata = `select * from student_master2_res where fname=?`+op+` lname=?`+op+` City=?`+op+` Country=?;`
        let values = [fname,lname,city,country]
        let data = await con.getall(queryfromdata,values);
        res.render('Searching', { title: 'User List', userData: data, id: id });
    }
}
