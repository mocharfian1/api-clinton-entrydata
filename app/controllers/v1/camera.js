const { PhotoModel } = require('../../helper/db')
const sharp = require('sharp');
const { uploadToDrive } = require('./gdrive')

const uploadImage = async function (req, res) {
    logger.info(req)
    const toSubmitPhoto = {
        no_ktp: req.body.no_ktp,
        message: req.body.message,
        code: req.file.filename.split('.')[0],
        ...req.file
    }
    PhotoModel.create(toSubmitPhoto).then(()=>{
        uploadToDrive(toSubmitPhoto.destination + toSubmitPhoto.filename, toSubmitPhoto.filename)
        sharp(toSubmitPhoto.path)
            .resize(10)
            .toFile(toSubmitPhoto.destination + toSubmitPhoto.filename + '.thumb', function(err) {
                logger.error('Compress Image : ', err)
            });
        logger.info('Sukses menambahkan data Gambar')
        res.json({ success: true })
    }).catch((e)=>{
        logger.error(e)
        res.json({ success: false })
    })

}

module.exports = {
    upload: uploadImage
}