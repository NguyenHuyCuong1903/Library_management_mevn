<script>
import { useUserStore } from '@/stores/user';
import { ElMessage } from 'element-plus';

const user = useUserStore();

export default {
    components: {},
    data: () => {
        return {
            HoLot: '',
            Ten: '',
            Phai: '',
            DiaChi: '',
            SoDienThoai: '',
            Password: '',
            rePassword: '',
            message: '',
        };
    },

    methods: {
        submit: async function () {
            if (
                this.Password == this.rePassword &&
                this.Password &&
                this.SoDienThoai &&
                this.HoLot &&
                this.DiaChi &&
                this.Phai
            ) {
                this.message = await user.SignUp({
                    HoLot: this.HoLot,
                    Ten: this.Ten,
                    Phai: this.Phai,
                    DiaChi: this.DiaChi,
                    SoDienThoai: this.SoDienThoai,
                    Password: this.Password,
                });

                // this.$emit('handleSubmit', {
                //     Holot: this.Holot,
                //     Ten: this.Ten,
                //     GioiTinh: this.GioiTinh,
                //     DiaChi: this.DiaChi,
                //     SoDienThoai: this.SoDienThoai,
                //     password: this.password,
                // });
            } else {
                this.message = 'Mật khẩu xác thực không chính xác';
            }
            ElMessage(this.message);
        },
    },
};
</script>

<template>
    <div class="container">
        <div class="loginContainer">
            <div class="loginBox">
                <div>
                    <img src="../assets/img/logo.png" class="logo" />
                </div>
                <div class="flex gap-1 m-4">
                    <input
                        type="text"
                        class="form-control mt-4"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-sm"
                        placeholder="Số điện thoại"
                        v-model="SoDienThoai"
                    />
                    <input
                        type="password"
                        class="form-control mt-3"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-sm"
                        placeholder="Mật khẩu"
                        v-model="Password"
                    />
                    <input
                        type="password"
                        class="form-control mt-3"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-sm"
                        placeholder="Mật khẩu xác thực"
                        v-model="rePassword"
                    />
                    <input
                        type="text"
                        class="form-control mt-3"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-sm"
                        placeholder="Họ"
                        v-model="HoLot"
                    />
                    <input
                        type="text"
                        class="form-control mt-3"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-sm"
                        placeholder="Tên"
                        v-model="Ten"
                    />
                    <input
                        type="text"
                        class="form-control mt-3"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-sm"
                        placeholder="Giới tính"
                        v-model="Phai"
                    />
                    <input
                        type="text"
                        class="form-control mt-3"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-sm"
                        placeholder="Địa chỉ"
                        v-model="DiaChi"
                    />
                </div>
                <button type="button" class="btn btn-primary" @click="submit">Đăng ký</button>
                <span class="mt-4 mt-2 mt-1"
                    >Nếu đã có tài khoản? <router-link to="/login" class="signup-link"><span class="mt-2">Đăng nhập</span></router-link></span
                >
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.container {
    .loginContainer {
        min-width: 800px;
        min-height: 800px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .loginBox {
            box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px,
                rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            padding: 32px 16px;
            border-radius: 4px;
            .logo {
                width: 80px;
            }
            flex{
                background: #7a7a7a;
            }
            .mt-2{
                background: #7a7a7a;
            }
            .mt-1{
                color: #ffffff;
            }
            .signup-link{
                color: aqua;
            }
            .input {
            }
        }
    }
}
</style>
