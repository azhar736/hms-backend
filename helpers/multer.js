const multer = require("multer");
const path= require("path");
// console.log(path.join(__dirname+"/../Images"));
const destinationPath=path.join(__dirname+"/../Images");
const storage=multer.diskStorage({
  destination:(req,res,cb)=>{
     cb(null,destinationPath)
  },
  filename:(req,file,cb)=>{
    console.log(file);
    cb(null,Date.now()+ path.extname(file.originalname))
  }
})
const upload = multer({storage: storage});


module.exports=upload;