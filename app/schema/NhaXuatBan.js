const mongoose = require('mongoose');

const nhaXuatBanSchema = new mongoose.Schema({
    MaNXB: { type: String, required: true, unique: true },
    TenNXB: { type: String, required: true },
    DiaChi: { type: String, required: true }
  },
  {timestamps: true}
);
  
module.exports = mongoose.models?.NhaXuatBan || mongoose.model('NhaXuatBan', nhaXuatBanSchema);