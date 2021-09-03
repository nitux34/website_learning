
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var mysql = require('mysql');
const config_data  =  require('../config/global_variables');
var con = mysql.createConnection({host: config_data.db_host,user: config_data.db_root_user, password: config_data.db_password, database: config_data.db_name});

let basePath = config_data.basePath;


/* router.get('/image', async function (req, res) {  
    res.sendFile(baseUrl.concat('_DSC3956.JPG'));
  }); */

  //Get image with image id

  // RESIZE IMAGES : https://malcoded.com/posts/nodejs-image-resize-express-sharp/
router.get('/image', function (req, res) {
  try {
      const sql = `SELECT path_image FROM gallery WHERE id=?`
      con.query(sql, [req.query.id],function(err, result, fields){   
        res.sendFile(basePath.concat("artwork/").concat(result[0].path_image));
      })
  } catch (error) {
      console.log("content.js, get/image error")
      res.send({ status: 0, error: error });
  }
});


router.get('/blogpost', function (req, res) {
  try {
      //const sql = `SELECT path_image FROM gallery WHERE id=?`
      console.log("blog TEST",);
      //con.query(sql, [req.query.id],function(err, result, fields){
        //console.log(result[0].path_image)    
        res.sendFile(basePath.concat("blogposts/blog0/").concat("body0.md"));
      //})
  } catch (error) {
      console.log("content.js, get/blogpost error")
      res.send({ status: 0, error: error });
  }
});

router.get('/list', async function (req, res) {
  try {
    const sql = `SELECT * FROM gallery`
    //console.log("list")
    con.query(sql, [],function(err, result, fields){
        if(err){                          
            res.send({ status: 0, data: err });
        }else{
            let token = jwt.sign({ data: result }, 'secret') //??
            res.send({ status: 1, data: result, token: token });                         
        }
    })
  } catch (error) {
      console.log("content.js, get/list error")
      res.send({ status: 0, error: error });
  }
});

/* router.post('/upload', async function (req, res) {
  let file = req['files'].thumbnail;
  console.log("File uploaded: ", file.name);
}); */
module.exports = router;