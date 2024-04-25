const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const sachSchema = new mongoose.Schema({
    MaSach: Number,
    TenSach: { type: String, required: true },
    // DonGia: { type: Number, required: true },
    SoQuyen: { type: Number, required: true },
    SoQuyenDaMuon: { type: Number, require: true, default: 0 },
    NamXuatBan: { type: Date, required: true },
    MaNXB: { type: mongoose.Schema.ObjectId, ref: 'NhaXuatBan', require: true },
    NguonGoc: { type: String },
    HinhAnh: { type: String },
    },
    {timestamps: true}
);
sachSchema.plugin(AutoIncrement, { inc_field: 'MaSach', start_seq: 1000 });
  
module.exports = mongoose.models?.Sach || mongoose.model('Sach', sachSchema);