import mysql from 'mysql';
import mysql2 from "mysql2-async";

export async function execute(query:string,values:string|number|string[]) {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Dev@123",
        database: "registration",
        dateStrings : true
    });


    con.connect(function (err) {
        if (err) throw err;
    });

    let res = new Promise((resolve, reject) => {
        con.query(query,values, (err, result:Array<object>) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            else {
                resolve(result);
            }
        })
    })

    let result = res.then((result)=>{return result}).catch((err)=>{return "Error in query"});

    return result;
}
export async function insert(query:string) {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Dev@123",
        database: "registration"
    });


    con.connect(function (err) {
        if (err) throw err;
    });

    let res = new Promise((resolve, reject) => {
        con.query(query, (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result.insertId);
            }
        })
    })
    let result = res.then((result)=>{return result}).catch((err)=>{return err});
    return result;
}
export const con = new mysql2({
  host: "localhost",
  user: "root",
  password: "Dev@123",
  database: "registration",
  dateStrings : true,
  skiptzfix:true
});
