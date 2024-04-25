<script>
import { ElButton, ElMessage } from 'element-plus';
import BookList from '@/components/Home/BookList.vue';
import Header from '@/components/Header.vue';
import { mapStores } from 'pinia';
import { useBookStore } from '@/stores/book';
import { useUserStore } from '@/stores/user';
import { useBorrowStore } from '@/stores/borrow';

export default {
    name: 'Home',
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    components: {
        ElButton,
        BookList,
        Header,
    },
    computed: {
        ...mapStores(useBookStore, useUserStore, useBorrowStore),
    },
    data() {
        return {
            quantity: 0,
        };
    },
    methods: {
        handleChange(value) {
            this.quantity = value;
        },
        async handleBorrow() {
            if (!this.userStore.token) {
                ElMessage('Vui lòng đăng nhập để mượn sách!');
                this.$router.push('/login');
                return;
            }
            const data = {
                MaSach: this.bookStore.getBook(this.id)._id,
            };
            const result = await this.borrowStore.borrowBook(data);
            ElMessage(result);
        },
    },
};
</script>

<template>
    <Header></Header>
    <main class="container">
        <div class="detail-container mt-4">
            <div class="imageBox">
                <img class="image" :src="bookStore.getBook(id).HinhAnh" alt="" />
            </div>
            <div class="detailInfor">
                <h4 class="title">{{ bookStore.getBook(id).TenSach }}</h4>
                <p class="author" style="color: aqua">Tác giả: {{ bookStore.getBook(id).NguonGoc }}</p>
                <p class="quantity">
                    Số lượng còn lại:
                    <span class="quantity">{{ bookStore.getBook(id).SoQuyen - bookStore.getBook(id).SoQuyenDaMuon }}</span>
                </p>
                <!-- <p class="pay">{{ bookStore.getBook(id).DonGia }} đ</p> -->
                <div class="borrow-container">
                    <!-- <span class="borrow-quantity">Số lượng</span> -->
                    <!-- <el-input-number v-model="quantity" :min="1" :max="1" @change="handleChange" /> -->
                    <div class="mt-3">
                        <button class="borrow-button" type="button" plain @click="handleBorrow">Mượn sách</button>
                    </div>
                </div>
                <div class="title-description">
                    <h6 class="title-description" style="color: aliceblue">Chi tiết sách:</h6>
                    <p class="detail">Tác giả: {{ bookStore.getBook(id).NguonGoc }}</p>
                    <p class="detail">Nhà xuất bản: {{ bookStore.getBook(id).MaNXB.TenNXB }}</p>
                    <p class="detail">Năm xuất bản: {{ new Date(bookStore.getBook(id).NamXuatBan).getFullYear() }}</p>
                </div>
            </div>
        </div>
    </main>
</template>

<style lang="scss">
main {
    .detail-container {
        padding: 16px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        display: flex;
        flex-direction: row;
        background: #8a8a8a;
        .imageBox {
            margin-right: 16px;
            .image {
                max-width: 300px;
            }
            background: #8a8a8a;
        }

        .detailInfor {
            background: #8a8a8a;
            color: aliceblue;
            .title {
                margin-bottom: 2px;
                background: #8a8a8a;
            }
            .author {
                margin-top: 0;
                margin-bottom: 4px;
                color: #1d9d74;
                background: #8a8a8a;
            }
            .pay {
                font-size: 26px;
                color: #fe642e;
                font-weight: 600;
                background: #8a8a8a;
            }
            .quantity {
                span {
                    font-size: 24px;
                    font-weight: 600;
                }
                background: #8a8a8a;
            }
            .borrow-container {
                margin-top: 32px;
                .borrow-quantity {
                    margin-right: 8px;
                    background: #8a8a8a;
                }
                background: #8a8a8a;
            }
            .mt-3{
                background: #8a8a8a;
            }
            .title-description {
                margin-top: 30px;
                background: #8a8a8a;
            }
            .detail {
                margin: px;
                background: #8a8a8a;
            }
            .borrow-button {
                background-color: #007bff; /* Màu nền */
                color: #fff; /* Màu chữ */
                border: none; /* Không có viền */
                padding: 10px 20px; /* Kích thước đệm */
                border-radius: 5px; /* Độ cong viền */
                cursor: pointer; /* Con trỏ chuột khi hover */
            }

            .borrow-button:hover {
                background-color: #0056b3; /* Màu nền khi hover */
            }
        }
    }
}
</style>
