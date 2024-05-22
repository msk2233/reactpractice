import {con} from '../executequery';
import {RowDataPacket} from 'mysql2';
import {  Request, Response } from 'express';

export const tk5route=async (req:Request,res:Response)=>{
    const selectedMonth = Number(req.query.month) || 1;
    let pgno = Number(req.query.pgno) || 1;
    let lim = 0;
    if(pgno == 1 || pgno == 0){
      pgno = 1;
      lim =0;
    }
    else{
      lim = (pgno-1)*20;
    }
    const sqldis = `SELECT student_master_3.stu_id,student_master_3.fname,count(case when P_A = 1 AND month(dayofmonth)=? THEN P_A END) as "presentdays",ROUND(((count(case when P_A = 1 AND month(dayofmonth)=? THEN P_A END)*100)/31),2) as "per" from student_master_3 inner join attendence_master on student_master_3.stu_id=attendence_master.stu_id  where P_A = "1" group by student_master_3.stu_id,student_master_3.fname limit ?,20;`
    let values = [selectedMonth,selectedMonth,lim]
    
    let data:Array<RowDataPacket> = await con.getall(sqldis,values);
      res.render('Grid_With_Calendar', { title: 'User List',userData: data,pgno:pgno,selectedMonth:selectedMonth});
}