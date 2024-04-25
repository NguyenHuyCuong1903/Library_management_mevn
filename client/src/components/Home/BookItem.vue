<script>
export default {
    name: 'BookItem',
    props: {
        data: {
            type: Object,
            required: true,
        },
    },
    methods: {
        handleNavigate() {
            this.$router.push({
                name: 'book',
                params: {
                    id: data.MaSach,
                },
            });
        },
    },
};
</script>

<template>
    <div class="BookItem m-2">
        <img :src="data.HinhAnh" alt="" class="image" />
        <div class="d-flex justify-content-between align-items-center p-4">
            <div class="d-flex align-items-start justify-content-center flex-column">
                <h5 class="m-0 title">
                    <router-link class='title' :to="`/book/${data.MaSach}` ">
                        {{ data.TenSach }}
                    </router-link>
                </h5>
                <span class="author">{{ data.NguonGoc }}</span>
                <!-- <p class="pay">
                    Đơn giá: <span>{{ data.DonGia }} đ</span>
                </p> -->
                <p class="quantity">
                    Số lượng: <span class="quantity">{{ data?.SoQuyen - data?.SoQuyenDaMuon || 0 }}</span>
                </p>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.BookItem {
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    height: 320px;
    max-width: 190px;
    display: flex;
    flex-direction: column;
    .d-flex {
        background: #4e4e4e;
    }
    .image {
        width: 190px;
        height: 190px;
    }

    .title {
        background: #4e4e4e;
        color: #ffffff;
        min-height: 40px;
        font-size: 18px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2; /* number of lines to show */
        line-clamp: 2;
        -webkit-box-orient: vertical;
        background: #4e4e4e;
    }
    .author {
        font-size: 14px;
        color: #7bfb3f;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1; /* number of lines to show */
        line-clamp: 1;
        -webkit-box-orient: vertical;
        background: #4e4e4e;
    }

    // .pay {
    //     font-size: 14px;
    //     margin-top: 4px;
    //     span {
    //         color: #fe642e;
    //         font-weight: 600;
    //         font-size: 16px;
    //     }
    // }

    .quantity {
        font-size: 12px;
        margin: 0px 0 0 0;
        span {
            font-size: 16px;
            font-weight: 600;
        }
        background: #4e4e4e;
        color: #ffffff;
    }
    
}
</style>
