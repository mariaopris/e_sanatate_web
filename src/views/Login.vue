<template>
  <div>
    <div class="hero min-h-screen">
      <div class="hero-content grid">
        <div class="flex">
          <h1 class="text-4xl font-bold">Welcome to </h1>
          <h1 class="text-4xl font-bold text-violet-500 ml-2"> iStethoscope</h1>
        </div>
        <h1 class="text-3xl font-bold">Login now!</h1>

        <template v-if="!twoFA">
          <form @submit.prevent="attempt_login()">
            <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <div class="card-body">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Email</span>
                  </label>
                  <input v-model="email" type="email" placeholder="email" class="input input-bordered" />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Password</span>
                  </label>
                  <input v-model="password" type="password" placeholder="password" class="input input-bordered" />
                  <label class="label">
                    <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
                  </label>
                </div>
                <div class="form-control mt-6">
                  <button class="btn bg-violet-400">Login</button>
                </div>
              </div>
            </div>
          </form>
          <p class="py-6">You don't have an accont? <RouterLink to="/register" class="underline text-blue-700">Register here.</RouterLink></p>
        </template>
        <template v-else>
          <form @submit.prevent="login()">
            <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <div class="card-body">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">2FA Code</span>
                  </label>
                  <input v-model="twofa" type="text" class="input input-bordered" />
                </div>
                <div class="form-control mt-6">
                  <button class="btn bg-violet-400">Login</button>
                </div>
              </div>
            </div>
          </form>
        </template>

      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import {useCookies} from "vue3-cookies";
import {useAuthStore} from "@/stores/auth";
import {useRouter} from "vue-router";

const name = ref('');
const email = ref('');
const password = ref('');
const password_repeat = ref('');
const twofa = ref('');

const twoFA = ref(false)
const auth = useAuthStore();
const {cookies} = useCookies();
const role_id = ref(1);
const router = useRouter();

const attempt_login = async () =>{
  await axios.post("https://maria.develop.eiddew.com/licenta/public/api/attempt-login", {
    email: email.value,
    password: password.value,
  })
      .then(async(result)=> {
        twoFA.value = true;
      }).catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: "Email or password are wrong!",
        })
      });
}

const login = async () =>{
  await axios.post("https://maria.develop.eiddew.com/licenta/public/api/login", {
      email: email.value,
      password: password.value,
      twofa: twofa.value
  })
      .then(async (result) => {
        axios.defaults.headers.common.Authorization = "Bearer " + result.data.token;
        cookies.set("Token", result.data.token, '5h');
        auth.setUser(result.data);
        role_id.value = result.data.role;
        if (result.data.role === 1) {
          await router.push('/dashboard');
        } else if (result.data.role === 2) {
          await router.push('/home-page');
        }
      }).catch((e) => {
        Swal.fire({
          icon: 'error',
          title: 'An error has occurred!',
          text: e,
        })
      });
}
</script>
