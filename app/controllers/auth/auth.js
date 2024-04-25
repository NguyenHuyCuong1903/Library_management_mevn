const DocGia = require('../../schema/DocGia');
const NhanVien = require('../../schema/NhanVien');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = class AuthController {
    async signupDocGia(req, res) {
        try {
            const data = req.body;
            const userIsExist = await DocGia.exists({ SoDienThoai: data.SoDienThoai });

            if (!userIsExist) {
                let uniqueMaDocGia;
                do {
                    uniqueMaDocGia = Math.floor(Math.random() * 9000) + 1000; // Random 4-digit number
                } while (await DocGia.exists({ MaDocGia: uniqueMaDocGia }));
                const user = new DocGia({
                    MaDocGia: uniqueMaDocGia,
                    HoLot: data.HoLot,
                    Ten: data.Ten,
                    NgaySinh: data.NgaySinh,
                    Phai: data.Phai,
                    DiaChi: data.DiaChi,
                    SoDienThoai: data.SoDienThoai,
                    Password: bcrypt.hashSync(data.Password, 10),
                });
                await user.save();
                res.status(200).json({
                    status: 200,
                    message: 'Đăng ký thành công! bạn đã có thể đăng nhập',
                });
            } else {
                res.status(200).json({ message: 'Số điện thoại đã tồn tại' });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: 500,
                message: 'Internal server error',
            });
        }
    }

    async signinDocGia(req, res) {
        try {
            const user = req.body;
            const checkUser = await DocGia.findOne({ SoDienThoai: user?.SoDienThoai });

            if (checkUser) {
                if (await bcrypt.compare(user?.Password, checkUser.Password)) {
                    const { password, ...userInfor } = checkUser._doc;
                    const token = jwt.sign(userInfor, 'CT449', { expiresIn: '24h' });
                    res.status(200).json({ data: { user: userInfor, token }, message: 'Đăng nhập thành công' });
                } else {
                    res.status(200).json({ message: 'Mật khẩu không đúng' });
                }
            } else {
                res.status(200).json({ message: 'Tài khoản không đúng' });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: 500,
                message: 'Internal server error',
            });
        }
    }

    async signupNhanVien(req, res) {
        try {
            const data = req.body;
            const userIsExist = await NhanVien.exists({ SoDienThoai: data.SoDienThoai });

            if (!userIsExist) {
                const user = new NhanVien({
                    HoTenNV: data.HoTenNV,
                    Password: bcrypt.hashSync(data.Password, 10),
                    ChucVu: data.ChucVu,
                    DiaChi: data.DiaChi,
                    SoDienThoai: data.SoDienThoai,
                });
                await user.save();
                res.status(200).json({
                    status: 200,
                    message: 'Đăng ký thành công! bạn đã có thể đăng nhập',
                });
            } else {
                res.status(200).json({ message: 'Số điện thoại đã tồn tại' });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: 500,
                message: 'Internal server error',
            });
        }
    }

    async signinNhanVien(req, res) {
        try {
            const user = req.body;
            const checkUser = await NhanVien.findOne({ SoDienThoai: user?.SoDienThoai });

            if (checkUser) {
                if (await bcrypt.compare(user?.Password, checkUser.Password)) {
                    const { password, ...userInfor } = checkUser._doc;
                    const token = jwt.sign(userInfor, 'CT449', { expiresIn: '24h' });
                    res.status(200).json({ data: { user: userInfor, token }, message: 'Đăng nhập thành công' });
                } else {
                    res.status(200).json({ message: 'Mật khẩu không đúng' });
                }
            } else {
                res.status(200).json({ message: 'Tài khoản không đúng' });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: 500,
                message: 'Internal server error',
            });
        }
    }
};