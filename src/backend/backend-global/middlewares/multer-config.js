/* eslint-disable */
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, '/var/data/images');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = file.mimetype.split('/')[1];
        callback(null, name + Date.now() + '.' + extension);
    }
});

const fileFilter = (req, file, callback) => {
    if (file.mimetype.startsWith('image/')) {
        callback(null, true);
    } else {
        callback(new Error('Seuls les fichiers images sont autorisés'), false);
    }
};

module.exports = multer({ storage: storage, fileFilter: fileFilter }).single('image');
