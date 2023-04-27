const { USER } = require('./constants')
const { UserModel } = require('../helper/db')

const registerForm = async function (form){
    let arrValidation = []
    try{
        if(arrValidation.length === 0 && form.hasOwnProperty('no_ktp')){
            console.log("===> Check NO_KTP")
            if(form.no_ktp.length > 16){
                arrValidation.push({ valid: false, message: USER.REGISTER.DIGIT_KTP })
            }

            await UserModel.findOne({
                where: {
                    no_ktp: form.no_ktp
                }
            }).then(res => {
                if(res){
                    arrValidation.push({ valid: false, message: USER.REGISTER.ER_DUP_ENTRY })
                }
            })
        }else{
            arrValidation.push({ valid: false, message: USER.REGISTER.EMPTY_NIK })
        }

        if(arrValidation.length === 0 && form.hasOwnProperty('telp')){
            console.log("===> Check TELP")
            await UserModel.findOne({
                where: {
                    telp: form.telp
                }
            }).then(res => {
                if(res){
                    arrValidation.push({ valid: false, message: USER.REGISTER.ER_DUP_ENTRY_NO_HP })
                }
            })
        }else{
            arrValidation.push({ valid: false, message: USER.REGISTER.EMPTY_TELP })
        }

        return arrValidation.length > 0 ? arrValidation[0] : { valid: true, message: null }
    }catch (e){
        return { valid: true, message: null }
    }
}

module.exports = {
    validationRegisterForm: registerForm
}
