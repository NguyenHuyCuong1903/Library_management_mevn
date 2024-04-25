<script>
export default {
    components: {},
    props: {
        nxb: {
            type: Object,
            required: false,
        },
    },
    data: () => {},
    methods: {
        submit() {
            this.nxb.MaNXB = Math.random().toString(36).substring(2, 8);
            this.$emit('handleSubmit', this.nxb);
            this.$router.go(-1);
        },
    },
};
</script>

<template>
    <div class="nxb">
        <div class="d-flex flex-column">
            <label>Tên nhà xuất bản:</label>
            <el-input v-model="nxb.TenNXB" style="width: 300px" size="large" placeholder="Nhập tên nhà xuất bản" />
        </div>
        <div class="d-flex flex-column my-4">
            <label>Địa chỉ:</label>
            <el-input v-model="nxb.DiaChi" style="width: 300px" size="large" placeholder="Nhập địa chỉ" />
        </div>
        <div class="d-flex justify-content-center align-items-center">
            <el-button type="primary" plain @click="submit">Lưu</el-button>
        </div>
    </div>
</template>

<style lang="scss">
.nxb {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
</style>
