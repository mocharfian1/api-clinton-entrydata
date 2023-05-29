const { UserModel, SessionModel, KoordinatorModel } = require('../helper/db')
const { loginResponse } = require('../model/loginModel')

const loginInfo = async function(no_ktp, password, userAgent=null){
    let user = await UserModel.findOne({
        where: {
            no_ktp,
            password
        }
    })

    if (user) {
        const session = await createSession(no_ktp, userAgent)
        return {
            token: session.token,
            user: loginResponse(user)
        }
    }
    return false;
}

const createSession = async function(no_ktp, userAgent=null){
    const md5 = require('md5')
    return await SessionModel.create({
        no_ktp,
        token: md5(`${no_ktp}.${new Date().getTime()}`),
        user_agent: userAgent
    })
}

const checkSession = async function(token){
    let session = await SessionModel.findOne({
        where: { token }
    });

    if(session.toJSON().hasOwnProperty('id')){
        const user_information = await UserModel.findOne({
            where: {no_ktp: session.no_ktp}
        });

        const koordinator = await KoordinatorModel.findOne({
            where: {
                code: user_information.koordinator
            }
        });

        return {
            ...user_information.toJSON(),
            koordinator: koordinator
        }
    }
    return {}
}

const getKoordinator = async function(){
    return await KoordinatorModel.findAll()
}

module.exports = {
    getLoginInformation: loginInfo,
    checkSessionSvc: checkSession,
    getKoordinatorSvc: getKoordinator
}