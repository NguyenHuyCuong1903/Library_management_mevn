const Book = require('../schema/Sach');
const Borrow = require('../schema/TheoDoiMuonSach');
const jwt = require('jsonwebtoken');

class BorrowController {
    async getAllForUser(req, res, next) {
        const token = req.headers['authorization'];
        jwt.verify(token, 'CT449', async (error, user) => {
            if (error) {
                res.status(401).json({
                    error: 'Bạn không có quyền truy cập !!!',
                });
            } else {
                try {
                    const borrow = await Borrow.find({ MaDocGia: user._id }).populate('MaSach');
                    res.status(200).json({
                        borrows: borrow,
                    });
                } catch (error) {
                    console.log(error);
                    return next(new ApiError('400', 'Resource not found'));
                }
            }
        });
    }

    async getAllForAdmin(req, res, next) {
        const token = req.headers['authorization'];
        jwt.verify(token, 'CT449', async (error, user) => {
            if (error || !user.ChucVu) {
                res.status(401).json({
                    error: 'Bạn không có quyền truy cập !!!',
                });
            } else {
                try {
                    const borrow = await Borrow.find()
                        .populate('MaSach')
                        .populate('MaDocGia', ['DiaChi', 'Phai', 'NgaySinh', 'SoDienThoai', 'Ten']);
                    res.status(200).json({
                        borrows: borrow,
                    });
                } catch (error) {
                    console.log(error);
                    return next(new ApiError('400', 'Resource not found'));
                }
            }
        });
    }

    async addBorrow(req, res, next) {
        const token = req.headers['authorization'];
        jwt.verify(token, 'CT449', async (error, user) => {
            if (error) {
                res.status(401).json({
                    error: 'Bạn không có quyền truy cập !!!',
                });
            } else {
                try {
                    const borrow = new Borrow({
                        MaDocGia: user._id,
                        MaSach: req.body.MaSach,
                    });
                    const result = await borrow.save();
                    await Book.findByIdAndUpdate(req.body.MaSach, { $inc: { SoQuyenDaMuon: 1 } });
                    res.status(200).json({
                        message: 'Mượn sách thành công, đến thư viện để nhận sách',
                        borrow: result,
                    });
                } catch (error) {
                    console.log(error);
                    return next(new ApiError('400', 'Resource not found'));
                }
            }
        });
    }

    async editBorrow(req, res, next) {
        const token = req.headers['authorization'];
        jwt.verify(token, 'CT449', async (error, user) => {
            if (error || !user.ChucVu) {
                res.status(401).json({
                    error: 'Bạn không có quyền truy cập !!!',
                });
            } else {
                try {
                    if (req.body.TrangThai === 'borrow') {
                        const borrow = await Borrow.findOneAndUpdate(
                            { _id: req.body._id },
                            { TrangThai: req.body.TrangThai, NgayMuon: Date.now() },
                            { new: true }
                        )
                            .populate('MaSach')
                            .populate('MaDocGia', ['DiaChi', 'Phai', 'NgaySinh', 'SoDienThoai', 'Ten']);
                        res.status(200).json({
                            message: 'Cập nhật thành công',
                            borrow: borrow,
                        });
                    } else if (req.body.TrangThai === 'paid') {
                        const borrow = await Borrow.findOne({ _id: req.body._id });
                        const currentDay = Date.now();
                        borrow.TrangThai = req.body.TrangThai;
                        borrow.NgayTra = currentDay;
                        const result = await borrow.save();
                        await Book.findByIdAndUpdate(borrow.MaSach, { $inc: { SoQuyenDaMuon: -1 } });
                        const updatedBorrow = await Borrow.findOne({ _id: req.body._id })
                            .populate('MaSach')
                            .populate('MaDocGia', ['DiaChi', 'Phai', 'NgaySinh', 'SoDienThoai', 'Ten']);
                        res.status(200).json({
                            message: 'Cập nhật thành công',
                            borrow: updatedBorrow,
                        });
                    }
                } catch (error) {
                    console.log(error);
                    return next(new ApiError('400', 'Resource not found'));
                }
            }
        });
    }

    async deleteBorrow(req, res, next) {
        const token = req.headers['authorization'];
        const { id } = req.params;

        jwt.verify(token, 'CT449', async (error, user) => {
            if (error || !user.ChucVu) {
                res.status(401).json({
                    error: 'Bạn không có quyền truy cập !!!',
                });
            } else {
                try {
                    const borrow = await Borrow.findOneAndDelete({ _id: id });
                    if (borrow) {
                        if (borrow.TrangThai !== 'paid') {
                            await Book.findByIdAndUpdate(borrow.MaSach, { $inc: { SoQuyenDaMuon: -1 } });
                        }
                        res.status(200).json({
                            message: 'Xóa thành công',
                            borrow: borrow,
                        });
                    } else {
                        res.status(500).json({
                            message: 'Xóa thất bại',
                        });
                    }
                } catch (error) {
                    console.log(error);
                    return next(new ApiError('400', 'Resource not found'));
                }
            }
        });
    }

    async deleteBorrowUser(req, res, next) {
        const token = req.headers['authorization'];
        const { id } = req.params;

        jwt.verify(token, 'CT449', async (error, user) => {
            if (error) {
                res.status(401).json({
                    error: 'Bạn không có quyền truy cập !!!',
                });
            } else {
                try {
                    console.log('vo day');
                    const borrow = await Borrow.findOneAndDelete({ _id: id, MaDocGia: user._id, TrangThai: 'pending' });
                    if (borrow) {
                        await Book.findByIdAndUpdate(borrow.MaSach, { $inc: { SoQuyenDaMuon: -1 } });
                        res.status(200).json({
                            message: 'Xóa thành công',
                            borrow: borrow,
                        });
                    } else {
                        res.status(500).json({
                            message: 'Xóa thất bại',
                        });
                    }
                } catch (error) {
                    console.log(error);
                    return next(new ApiError('400', 'Resource not found'));
                }
            }
        });
    }
}
                            
module.exports = BorrowController;