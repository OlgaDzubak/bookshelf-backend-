const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const {httpError} = require('../helpers');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {

    try {
      console.log("я в upload new CloudinaryStorage");
      let folder;

      if (file.fieldname === 'avatar') {
        console.log("file.fieldname === 'avatar'");
        folder = 'avatars';
      }
      
      console.log("я перед return CloudinaryStorage");
      return {
        folder: folder,
        allowed_formats: ["jpg", "png"],
        public_id: file.originalname, 
        transformation: [
                          { height: 250, crop: "scale" },
                          { height: 250, crop: "scale" },
                        ],
        };
    }catch(error){
       console.log(error);
       if (error.message = "") {
         next(httpError(500, "Cloudinary uploading error. Wrong file format!"));
       }
    }},
});

const upload = multer({ storage });


//----------------------------------------------------------------------------------------------

module.exports = upload;
