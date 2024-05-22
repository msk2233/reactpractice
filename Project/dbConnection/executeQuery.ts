import logger from '../logger';
import con from './connection';

async function execute(query:string, values:string[]|string|number) {
  con.connect(function (err) {
    if (err) throw err;
  });

  let res = new Promise((resolve, reject) => {
    con.query(query, values, (err, result) => {
      if (err) {
        logger.error("error is :" + err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
  let result = res
    .then((result) => {
      return result;
    })
    .catch((err) => {
      logger.error(err)
      return err;
    });
  return result;
}

export default execute;
