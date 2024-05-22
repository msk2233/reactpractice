import {  Request, Response } from 'express';
import {con} from '../executequery';
import MD5 from 'md5';
import {RowDataPacket} from 'mysql2';
export const registerpage = async (req:Request, res:Response) => {
    res.render('reg');
}
export const register=async (req:Request, res:Response)=> {
    const { fname, email ,ukdetail } = req.body;
    var checkmail = `select email from registration`;
    var check_mail = await con.getall(checkmail,) as Array<RowDataPacket>;
    var status = `select active_status from registration`;
    let isactive = await con.getall(status) as Array<RowDataPacket>;
    var exist = '';
    
    for (let i = 0; i < check_mail.length; i++) {
        if (check_mail[i].email == email && isactive[i].active_status == 1) {
            exist = "exist";
        }
    }
    if (exist == "exist") {
        res.json({ exist })
    }
    else {
        var randomcode = Math.round((Math.pow(36, 13) - Math.random() * Math.pow(36, 12))).toString(36).slice(1);
        var fr_query = `insert into registration(fname,email,detailforpass,activation_code,active_status) values (?,?,?,?,0)`;
        let values = [fname,email,ukdetail,randomcode]
        let regcheck:number = await con.insert(fr_query,values);
        if (regcheck != 0) {
            res.json({ randomcode, exist })
        }
    }
 }
 interface dateofgenre{
    createdtime:Date;
 }
export const activate = async(req:Request,res:Response)=>{
    var check_activate = `select activation_code from registration where email='${req.query.email}'`;
    var result = await con.getall(check_activate) as Array<RowDataPacket>;
    var expire = '';
    var tog = `select * from registration where email='${req.query.email}'`
    var timeofgeneration = await con.getall(tog) as Array<dateofgenre>;
    var generatedtime:Date = timeofgeneration[0].createdtime;
    var currentdate = new Date();
    const dateDifferenceInSeconds = (dateInitial:number, dateFinal:number) => (dateFinal - dateInitial) / 1_000;
    if (result[0].activation_code == req.query.code) {

        if (dateDifferenceInSeconds(new Date(generatedtime).valueOf(), new Date(currentdate).valueOf()) > 3600) {
            expire = 'yes'
            res.json({ expire, code: '' })
        }
        else {
            expire = 'no'
            res.json({ expire, code: '' })
        }
    } else {
        res.json({ code: "code not match" })
    }
}
export const getpass = async(req:Request, res:Response)=>{
    let email = req.query.email;
    res.render('password', { email})
}
export const createpass = async (req:Request, res:Response) => {
    const { password, repassword, email } = req.body;
    if (password == repassword){
        var salt = Math.round((Math.pow(36, 5) - Math.random() * Math.pow(36, 4))).toString(36).slice(1);
        var encodedpass = MD5(password + salt);
        var pass_query = `update registration set reg_password='${encodedpass}',salt = '${salt}',active_status=1 where email='${email}'`;
        let createdpass:number = await con.update(pass_query);
        if (createdpass != 0) {
            res.json({ success: "yes" })
        }
    }
    else {
        res.json({ success: "no" })
    }
}