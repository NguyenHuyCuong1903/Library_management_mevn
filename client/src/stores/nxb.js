import { CustomAxios } from '@/Axios/CustomAxios';
import { defineStore } from 'pinia';
import { useUserStore } from './user';

export const nxbStore = defineStore('nxbStore', {
    state: () => {
        return {
            NXB: [],
            fetching: false,
        };
    },
    actions: {
        async getAll() {
            const token = useUserStore().token;

            return await CustomAxios.get('nxb', { headers: { Authorization: token } })
                .then((res) => {
                    this.NXB = [...this.NXB, ...res.data.nxb];
                    this.fetching = true;
                    return res.data.message;
                })
                .catch((err) => {
                    console.log(err.response.data.error);
                    return err.response.data.error;
                });
        },

        async add(data) {
            const token = useUserStore().token;
            return await CustomAxios.post('nxb/add', data, { headers: { Authorization: token } })
                .then((res) => {
                    this.NXB.push(res.data.nxb);
                    return res.data.message;
                })
                .catch((err) => {
                    console.log(err.response.data.error);
                    return err.response.data.error;
                });
        },
        async update(data) {
            const token = useUserStore().token;
            return await CustomAxios.patch(`nxb/${data.MaNXB}`, data, { headers: { Authorization: token } })
                .then((res) => {
                    this.NXB.forEach((item) => {
                        if (item.MaNXB === data.MaNXB) {
                            item = data;
                        }
                    });
                    return res.data.message;
                })
                .catch((err) => {
                    console.log(err.response.data.error);
                    return err.response.data.error;
                });
        },
        async delete(MaNXB) {
            const token = useUserStore().token;
            return await CustomAxios.delete(`nxb/${MaNXB}`, { headers: { Authorization: token } })
                .then((res) => {
                    this.NXB = this.NXB.filter((item) => item.MaNXB != MaNXB);
                    console.log(this.NXB.filter((item) => item.MaNXB != MaNXB));
                    return res.data.message;
                })
                .catch((err) => {
                    console.log(err.response.data.error);
                    return err.response.data.error;
                });
        },
    },
    getters: {          
        getNXB(state) {
            return (MaNXB) => state.NXB.find((item) => item.MaNXB == MaNXB);
        },
    },
});
