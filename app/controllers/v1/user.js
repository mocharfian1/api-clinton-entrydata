const { UserModel } = require('../../helper/db')
const { registerForm } = require('../../model/registerModel')
const { USER: { REGISTER } } = require('../../helper/constants')
const { validationRegisterForm } = require('../../helper/validation')

const allUser = async (req, res) => {
    UserModel.findAll().then((e)=>{
        return res.send(e)
    }).catch((err) => {
        console.log(err)
    })

}

const userById = (req, res) => {
    return res.send({ oke: 'OKE' })
}

const register = async (req, res, next) => {
    try{
        const validation = await validationRegisterForm(req.body)
        if(validation.valid){
            req.body.password = Buffer.from(req.body.password).toString('base64')
            UserModel.create(registerForm(req.body)).then((data) => {
                res.json({
                    success: true,
                    message: "Berhasil menambahkan pengguna.",
                    data: data
                })
            }).catch((err) => {
                console.log(err)
                res.status(400).send({
                    success: false,
                    message: "Gagal menambahkan pengguna.",
                    messageDetail: REGISTER[err.parent.code],
                    data: null
                })
            })
        } else {
            res.status(400).json({
                success: false,
                message: "Gagal menambahkan pengguna.",
                messageDetail: validation.message,
                data: null
            })
        }
    }catch (e) {
        console.log('==> ERR : ', e)
        res.status(400).json({
            success: false,
            message: "Gagal menambahkan pengguna.",
            messageDetail: "Internal Server Error",
            data: null
        })
    }

}

module.exports = {
    getListAllUser: allUser,
    getUser: userById,
    registerUser: register
}
