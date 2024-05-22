import {  Request, Response } from 'express';

export const tk16route=(req:Request,res:Response)=>{
    let id = req.query.id || '';
    if (id != '') {
      res.render('jsonplaceholder_view',{id:id});
    }
    else{
      res.render('jsonplaceholder_main');
    }
}