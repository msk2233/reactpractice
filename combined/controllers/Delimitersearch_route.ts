import {  Request, Response } from 'express';
import {con} from '../executequery';
import {RowDataPacket} from 'mysql2';

let data:Array<RowDataPacket>;
export const tk9route_main=async (req:Request,res:Response)=>{
    let qr = '';
    let sqldis = 'select * from student_master2_res;'
        data = await con.getall(sqldis);
        res.render('delimitersearch', { title: 'User List', userData: data,qr:qr});
}
export const tk9route_display =async (req:Request,res:Response) => {
    let qr:string = req.body.str;
    let str = JSON.stringify(qr);
    str = str.replace( /\s+/g, '' );
   
    let arr:string[] = [];
    let temp = "";
    for (let i = 1; i < str.length - 1; i++) {
        const c = str.charAt(i);
        if (/^[a-zA-Z0-9 ]+$/.test(c)) {
            temp += c;
        }
        else {
            if (temp !== "") {
                arr.push(temp);
                temp = "";
            }
            arr.push(c);
        }
    }
    if (temp !== "") {
        arr.push(temp);
    }
    let fn =[];
    let ln =[];
    let mail=[];
    let phno=[];
    let city=[];
    for (let i = 0; i < str.length - 1; i++) {
        if (i % 2 == 0) {
            let op = arr[i];
            switch (op) {
                case '_':
                    fn.push(arr[i+1])
                    break;
                case '^':
                    ln.push(arr[i+1])
                    break;
                case '$':
                    mail.push(arr[i+1])
                    break;
                case '{':
                    phno.push(arr[i+1])
                    break;
                case ':':
                    city.push(arr[i+1])
                    break;
            }
        }
    }
    let fname ='';
    for(let i=0;i<fn.length;i++){
        fname += "fname like '"+fn[i]+"%'"+" or ";
    }
    if(fname == ''){
        fname += "fname like '%'";
    }
    else{
        fname = fname.substring(0, fname.length - 3);
    }
    let lname ='';
    for(let i=0;i<ln.length;i++){
            lname += "lname like '"+ln[i]+"%'"+" or ";
            
        }
    if(lname == ''){
        lname += "lname like '%'";
    }
    else{
        lname = lname.substring(0, lname.length - 3);
    }
    let email ='';
    for(let i=0;i<mail.length;i++){
        email += "Email like '"+mail[i]+"%'"+" or ";
    }
    if(email == ''){
        email += "Email like '%'";
    }else{
        email = email.substring(0, email.length - 3);
    }
    let phone ='';
    for(let i=0;i<phno.length;i++){
        phone += "Phonenum like '"+phno[i]+"%'"+" or ";
    }
    if(phone == ''){
        phone += "Phonenum like '%'";
    } 
    else{
        phone = phone.substring(0, phone.length - 3);
    }
    let ct ='';
    for(let i=0;i<city.length;i++){
        ct += "City like '"+city[i]+"%'"+" or ";
    }
    if(ct == ''){
        ct += "City like '%'";
    }
    else{
        ct = ct.substring(0, ct.length - 3);
    }
   let query = `select * from student_master2_res where (${fname}) and (${lname}) and (${email}) and (${phone}) and (${ct}) ;`
        data = await con.getall(query);
        res.render('delimitersearch', { title: 'User List',userData: data,qr:qr});
}