const { PhotoModel, UserModel, SessionModel } = require('../../helper/db')
const fs = require('fs')
logger.category = 'HISTORY'


const getHistory = async function (req, res) {
    try{
        if(!req.headers.authorization) {
            res.status(403).json({
                success: false,
                message: "Unauthorized",
                messageDetail: "Token tidak valid.",
                data: null
            });
            return false;
        }

        let session = await SessionModel.findOne({
            where: {
                token: req.headers.authorization
            }
        })

        if(!session) {
            res.status(403).json({
                success: false,
                message: "Unauthorized",
                messageDetail: "Token tidak valid.",
                data: null
            });
            return false;
        }

        let user = await UserModel.findOne({
            where: {
                no_ktp: session.no_ktp
            }
        });

        if(!user) {
            res.status(400).json({
                success: false,
                message: "user not found",
                messageDetail: "Pengguna tidak ditemukan.",
                data: null
            });
            return false;
        }

        let photo;
        let itemPhoto;

        if(req.query.hasOwnProperty('code')){
            photo = await PhotoModel.findOne({
                where: {
                    no_ktp: user.no_ktp,
                    code: req.query.code
                }
            })

            itemPhoto = JSON.parse(JSON.stringify(photo))
            itemPhoto.base64thumb = await fs.readFileSync(itemPhoto.path + '.thumb', "base64")
            itemPhoto.base64 = await fs.readFileSync(itemPhoto.path, "base64")
        }else{
            photo = await PhotoModel.findAll({
                where: {
                    no_ktp: user.no_ktp,
                },
                order: [
                    [
                        'created_at', 'desc'
                    ]
                ]
            })

            let ph = JSON.parse(JSON.stringify(photo))
            itemPhoto = await ph.map((x) => {
                x.base64 = fs.readFileSync(x.path + '.thumb', "base64")
                return x
            })
        }

        res.status(200).json({
            success: true,
            message: "Berhasil mendapatkan data.",
            messageDetail: "Berhasil mendapatkan data photo.",
            data: itemPhoto
        })
    }catch (e) {
        logger.error(e)
        res.status(400).json({
            success: false,
            message: "Gagal mendapatkan data.",
            messageDetail: "Gagal mendapatkan data photo.",
            data: null
        })
    }

}

const getHistoryByCode = async function (req, res) {

}

module.exports = {
    getHistory: getHistory
}