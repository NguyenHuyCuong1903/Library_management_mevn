<script>
import { ElButton, ElInput, ElMessage } from 'element-plus';
import { nxbStore } from '@/stores/nxb';

export default {
    components: {
        ElInput,
    },
    data() {
        return {
            nxbs: nxbStore().NXB,
            search: '',
        };
    },
    computed: {
        filteredNxb() {
            if (this?.nxbs) {
                return this.nxbs.filter((book) => book.TenNXB.toLowerCase().includes(this.search.toLowerCase()));
            }
            return [];
        },
    },
    methods: {
        navigatorToAdd() {
            this.$router.push({
                name: 'add-nxb',
            });
        },
        navigatorToEdit(MaNXB) {
            this.$router.push({
                name: 'edit-nxb',
                params: {
                    MaNXB,
                },
            });
        },
        async handleDelete(MaNXB) {
            const result = await nxbStore().delete(MaNXB);
            ElMessage(result);
            this.nxbs = nxbStore().NXB;
        },
    },
};
</script>

<template>
    <div class="Book">
        <h4 class="text-center m-2">Quản lý nhà xuất bản</h4>
        <div class="container create-btn-container d-flex justify-content-end">
            <el-button type="primary" plain @click="navigatorToAdd">Thêm NXB mới</el-button>
        </div>
        <div class="container table-container">
            <el-table :data="filteredNxb" style="width: 100%">
                <el-table-column type="index" label="STT"> </el-table-column>
                <el-table-column label="Tên NXB" prop="TenNXB"> </el-table-column>
                <el-table-column label="Địa chỉ NXB" prop="DiaChi"> </el-table-column>
                <el-table-column align="right">
                    <template #header>
                        <el-input v-model="search" size="small" placeholder="Nhập tên nhà xuất bản để tìm kiếm" />
                    </template>
                    <template #default="scope">
                        <el-button size="small" @click="navigatorToEdit(scope.row.MaNXB)">Chỉnh sửa</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.row.MaNXB)">Xóa</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<style lang="scss">
.book {
    .table-container {
    }
}
</style>
