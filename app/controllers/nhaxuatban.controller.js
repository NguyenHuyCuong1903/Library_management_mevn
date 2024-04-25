const jwt = require('jsonwebtoken');
const NXB = require('../schema/NhaXuatBan');

module.exports = class NXBController {
    async add(req, res, next) {
        const token = req.headers['authorization'];

        jwt.verify(token, 'CT449', async function (error, user) {
            if (error || !user.ChucVu) {
                res.status(401).json({
                    error: 'Bạn không có quyền truy cập !!!',
                });
            } else {
                try {
                    const nxb = new NXB(req.body);
                    return await nxb
                        .save()
                        .then(() => {
                            res.status(200).json({
                                nxb: nxb,
                                statusCode: 200,
                                message: 'Thêm thành công',
                            });
                        })
                        .catch((error) => {
                            res.status(500).json({
                                statusCode: 500,
                                message: 'Thêm thất bại',
                            });
                        });
                } catch (error) {
                    console.log(error);
                    return next(new ApiError('400', 'Resource not found'));
                }
            }
        });
    }

    async getAll(req, res, next) {
        const token = req.headers['authorization'];
        jwt.verify(token, 'CT449', async function (error, user) {
            if (error || !user.ChucVu) {
                res.status(401).json({
                    error: 'Bạn không có quyền truy cập !!!',
                });
            } else {
                try {
                    const nxb = await NXB.find();
                    res.status(200).json({
                        nxb: nxb,
                        statusCode: 200,
                        message: 'Lấy thành công',
                    });
                } catch (error) {
                    res.status(500).json({
                        statusCode: 500,
                        message: 'Lấy thất bại',
                    });
                }
            }
        });
    }

    async update(req, res, next) {
        const token = req.headers['authorization'];
        jwt.verify(token, 'CT449', async function (error, user) {
            if (error || !user.ChucVu) {
                res.status(401).json({
                    error: 'Bạn không có quyền truy cập !!!',
                });
            } else {
                try {
                    const nxb = await NXB.findOneAndUpdate(
                        { MaNXB: req.body.MaNXB },
                        { TenNXB: req.body.TenNXB, DiaChi: req.body.DiaChi },
                        {
                            new: true,
                        },
                    );
                    res.status(200).json({
                        nxb: nxb,
                        statusCode: 200,
                        message: 'Cập nhật thành công',
                    });
                } catch (error) {
                    res.status(500).json({
                        statusCode: 500,
                        message: 'Cập nhật thất bại',
                    });
                }
            }
        });
    }

    async delete(req, res, next) {
        const token = req.headers['authorization'];
        const { manxb } = req.params;

        jwt.verify(token, 'CT449', async function (error, user) {
            if (error || !user.ChucVu) {
                res.status(401).json({
                    error: 'Bạn không có quyền truy cập !!!',
                });
            } else {
                try {
                    const nxb = await NXB.findOneAndDelete({ MaNXB: manxb });
                    res.status(200).json({
                        nxb: nxb,
                        statusCode: 200,
                        message: 'Xóa thành công',
                    });
                } catch (error) {
                    res.status(500).json({
                        statusCode: 500,
                        message: 'Xóa thất bại',
                    });
                }
            }
        });
    }
};