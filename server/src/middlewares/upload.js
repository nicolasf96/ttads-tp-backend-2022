import multer from 'multer';



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        console.log(file);
        const ext = file.originalname.split(".").pop();
        const fileName = Date.now();
        cb(null, `${fileName}.${ext}`)
    }
})

const upload = multer({ storage })



export default upload;