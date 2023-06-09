module.exports = {
    USER: {
        REGISTER: {
            ER_DUP_ENTRY: "Data pengguna dengan NIK tersebut sudah ada.",
            ER_ACCESS_DENIED_ERROR: "Koneksi ke Database GAGAL.",
            DIGIT_KTP: "Nomor KTP tidak boleh lebih dari 16 digit.",
            ER_DUP_ENTRY_NO_HP: "No Handphone sudah digunakan.",
            EMPTY_NIK: "NIK Tidak boleh kosong.",
            EMPTY_TELP: "No Telp tidak boleh kosong."
        }
    },
    GUID: function(){
        const hex = "0123456789ABCDEF";
        const model = "xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx";
        var str = "";
        for (var i = 0; i < model.length; i++) {
            var rnd = Math.floor(Math.random() * hex.length);
            str += model[i] === "x" ?  hex[rnd] : model[i] ;
        }
        return str.toLowerCase();
    }
}
