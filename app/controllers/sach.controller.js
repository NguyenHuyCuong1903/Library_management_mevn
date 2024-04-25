const jwt = require('jsonwebtoken');
const Book = require('../schema/Sach');

module.exports = class SachController {
    async getAll(req, res, next) {
        try {
            const books = await Book.find().populate('MaNXB');
            res.status(200).json({
                books: books,
                statusCode: 200,
            });
        } catch (error) {
            console.log(error);
            return next(new ApiError('500', 'Resource not found'));
        }
    }

    async add(req, res, next) {
        const token = req.headers['authorization'];
        jwt.verify(token, 'CT449', async function (error, user) {
            if (error || !user.ChucVu) {
                res.status(401).json({
                    error: 'Bạn không có quyền truy cập !!!',
                });
            } else {
                try {
                    let book = new Book(req.body);
                    return await book
                        .save()
                        .then(async () => {
                            await book.populate('MaNXB');
                            res.status(200).json({
                                book: book,
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

    async update(req, res, next) {
        const token = req.headers['authorization'];
        jwt.verify(token, 'CT449', async function (error, user) {
            if (error || !user.ChucVu) {
                res.status(401).json({
                    error: 'Bạn không có quyền truy cập !!!',
                });
            } else {
                try {
                    let book = await Book.findOneAndUpdate(
                        { _id: req.body._id },
                        {
                            TenSach: req.body.TenSach,
                            DonGia: req.body.DonGia,
                            SoQuyen: req.body.SoQuyen,
                            NamXuatBan: req.body.NamXuatBan,
                            MaNXB: req.body.MaNXB,
                            NguonGoc: req.body.NguonGoc,
                            HinhAnh: req.body.HinhAnh,
                        },
                        {
                            new: true,
                        },
                    );
                    await book.populate('MaNXB');
                    res.status(200).json({
                        book: book,
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
        const { masach } = req.params;

        jwt.verify(token, 'CT449', async function (error, user) {
            if (error || !user.ChucVu) {
                res.status(401).json({
                    error: 'Bạn không có quyền truy cập !!!',
                });
            } else {
                try {
                    const book = await Book.findOneAndDelete({ MaSach: masach });
                    res.status(200).json({
                        book: book,
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