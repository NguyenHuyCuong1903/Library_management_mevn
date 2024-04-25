const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const theoDoiMuonSachSchema = new mongoose.Schema({
    mamuon: Number,
    MaDocGia: { type: mongoose.Schema.ObjectId, ref: 'DocGia', require: true },
    MaSach: { type: mongoose.Schema.ObjectId, ref: 'Sach', require: true },
    NgayMuon: { type: Date},
    NgayTra: { type: Date },
    TrangThai: { type: String, required: true, default: 'pending'}
  },
  {timestamps: true},
);

theoDoiMuonSachSchema.plugin(AutoIncrement, { inc_field: 'mamuon', start_seq: 1 });
const theodoimuonsach = mongoose.model("TheoDoiMuonSach", theoDoiMuonSachSchema);
module.exports = mongoose.models?.TheoDoiMuonSach || theodoimuonsach;