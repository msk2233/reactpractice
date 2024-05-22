import { Request, Response } from 'express';
import execute from "../../dbConnection/executeQuery";
import logger from '../../logger';
import { text } from 'body-parser';

const  user_id:number = 1;
const  book_id:number = 2;

export const contributebook = (req: Request, res: Response) => {
  // const user_id:number = req.user[0].user_id;
  res.render("contributebook/contribute", { user_id });
};
export const bookdetail = (req: Request, res: Response) => {
  // book_id = req.query.book_id;
  // user_id = req.user[0].user_id;
  res.render("bookDetail/bookDetail", { book_id:2, user_id:15 });
};
export const BookDetails = async (req: Request, res: Response) => {
  // book_id = req.query.book_id;
  //fetching data for book
  let fetchqr:string = `select book_title,book_desc,book_img,book_publication,book_publication_year,book_ISBN,genre_name,books_detail.genre_id,sum(availability_status) as availability_status,books_detail.prime_book_id from books_detail inner join genres on books_detail.genre_id = genres.genre_id inner join inventory on inventory.prime_book_id = books_detail.prime_book_id where books_detail.prime_book_id =?;`;
 const databook = (await execute(fetchqr, book_id)) as Array<Object>;
  
  // fetching data for author
  let fetchauth:string = `select authors.author_id,author_name,author_img,author_desc,books_detail.prime_book_id from books_author inner join authors on authors.author_id = books_author.author_id inner join books_detail on books_detail.prime_book_id = books_author.prime_book_id where books_detail.prime_book_id=?; `;
  const dataauth = (await execute(fetchauth, book_id)) as Array<object>;

  const recommendeddata = databook.map((t1:any) => ({
    ...t1,
    ...dataauth.find((t2:any) => t2.prime_book_id === t1.prime_book_id),
  }));

  //fetching rating of book
  let fetchrate = `select avg(rating) as rate from rating where book_id =?;`;
  let rateofbook = (await execute(fetchrate, book_id)) as Array<{rate:string}>;
  let rate = Number(rateofbook[0].rate);
  

  // fetching data for other books of author
  let auth_id = recommendeddata[0].author_id;
  let authotherbooks = `select book_img from books_detail inner join books_author on books_author.prime_book_id = books_detail.prime_book_id where author_id = ? and not books_detail.prime_book_id=?;`;
  let authvalues:any = [auth_id, book_id];
  const authotherbook = (await execute(authotherbooks, authvalues)) as Array<{}>;

  // fetching related books
  let genreofbook = recommendeddata[0].genre_id;
  let relatedbooks = `select book_img,prime_book_id from books_detail where genre_id=? and not prime_book_id=? limit 0,5`;
  let relatedvalue:any = [genreofbook, book_id];
  const relatedbook = (await execute(relatedbooks, relatedvalue)) as Array<{}>;

  //fetching total read of book
  let totalreads:string = `select count(*) as 'read' from books_log where book_id = ? and status= 'return'`;
  const totalread = (await execute(totalreads, book_id))as Array<{}>;

  //fetching currently reading
  let readings:string = `select count(*) as 'read' from books_log where book_id = ? and status= 'pending'`;
  const reading = (await execute(readings, book_id)) as Array<{}>;
  //send data to bookdetail page
  

  res.send({
    recommendeddata,
    rate,
    authotherbook,
    relatedbook,
    totalread,
    reading,
  });
};
export const addtofav = async (req: Request, res: Response) => {
  let user_id = JSON.parse(JSON.stringify(req.query.user_id));
  let book_id = JSON.parse(JSON.stringify(req.query.book_id));
  let checkifexists = `select reader_id,prime_book_id,isDeleted from watch_lists`;
  const checkexist = (await execute(checkifexists,'')) as Array<object>;
  let checkifexist = JSON.parse(JSON.stringify(checkexist));
  let exist = "";
  for (let i = 0; i < checkifexist.length; i++) {
    if (
      checkifexist[i].reader_id == user_id &&
      checkifexist[i].prime_book_id == book_id &&
      checkifexist[i].isDeleted == 0
    ) {
      exist = "yes";
    } else {
      exist = "no";
    }
  }
  if (exist == "yes") {
    res.json(exist);
  } else {
    let addtofavquery = `insert into watch_lists(reader_id,prime_book_id,isDeleted) values(?,?,0)`;
    let values = [user_id, book_id];

    const dataoffav = (await execute(addtofavquery, values)) as Array<object>;
    res.json(exist);
  }
};

export const fetchcontro = async (req: Request, res: Response) => {
  // let user_id:number = req.query.user_id;
  let fetchcontro = `select book_title,book_publication_year,book_img from contributed_books
    inner join books_detail on books_detail.prime_book_id = contributed_books.contributed_book_id
    where contributed_books.user_id =  ?;`;

  let fetch_auth = `select author_name from books_author 
    inner join authors on books_author.author_id = authors.author_id
    inner join contributed_books on contributed_books.contributed_book_id = books_author.prime_book_id
    where user_id= ?;`;
  let resforfetchconto = (await execute(fetchcontro, 15)) as Array<{}>;
  let resfetchconto = JSON.parse(JSON.stringify(resforfetchconto));
  let resforfetchauthconto = (await execute(fetch_auth, 15)) as Array<object>;
  let resfetchauthconto = JSON.parse(JSON.stringify(resforfetchauthconto));
  res.json({ resfetchconto, resfetchauthconto });
};
export const contribute_post = async (req: Request, res: Response) => {
  const { book_name, author_name, sel_reason, sel_cat, sel_lan } = req.body;
  let bookname = book_name.trim();

  let checkcontro:string = `select book_name,author_name,sel_lan from contribution 
    where user_id = 1;`;
  let response = "";
  let checkcontribute = (await execute(checkcontro,'')) as Array<object>;
  let checkcontribuution =JSON.parse(JSON.stringify(checkcontribute));

  checkcontribuution.forEach(async (element:any) => {
    if (element.book_name === bookname) {
      response = "error";
    }
  });
  if (response == "") {
    let controquery = `insert into contribution(book_name,user_id,author_name,reason_id,sel_cat,sel_lan) values (?,?,?,?,?,?)`;
    let valuescontro = [bookname, 1, author_name, sel_reason, sel_cat, sel_lan];
    await execute(controquery, valuescontro);
    response = "success";
  }
  res.json(response);
};

export const fetchcomment = async (req: Request, res: Response) => {
  // let book_id:number = req.query.book_id || 1;
  let fetchcmmnt:string = `select comment_id,comment,comments.created_at,u_fname,user_id from comments
    inner join users on comments.reader_id =users.user_id
    where book_id=?;`;
  const fetchcmt = (await execute(fetchcmmnt, book_id)) as Array<object>;
  res.json(fetchcmt);
};

export const fetchnestedcmt = async (req: Request, res: Response) => {
  const comment_id_final = req.query.comment_id;
  let comment_id =JSON.parse(JSON.stringify(comment_id_final));
  
  let fetchnestedomment = `select nested_comment,nested_comments.created_at,u_fname,user_id from nested_comments
  inner join users on nested_comments.reader_id =users.user_id
  inner join comments on nested_comments.comment_id = comments.comment_id
  where nested_comments.comment_id=?;`;
    let dataofnestedcmt = (await execute(fetchnestedomment, comment_id)) as Array<object>;
    
  res.json({ dataofnestedcmt, comment_id });
};
export const postcomment = async (req: Request, res: Response) => {
  let u_id = JSON.parse(JSON.stringify(req.query.user_id));
  let book_id_for_cmt = JSON.parse(JSON.stringify(req.query.book_id));
  let comment = JSON.parse(JSON.stringify(req.query.comment));
    let insertcmt:string = `insert into comments(reader_id,book_id,comment) values (?,?,?)`;
    let insvalues:string[] = [u_id,book_id_for_cmt ,comment];
    
    let insertcomment = (await execute(insertcmt, insvalues)) as Array<object>;
    let responseinsert =JSON.parse(JSON.stringify(insertcomment));

    if(responseinsert.affectedRows == 1){
        res.json("success")
    };
}
export const postnestedcomment = async (req: Request, res: Response) => {
 let u_id = JSON.parse(JSON.stringify(req.query.user_id));
 let book_id_nested = JSON.parse(JSON.stringify(req.query.book_id));
 let nestedcomment = JSON.parse(JSON.stringify(req.query.comment)); 
 let onwhomcmt = JSON.parse(JSON.stringify(req.query.onwhomecmt));

    let insnestedcmt = `insert into nested_comments(reader_id, book_id, nested_comment,comment_id) VALUES (?,?,?,?);`
    let insnestedvalues = [u_id,book_id_nested,nestedcomment,onwhomcmt];

    let insertnestedcmt = (await execute(insnestedcmt, insnestedvalues)) as Array<object>;
    let insertednestedcmt = JSON.parse(JSON.stringify(insertnestedcmt));;
    if(insertednestedcmt.affectedRows == 1){
        res.json("success")
    };
}
export const formpdf = (req: Request, res: Response) =>{
    res.render("libraryform",{user_id});
}

export const community = (req: Request, res: Response) =>{
  res.render("community/community",{user_id : user_id}  );
}
export const fetchcommunity =async (req: Request, res: Response)=>{
  let uimage:string = `select img_path from user_img where user_id = ? and isDeleted = 0; `;
  const userimage = (await execute(uimage,user_id)) as Array<{}>;

  let fetchcom:string = `select u_fname,u_lname,img_path,uploaded_text,uploaded_filepath,CAST(community.created_at AS DATE) as postdate,CAST(users.created_at AS DATE) as joindate,upload_id from community
  inner join users on users.user_id =  community.user_id
  inner join user_img on users.user_id =  user_img.user_id
  where user_img.isDeleted = 0;`

  const fetchofcom = (await execute(fetchcom,'')) as Array<{}>;
  res.json({fetchofcom,userimage});
}

export const postincommunity =async (req: Request, res: Response,) => {
  // let user_id = req.user[0].user_id;
  let textinput:string = req.body.textinput || '';
  let finalpath = '';
  
 if (req.file != undefined) {
  let filepath = req.file.destination;
  filepath  = filepath.substring(8);
  let filename = req.file.filename;
  finalpath = filepath.concat("/",filename);
 }
  let qrforcom :string = ` insert  into community (user_id,uploaded_text,uploaded_filepath)
  values(15,?,?);`;
  let valuesforcom:[string,string] = [textinput,finalpath]; 
 let rescomupload = (await execute(qrforcom,valuesforcom)) as Array<object>;

 let responseinsert =JSON.parse(JSON.stringify(rescomupload));

  if (responseinsert.insertId != null) {
      res.json("success");
  }
}