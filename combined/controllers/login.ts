import {  Request, Response } from 'express';
import {con} from '../executequery';
import MD5 from 'md5';
import jwt from 'jsonwebtoken';
import {RowDataPacket} from 'mysql2';

export const login = async (req:Request, res:Response) => {
    res.render('login')
}

export const login_data = async (req:Request, res:Response) => {
    const { email, password } = req.body;
    let check_qr:string = `select email from registration`;
    let check_data = await con.getall(check_qr) as Array<RowDataPacket>;
    let count = 0;
    for (let i = 0; i < check_data.length; i++) {
        if (check_data[i].email == email) {
            count++;
        }
    }
    let check_pass:string = `select reg_password,salt,fname from registration where email=?`;
    let pwd = await con.getrow(check_pass,email);
    let salt = pwd.salt;
    let reg_password = MD5(password + salt);
    if (reg_password == pwd.reg_password) {
        count++;
    }
    const user = { email: email };
    if (count == 2) {
        const token:string = jwt.sign(user, "linkedproject", { expiresIn: '5h' });
        console.log(token);
        res.cookie('access_token', token).status(200)
        res.json({ success: "yes" });
    }
    else {
        res.json({ success: "no" })
    }
}
export const dataforpass = async (req:Request, res:Response) => {
    let flag:boolean = false;
    let forpass:string = `select email,detailforpass from registration`;
    let datapass = await con.getall(forpass) as Array<RowDataPacket>;

    datapass.forEach((element) => {
        if (element.email === req.query.email && element.detailforpass === req.query.frname) {
            flag = true
        }   
    });
    res.json(flag)
}
export const reset = async (req:Request, res:Response) => {
    let mailforreset = req.query.email;
    let mail:string = JSON.parse(JSON.stringify(mailforreset))
    let newpass = req.query.newpass;
    let salt = Math.round((Math.pow(36, 5) - Math.random() * Math.pow(36, 4))).toString(36).slice(1);
    let encodedpass = MD5(newpass + salt);
    let pass_query = `update registration set reg_password=?,salt = ?,active_status=1 where email=?`;
    let valuesforreset:string[] = [encodedpass,salt,mail]
    let resetcheck = await con.update(pass_query,valuesforreset);

    if (resetcheck != 0) {
        res.json("yes")
    }
}