import multer from "multer";
import path from "path"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/temp')
  },
  filename: function (req, file, cb) {
    // cb(null, file.originalname)

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext)
  }
})

export const upload = multer(
  { 
    storage: storage,
    limits: {
      fileSize: 10 * 1024 * 1024 //10MB
    }
  }
)