<script>
import { useBorrowStore } from '@/stores/borrow';
import { ElButton, ElInput, ElMessage } from 'element-plus';
import { mapStores } from 'pinia';
export default {
    setup() {
        const borrow = useBorrowStore();
        if (!borrow.fetchAdmin) {
            borrow.fetchBorrowAdmin();
        }
    },
    components: {
        ElInput,
    },
    computed: {
        ...mapStores(useBorrowStore),
    },
    data: () => {
        return {
            value: '',
        };
    },
    methods: {
        async handleSave(data) {
            const result = await this.borrowStore.updateBorrowAdmin(data);
            ElMessage(result);
        },
        async handleDelete(id) {
            const result = await this.borrowStore.deleteBorrowAdmin(id);
            ElMessage(result);
        },
    },
};
</script>

<template>
    <div class="Book">
        <h4 class="text-center m-2">Quản lý mượn sách</h4>
    </div>
    <div class="container table-container">
        <el-table :data="borrowStore.borrowsAdmin" style="width: 100%">
            <el-table-column type="expand">
                <template #default="scope">
                    <div class="row">
                        <div class="col-6">
                            <h6>Thông tin người mượn:</h6>
                            <p m="t-0 b-2">Tên: {{ scope.row?.MaDocGia.Ten }}</p>
                            <p m="t-0 b-2">Số điện thoại: {{ scope.row?.MaDocGia.SoDienThoai }}</p>
                            <p m="t-0 b-2">Giới tính: {{ scope.row?.MaDocGia.Phai }}</p>
                            <p m="t-0 b-2">Địa chỉ: {{ scope.row?.MaDocGia.DiaChi }}</p>
                        </div>
                        <div class="col-6">
                            <h6>Thông tin mượn:</h6>
                            <p m="t-0 b-2">
                                Ngày mượn: {{ scope.row?.NgayMuon && new Date(scope.row?.NgayMuon).toLocaleString() }}
                            </p>
                            <p m="t-0 b-2">
                                Ngày trả: {{ scope.row?.NgayTra && new Date(scope.row?.NgayTra).toLocaleString() }}
                            </p>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="Mã mượn" prop="mamuon"></el-table-column>
            <el-table-column label="Tên Sách">
                <template #default="scope">
                    <router-link :to="`/book/${scope.row.MaSach.MaSach}`">
                        {{ scope.row.MaSach.TenSach }}
                    </router-link>
                </template>
            </el-table-column>
            <el-table-column label="Tên người mượn">
                <template #default="scope">
                    {{ scope.row.MaDocGia.Ten }}
                </template>
            </el-table-column>
            <el-table-column label="Trạng thái" prop="TrangThai">
                <template #default="scope">
                    <el-select
                        class="w-100"
                        v-model="scope.row.TrangThai"
                        placeholder="Chọn nhà xuất bản"
                        size="large"
                        style="width: 240px"
                    >
                        <el-option label="Đang chờ" value="pending" />
                        <el-option label="Đang mượn" value="borrow" />
                        <el-option label="Đã trả" value="paid" />
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column align="right">
                <template #default="scope">
                    <el-button size="small" @click="handleSave({ _id: scope.row._id, TrangThai: scope.row.TrangThai })"
                        >Lưu</el-button
                    >
                    <el-button size="small" type="danger" @click="handleDelete(scope.row._id)">Xóa</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<style lang="scss"></style>
