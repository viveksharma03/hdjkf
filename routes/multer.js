var multer=require('multer')
const { uuid } = require('uuidv4');
var storage=multer.diskStorage({
destination:(req,file,path)=>{
    path(null,'/MERN/react/majorProject/backend/paynrent_backend/public/images')},
    filename:(req,file,path)=>{
        path(null,uuid()+(file.originalname.substring(file.originalname.lastIndexOf('.'))))}
});
var upload=multer({storage:storage})
module.exports=upload;