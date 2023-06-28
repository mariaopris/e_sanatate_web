<template>
  <div>
    <div class="hero min-h-screen">
      <div class="hero-content grid mt-3">
        <div class="flex">
          <h1 class="text-4xl font-bold">Welcome to </h1>
          <h1 class="text-4xl font-bold text-violet-500 ml-2"> iStethoscope</h1>
        </div>
        <h1 class="text-2xl font-bold">Register now!</h1>

        <template v-if="!twoFA">
          <form @submit.prevent="attemptRegister()">
            <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <div class="card-body">

                <div v-if="repeatPasswordError">
                  <div class="alert alert-error shadow-lg">
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <span>Password doesn't match!</span>
                    </div>
                  </div>
                </div>

                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-bold">Name</span>
                  </label>
                  <input required v-model="name" type="text" placeholder="name" class="input input-bordered" />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-bold">Email</span>
                  </label>
                  <input required v-model="email" type="text" placeholder="email" class="input input-bordered" />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-bold">Password</span>
                  </label>
                  <input required v-model="password" type="password" placeholder="password" class="input input-bordered" />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-bold">Repeat Password</span>
                  </label>
                  <input required v-model="password_repeat" type="password" placeholder="repeat password" class="input input-bordered" />
                </div>
                <div class="form-control mt-6">
                  <button class="btn bg-violet-400">Register</button>
                </div>
              </div>
            </div>
          </form>
        </template>
        <template v-else>
          <form @submit.prevent="onSubmit()">
            <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <div class="card-body">


                <div class="form-control">
                  <img :src="qr_code" alt="qr_code">
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-bold">2FA Code</span>
                  </label>
                  <input required v-model="twofa" type="text" class="input input-bordered" />
                </div>
                <div class="form-control mt-6">
                  <button class="btn bg-violet-400">Register</button>
                </div>
              </div>
            </div>
          </form>
        </template>
        <p class="py-2">You already have an accont? <RouterLink to="/login" class="underline text-blue-700">Login here.</RouterLink></p>

      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import {useAuthStore} from "@/stores/auth";
import {useCookies} from "vue3-cookies";
import {useRouter} from "vue-router";

const name = ref('');
const email = ref('');
const password = ref('');
const password_repeat = ref('');
const repeatPasswordError = ref(false);
const secret = ref('');
const twofa = ref('');
const router = useRouter();

const twoFA = ref(false);
const qr_code = ref(null);

const auth = useAuthStore();
const {cookies} = useCookies();
const checkRepeatPassword = () => {
  repeatPasswordError.value = password.value !== password_repeat.value;
}

const attemptRegister = async () => {
  checkRepeatPassword();

  try {
    await axios.post("https://maria.develop.eiddew.com/licenta/public/api/attempt-register", {
      email: email.value,
      password: password.value,
    })
        .then(async (response) => {
          twoFA.value = true;
          secret.value = response.data.secret;
          qr_code.value = response.data.qr_code;
          console.log(response.data)
        });
  } catch (e) {
    console.log(e);
    if (e.response?.data?.error) {
      Swal.fire({
        icon: 'error',
        title: 'Ooops..',
        text: e.response.data.error,
      })
    }
  }
}

const onSubmit = async () => {
  checkRepeatPassword();
  try {
    await axios.post("https://maria.develop.eiddew.com/licenta/public/api/register", {
      name: name.value,
      email: email.value,
      password: password.value,
      secret: secret.value,
      twofa: twofa.value
    })
        .then(async (response) => {
          axios.defaults.headers.common.Authorization  =  "Bearer " + response.data.token;
          cookies.set("Token", response.data.token,'5h');
          auth.setUser(response.data);
          await addNewUser();
          await router.push('/home-page');
        });
  } catch (e) {
    console.log(e);
    if (e.response?.data?.error) {
      Swal.fire({
        icon: 'error',
        title: 'Ooops..',
        text: e.response.data.error,
      })
    } else {
      if (e.response?.status !== 401) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
      }
    }
  }
};

const addNewUser = async () => {
  try {
    await axios
        .post(`https://maria.develop.eiddew.com/licenta/public/api/addNewUser`)
        .then((response) => {
        });
  } catch (e) {
    console.log(e);
  }
}
</script>
