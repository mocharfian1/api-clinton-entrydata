const responseLogin = (req) => {
    return {
        telp: req.telp,
        nama_lengkap: req.nama_lengkap,
        no_ktp: req.no_ktp,
        no_kk: req.no_kk,
        tempat_lahir: req.tempat_lahir,
        tanggal_lahir: req.tanggal_lahir,
        koordinator: req.koordinator,
        provinsi: req.provinsi,
        kabkota: req.kabkota,
        kecamatan: req.kecamatan,
        kelurahan: req.kelurahan,
        rt: req.rt,
        rw: req.rw,
        alamat_lengkap: req.alamat_lengkap
    }
}

module.exports = {
    loginResponse: responseLogin
}
