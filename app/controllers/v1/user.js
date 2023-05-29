const { UserModel } = require('../../helper/db')
const { getLoginInformation, checkSessionSvc, getKoordinatorSvc } = require('../../service/UserService')
const { registerForm } = require('../../model/registerModel')
const { USER: { REGISTER } } = require('../../helper/constants')
const { validationRegisterForm } = require('../../helper/validation')
logger.category = 'USER'

const allUser = async (req, res) => {
    UserModel.findAll().then((e)=>{
        return res.send(e)
    }).catch((err) => {
        logger.error(err)
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
                    messageDetail: "Berhasil menambahkan pengguna.",
                    data: data
                })
            }).catch((err) => {
                logger.error(err)
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

const login = async (req, res, next) => {
    logger.info("LOGIN Process")
    try{
        const user_agent = req.headers['user-agent']
        req.body.password = Buffer.from(req.body.password).toString('base64')
        const login = await getLoginInformation(req.body.no_ktp, req.body.password, user_agent)

        if(login){
            logger.info("Success")
            res.json({
                success: true,
                message: "Berhasil login.",
                data: login
            })
        }else{
            res.json({
                success: false,
                message: "Login Gagal.",
                messageDetail: "Username / Password tidak ditemukan."
            })
        }
    }catch (e) {
        console.error(e)
        res.status(400).json({
            success: false,
            message: "Gagal login.",
            messageDetail: "Internal Server Error",
            data: null
        })
    }
}

const checkSession = async (req, res, next) => {
    logger.category = 'SESSION'
    try{
        const session = await checkSessionSvc(req.headers['authorization'])
        logger.info("Sukses mendapatkan sesi login")
        res.status(200).json({
            success: true,
            message: "GET_SESSION_SUCCESS",
            messageDetail: "Berhasil mendapatkan sesi login",
            data: session
        });
    }catch (e) {
        console.error('===> ERROR ', e)
        res.status(400).json({
            success: false,
            message: "GET_SESSION_FAILED",
            messageDetail: "Gagal mendapatkan session.",
            data: null
        })
    }
}

const getKoordinator = async (req, res, next) => {
    try{
        const koordinator = await getKoordinatorSvc()
        if(koordinator){
            logger.info("Sukses mendapatkan sesi login")
            res.status(200).json({
                success: true,
                message: "GET_KOORDINATOR_SUCCESS",
                messageDetail: "Berhasil mendapatkan data koordinator",
                data: koordinator
            });
        } else {
            res.status(500).json({
                success: false,
                message: "GET_KOORDINATOR_FAILED",
                messageDetail: "Gagal mendapatkan data koordinator.",
                data: null
            })
        }
    }catch (e) {
        console.error('===> ERROR ', e)
        res.status(400).json({
            success: false,
            message: "GET_SESSION_FAILED",
            messageDetail: "Gagal mendapatkan session.",
            data: null
        })
    }
}

module.exports = {
    getListAllUser: allUser,
    getUser: userById,
    registerUser: register,
    loginUser: login,
    checkSessionSvc: checkSession,
    getKoordinator: getKoordinator
}
