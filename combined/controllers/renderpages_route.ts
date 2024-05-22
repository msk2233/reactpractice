import {  Request, Response } from 'express';
import path from 'path';

export const dashboard = async (req:Request , res:Response) => {
    res.render('dashboard')
}
export const dynemictable = async (req:Request , res:Response) => {
    res.render('dynemictable');
}
export const Javascript_Events = async (req:Request , res:Response) => {
    res.render('JavascriptEvents');
}
export const KuKucube = async (req:Request , res:Response) => {
    res.render('KuKucube');
}
export const ehya_tamplate= async (req:Request , res:Response)=>{
    res.sendFile(path.join(__dirname, '../public/temp_1/assignment_1.html'));
}
export const Awan_Hoster_template= async (req:Request , res:Response)=>{
    res.sendFile(path.join(__dirname, '../public/temp_2/assignment_2.html'));
}
export const hirex_tamplate= async (req:Request , res:Response)=>{
    res.sendFile(path.join(__dirname, '../public/temp_3/assignment_3.html'));
}
export const forgotpass= async (req:Request , res:Response)=>{;
    res.render('forgotpass')
}
export const err = async(req:Request , res:Response)=>{
    res.render('err');
}