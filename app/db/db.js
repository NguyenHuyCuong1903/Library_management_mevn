const mongoose = require('mongoose');
const NhanVien = require("../schema/NhanVien")
const bcrypt = require('bcrypt');


async function connect() {
    try {
        if (!mongoose.connection.readyState) {
            await mongoose.connect('mongodb://localhost:27017/library');
            const numberOfNhanVien = await NhanVien.countDocuments();
            if (numberOfNhanVien)
                return;
            const newNhanVien = await NhanVien.create({MSNV: "admin", 
                HoTenNV: "admin", 
                Password: bcrypt.hashSync("admin", 10), 
                ChucVu: "Tong Giam Doc",
                DiaChi: "Can Tho",
                SoDienThoai: "0123"
            })
            console.log(newNhanVien);
            console.log('Database Connect successfully!!!');
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = { connect };