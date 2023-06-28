import {defineStore} from 'pinia';
import type {AuthUser} from "@/composables/dataTypes";

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        name: '',
        email:''

    }),
    getters: {
        getUser(): any{
            return this.name;
        }
    },
    actions: {
        setUser (user:AuthUser) {
            this.name = user.name;
            this.email = user.email;
        },
        logout () {
            this.name = '';
            this.email = '';
        }
    }
})
