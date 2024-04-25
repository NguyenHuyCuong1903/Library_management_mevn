const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const docGiaSchema = new mongoose.Schema({
    MaDocGia: { type: Number, required: true, unique: true, },
    HoLot: { type: String, required: true, },
    Ten: { type: String, required: true, },
    NgaySinh: { type: Date, required: true, default: Date.now()},
    Phai: { type: String, required: true, },
    DiaChi: { type: String, required: true, },
    SoDienThoai: { type: String, required: true, },
    Password: { type: String, required: true, },
    },
    {timestamps: true}
);

docGiaSchema.plugin(AutoIncrement, { inc_field: 'MaDocGia', start_seq: 1000 });

module.exports = mongoose.models?.DocGia || mongoose.model('DocGia', docGiaSchema);