const registerForm = (req) => {
    return {
        no_ktp: req.no_ktp,
        no_kk: req.no_kk,
        nama_lengkap: req.nama_lengkap,
        alamat_lengkap: req.alamat_lengkap,
        tempat_lahir: req.tempat_lahir,
        tanggal_lahir: req.tanggal_lahir,
        telp: req.telp,
        koordinator: req.koordinator,
        password: req.password,
        provinsi: req.provinsi,
        kabkota: req.kabkota,
        kecamatan: req.kecamatan,
        kelurahan: req.kelurahan,
        rt: req.rt,
        rw: req.rw
    }
}

module.exports = {
    registerForm: registerForm
}
