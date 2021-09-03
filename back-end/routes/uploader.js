var express = require('express');
var path = require('path');
//const app =express();
var router = express.Router();
var fileUpload = require('express-fileupload');
var fs = require('fs');
const config_data  =  require('../config/global_variables');
let basePath = config_data.basePath;

router.use(fileUpload({
    limits: {
        fileSize: 5*1024 * 1024 // 5 MB LIMIT FILESIZE
    },
    abortOnLimit: true
 }));




router.post('/image', function (req, res) {
    console.log("UOLOAD")
    //console.log(req.body.data)
    const file = req.files.data;
    const extensionName = path.extname(file.name);
    const filePath = basePath + "/blogposts/blog0/" + "img1" + extensionName; //file.md5 use this for unique names?
    const allowedExtension = ['.jpg','.jpeg'];

    if(!allowedExtension.includes(extensionName)){
        //return res.status(422).send("Invalid Image, allowed formats jpg/jpeg");
        return res.send({ status: 0, msg:"Error: Wrong filetype."})
    }
    if (!req.files) {
        return res.status(400).send("No files were uploaded.");
    }
    //console.log(req)
    
    
    file.mv(filePath, (err) => {
        if (err) {
          return res.status(500).send(err);
        }
        return res.send({ status: 1, msg: "Success: File uploaded", path: filePath });
      });
}); 
router.post('/md', function (req, res) {
    //console.log(req.body.data)
    const filePath = basePath + "/blogposts/blog0/" + "body0" + ".md"; //file.md5 use this for unique names?
    fs.writeFile(filePath, req.body.data, (err) => {
        if (err) {
          return res.status(500).send(err);
        }
        return res.send({ status: 1, msg: "Success: File saved", path: filePath });
      });
}); 
module.exports = router;
  