import {  Request, Response ,NextFunction} from 'express';
import {con} from '../executequery';
import {RowDataPacket} from 'mysql2';
var backvalidation = require('../middlewear/backendvalidation')

export const main = async (req:Request,res:Response) => {
    res.render('job_application_form_main')
}
export const fetch = async (req:Request,res:Response) => {
    let id = req.query.id;
    let result1 = await con.getall(`select * from basic_detail where application_id = ${id};`);
    let result2 = await con.getall(`select * from education where application_id = ${id};`)
    let result3 = await con.getall(`select * from workexperience where application_id = ${id};`)
    let result4 = await con.getall(`select * from known_language where application_id = ${id};`);
    let result5 = await con.getall(`select * from known_technologies where application_id = ${id};`);
    let result6 = await con.getall(`select * from  referenceContact where application_id = ${id};`);
    let result7 = await con.getall(`select * from  preferences where application_id = ${id};`);
    res.send({ result1, result2, result3, result4, result5, result6, result7 });
}
export const insert = (req:Request,res:Response) => {
    let submittype = "insert";
    res.render('job_application_form', { submittype: submittype, id: {} });
}
export const update = (req:Request,res:Response) => {
    let id = req.query.id;
    let submittype = "update";
    res.render('job_application_form', { submittype: submittype, id: id });
}
export const get_state = async (req:Request,res:Response) => {
    let data = await con.getall(`SELECT name,id FROM states ORDER BY id ASC;`);
    res.send({ data });
}
export const get_city = async (req:Request,res:Response) => {
    var type = req.query.id;
    let data1 = await con.getall(`SELECT city FROM cities where state_id = ${type};`);
    res.send({ data1: data1 })
}

 function backend(req:Request,res:Response,) {
    if (backvalidation.basicdetail(req.body)) {
        return true;
    }
    else {
        return false;
    }
}
export const insdata = async (req:Request,res:Response, next:NextFunction) => {
    let fail = null;
    if (backend(req,res)) {
        const { fname, lname, designation, address1, address2, email, phno, city, gender, state, rstatus, zipcode, dob, nob_ssc, ps_ssc, percentage_ssc, nob_hsc, ps_hsc, percentage_hsc, coursename_bach, ps_bach, percentage_bach, coursename_mas, ps_mas, percentage_mas, companyname1, designation_exp1, date_of_join_exp1, date_of_coplition_exp1, companyname2, designation_exp2, date_of_join_exp2, date_of_coplition_exp2, companyname3, designation_exp3, date_of_join_exp3, date_of_coplition_exp3, rhindi, whindi, shindi, renglish, wenglish, senglish, rgujarati, wgujarati, sgujarati, phpcheckbox, mysqlcheckbox, laravelcheckbox, oraclecheckbox, php, mysql, laravel, oracle, ref_name_1, ref_name_2, contact_ref_1, contact_ref_2, contact_ref_relation1, contact_ref_relation2, location, notice_period, exp_ctc, cur_ctc, department } = req.body;

        //INSERT INTO BASIC DETAIL TABLE

        var basic_detail_query = `insert into basic_detail(fname,lname,designation,address1,address2,email,phno,city,state,gender,zipcode,rstatus,dob) values ('${fname}','${lname}','${designation}','${address1}','${address2}','${email}','${phno}','${city}','${state}','${gender}','${zipcode}','${rstatus}','${dob}')`;
        let insertedid = await con.insert(basic_detail_query);

        // INSERT INTO EDUCATION TABLE

        var educationlevel = [];
        var board_course = [];
        var passing_year = [];
        var percentage = [];
        if (nob_ssc != '') {
            educationlevel.push("1");
            board_course.push(nob_ssc);
            passing_year.push(ps_ssc);
            percentage.push(percentage_ssc);
        }
        if (nob_hsc != '') {
            educationlevel.push("2");
            board_course.push(nob_hsc);
            passing_year.push(ps_hsc);
            percentage.push(percentage_hsc);
        }
        if (coursename_bach != '') {
            educationlevel.push("3");
            board_course.push(coursename_bach);
            passing_year.push(ps_bach);
            percentage.push(percentage_bach);
        }
        if (coursename_mas != '') {
            educationlevel.push("4");
            board_course.push(coursename_mas);
            passing_year.push(ps_mas);
            percentage.push(percentage_mas);
        }
        for (let i = 0; i < educationlevel.length; i++) {
            var education_query = `insert into education(application_id,educationlevel,board_course,passing_year,percentage) values (${insertedid},${educationlevel[i]},'${board_course[i]}','${passing_year[i]}',${percentage[i]});`

            let data2 = await con.insert(education_query);
        }


        // INSERT INTO WORK EXPERIENCE TABLE

        var company_name = [];
        var designation_exp = [];
        var date_of_join_exp = [];
        var date_of_coplition_exp = [];

        if (companyname1 != '') {
            company_name.push(companyname1);
            designation_exp.push(designation_exp1);
            date_of_join_exp.push(date_of_join_exp1);
            date_of_coplition_exp.push(date_of_coplition_exp1);
        }
        if (companyname2 != '') {
            company_name.push(companyname2);
            designation_exp.push(designation_exp2);
            date_of_join_exp.push(date_of_join_exp2);
            date_of_coplition_exp.push(date_of_coplition_exp2);
        }
        if (companyname3 != '') {
            company_name.push(companyname3);
            designation_exp.push(designation_exp3);
            date_of_join_exp.push(date_of_join_exp3);
            date_of_coplition_exp.push(date_of_coplition_exp3);
        }

        for (let element = 0; element < company_name.length; element++) {
            var workexperience_query = `insert into  workexperience(application_id,ComapanyName,Designation,Dateofjoining,Dateofcompliting) values (${insertedid},'${company_name[element]}','${designation_exp[element]}','${date_of_join_exp[element]}','${date_of_coplition_exp[element]}');`
            let data3 = await con.insert(workexperience_query);
        }

        //INSERT INTO KNOWN LANGUAGE TABLE
        var lan = [];
        var hin = [];
        var eng = [];
        var guj = [];

        if (rhindi != undefined || whindi != undefined || shindi != undefined) {
            hin.push("hindi");

            if (rhindi != undefined) {
                hin.push(1)
            }
            else {
                hin.push(0)
            }
            if (whindi != undefined) {
                hin.push(1)
            }
            else {
                hin.push(0)
            }
            if (shindi != undefined) {
                hin.push(1)
            }
            else {
                hin.push(0)
            }
        }
        lan.push(hin);
        if (renglish != undefined || wenglish != undefined || senglish != undefined) {
            eng.push("english");
            if (renglish != undefined) {
                eng.push(1)
            }
            else {
                eng.push(0)
            }
            if (wenglish != undefined) {
                eng.push(1)
            }
            else {
                eng.push(0)
            }
            if (senglish != undefined) {
                eng.push(1)
            }
            else {
                eng.push(0)
            }
            lan.push(eng);
        }
        if (rgujarati != undefined || wgujarati != undefined || sgujarati != undefined) {
            guj.push("guj");
            if (rgujarati != undefined) {
                guj.push(1)
            }
            else {
                guj.push(0)
            }
            if (wgujarati != undefined) {
                guj.push(1)
            }
            else {
                guj.push(0)
            }
            if (sgujarati != undefined) {
                guj.push(1)
            }
            else {
                guj.push(0)
            }
            lan.push(guj);
        }
        var j = 0;

        for (let i = 0; i < lan.length; i++) {
            var language = `insert into known_language(application_id,language_name,can_read,can_write,can_speak) values (${insertedid},'${lan[i][j]}','${lan[i][j + 1]}','${lan[i][j + 1]}','${lan[i][j + 2]}');`
            let data4 = await con.insert(language);
        }


        //INSERT INTO TECHNOLOGIES TABLE
        var tech = [];
        var tech1 = [];
        var tech2 = [];
        var tech3 = [];
        var tech4 = [];

        if (phpcheckbox != undefined) {
            tech1.push("PHP");
            tech1.push(php);
            tech.push(tech1)
        }
        if (mysqlcheckbox != undefined) {
            tech2.push("MySql");
            tech2.push(mysql);
            tech.push(tech2)
        }
        if (laravelcheckbox != undefined) {
            tech3.push("Laravel");
            tech3.push(laravel);
            tech.push(tech3)
        }
        if (oraclecheckbox != undefined) {
            tech4.push("Oracle");
            tech4.push(oracle);
            tech.push(tech4)
        }
        for (let i = 0; i < tech.length; i++) {
            var techno = `insert into known_technologies(application_id,Name_of_technology,Experties) values (${insertedid},'${tech[i][j]}','${tech[i][j + 1]}');`
            let data5 = await con.insert(techno);
        }

        //INSERT INTO KNOWN REFERENCE CONTACT TABLE
        var refcontact = [];
        var refcontact1 = [];
        var refcontact2 = [];

        if (ref_name_1 != '') {
            refcontact1.push(ref_name_1);
            refcontact1.push(contact_ref_1);
            refcontact1.push(contact_ref_relation1);
            refcontact.push(refcontact1)
        }
        if (ref_name_2 != '') {
            refcontact2.push(ref_name_2);
            refcontact2.push(contact_ref_2);
            refcontact2.push(contact_ref_relation2);
            refcontact.push(refcontact2)
        }
        for (let i = 0; i < refcontact.length; i++) {
            var ref = `insert into referenceContact(application_id,NameOfContact,ContactNumber,Relation) values (${insertedid},'${refcontact[i][j]}','${refcontact[i][j + 1]}','${refcontact[i][j + 2]}');`
            let data6 = await con.insert(ref);
        }

        //INSERT INTO KNOWN PREFERENCE TABLE
        const Location = location.toString();
        var preference = `insert into preferences(application_id,prefered_location,notice_period,expected_ctc,curr_ctc,department) values(${insertedid},'${Location}','${notice_period}','${exp_ctc}','${cur_ctc}','${department}');`;

        let data7 = await con.insert(preference);


        fail = 'no';
        res.json({ fail });
    }
    else {
        res.json(fail);
    }
}
export const updatedata = async (req:Request,res:Response) => {
    let fail = null;
    if (backend(req,res)) {
        const { fname, lname, designation, address1, address2, email, phno, city, gender, state, rstatus, zipcode, dob, nob_ssc, ps_ssc, percentage_ssc, nob_hsc, ps_hsc, percentage_hsc, coursename_bach, ps_bach, percentage_bach, coursename_mas, ps_mas, percentage_mas, companyname1, designation_exp1, date_of_join_exp1, date_of_coplition_exp1, companyname2, designation_exp2, date_of_join_exp2, date_of_coplition_exp2, companyname3, designation_exp3, date_of_join_exp3, date_of_coplition_exp3, rhindi, whindi, shindi, renglish, wenglish, senglish, rgujarati, wgujarati, sgujarati, phpcheckbox, mysqlcheckbox, laravelcheckbox, oraclecheckbox, php, mysql, laravel, oracle, ref_name_1, ref_name_2, contact_ref_1, contact_ref_2, contact_ref_relation1, contact_ref_relation2, location, notice_period, exp_ctc, cur_ctc, department, id } = req.body;

        var State = await con.getall(`SELECT name FROM states where id=${state}`);


        //UPDATE BASIC DETAIL
        var updatebasicdetail = `update basic_detail set fname='${fname}',lname='${lname}',designation='${designation}',address1='${address1}',address2='${address2}',email='${email}',phno='${phno}',city='${city}',state='${State[0].name}',gender='${gender}',zipcode='${zipcode}',rstatus='${rstatus}',dob='${dob}' where application_id=${id};`

       let updatebasic =  await con.update(updatebasicdetail);

        //UPDATE EDUCATION DETAIL
        var educationlevel = [];
        var board_course = [];
        var passing_year = [];
        var percentage = [];
        if (nob_ssc != '') {
            educationlevel.push("1");
            board_course.push(nob_ssc);
            passing_year.push(ps_ssc);
            percentage.push(percentage_ssc);
        }
        if (nob_hsc != '') {
            educationlevel.push("2");
            board_course.push(nob_hsc);
            passing_year.push(ps_hsc);
            percentage.push(percentage_hsc);
        }
        if (coursename_bach != '') {
            educationlevel.push("3");
            board_course.push(coursename_bach);
            passing_year.push(ps_bach);
            percentage.push(percentage_bach);
        }
        if (coursename_mas != '') {
            educationlevel.push("4");
            board_course.push(coursename_mas);
            passing_year.push(ps_mas);
            percentage.push(percentage_mas);
        }
        for (let i = 0; i < educationlevel.length; i++) {
            var updateeducation = `update education set application_id=${id},educationlevel='${educationlevel[i]}',board_course='${board_course[i]}',passing_year='${passing_year[i]}',percentage='${percentage[i]}' where application_id=${id} and educationlevel='${educationlevel[i]}';`;

            let updateedu = await con.update(updateeducation);
        }

        //UPDATE LANGUAGE

        var lan = [];
        var hin = [];
        var eng = [];
        var guj = [];

        if (rhindi != undefined || whindi != undefined || shindi != undefined) {
            hin.push("hindi");

            if (rhindi != undefined) {
                hin.push(1)
            }
            else {
                hin.push(0)
            }
            if (whindi != undefined) {
                hin.push(1)
            }
            else {
                hin.push(0)
            }
            if (shindi != undefined) {
                hin.push(1)
            }
            else {
                hin.push(0)
            }
        }
        else{
            hin.push("hindi");
            hin.push(0);
            hin.push(0)
            hin.push(0)
        }
        lan.push(hin);
        if (renglish != undefined || wenglish != undefined || senglish != undefined) {
            eng.push("english");
            if (renglish != undefined) {
                eng.push(1)
            }
            else {
                eng.push(0)
            }
            if (wenglish != undefined) {
                eng.push(1)
            }
            else {
                eng.push(0)
            }
            if (senglish != undefined) {
                eng.push(1)
            }
            else {
                eng.push(0)
            }
        }
        else{
            eng.push("english");
            eng.push(0);
            eng.push(0);
            eng.push(0);
        }
        lan.push(eng);
        if (rgujarati != undefined || wgujarati != undefined || sgujarati != undefined) {
            guj.push("guj");
            if (rgujarati != undefined) {
                guj.push(1)
            }
            else {
                guj.push(0)
            }
            if (wgujarati != undefined) {
                guj.push(1)
            }
            else {
                guj.push(0)
            }
            if (sgujarati != undefined) {
                guj.push(1)
            }
            else {
                guj.push(0)
            }
        }
        else{
            guj.push("guj");
            guj.push(0);
            guj.push(0);
            guj.push(0);
        }
        lan.push(guj);
        
        for (let i = 0; i < lan.length; i++) {
            var j = 0;

            var languageupdate = `update known_language set language_name='${lan[i][j]}',can_read=${lan[i][j + 1]},can_write=${lan[i][j + 2]},can_speak=${lan[i][j + 3]} where application_id=${id} and language_name='${lan[i][j]}';`;
            console.log(languageupdate);
            
           let updatelan = await con.update(languageupdate);
           console.log(updatelan);
           
        }

        //UPDATE TECHNOLOGY
        var tech = [];
        var tech1 = [];
        var tech2 = [];
        var tech3 = [];
        var tech4 = [];

        if (phpcheckbox != undefined) {
            tech1.push("PHP");
            tech1.push(php);
            tech.push(tech1)
        }
        else{
            tech1.push("PHP");
            
        }
        if (mysqlcheckbox != undefined) {
            tech2.push("MySql");
            tech2.push(mysql);
            tech.push(tech2)
        }
        if (laravelcheckbox != undefined) {
            tech3.push("Laravel");
            tech3.push(laravel);
            tech.push(tech3)
        }
        if (oraclecheckbox != undefined) {
            tech4.push("Oracle");
            tech4.push(oracle);
            tech.push(tech4)
        }
        for (let i = 0; i < tech.length; i++) {
            var j = 0;
            var techupdate = `update known_technologies set application_id=${id},Name_of_technology='${tech[i][j]}',Experties='${tech[i][j + 1]}' where application_id=${id} and Name_of_technology='${tech[i][j]}';`;
          let updatetech = await con.update(techupdate);
        }

        // UPDATE PREFERANCE

        const Location = location.toString();
        var updatepreference = `update preferences set application_id=${id},prefered_location='${Location}',notice_period='${notice_period}',expected_ctc='${exp_ctc}',curr_ctc='${cur_ctc}',department='${department}' where application_id=${id};`;
       let updatepre = await con.update(updatepreference);

        fail = 'no';
        res.json({ fail });
    }
    else {
        res.json({ fail });
    }
}