const multer  = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/imagenes/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const originName = file.originalname;
        const split = originName.split('.');
        const position = split.length - 1;
        const extn = split[position];
        const fileName = `${uniqueSuffix}.${extn}`;
        cb(null, fileName)
    }
})

const upload = multer({ storage: storage }).single('imagen');

module.exports = upload;