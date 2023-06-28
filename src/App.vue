<template>
  <div>
    <div v-if="auth.getUser !== ''">
      <div class="navbar">
      <div class="flex-1">
        <template v-if="role_id === 1">
          <RouterLink to="/dashboard"><a class="btn btn-ghost normal-case text-xl">iStethoscope</a></RouterLink>
        </template>
        <template v-else-if="role_id === 2">
          <RouterLink to="/home-page"><a class="btn btn-ghost normal-case text-xl">iStethoscope</a></RouterLink>
        </template>
      </div>
      <div class="flex-none">
        <div class="dropdown dropdown-end">
          <button class="flex items-center h-10 px-2 py-2 -mb-px text-center text-gray-600 bg-transparent border-b-2 border-transparent sm:px-4 -px-1 dark:text-white whitespace-nowrap cursor-base focus:outline-none">
            <RouterLink to="/diseases/all"><span class="mx-1 text-sm sm:text-base"> Diseases </span></RouterLink>
          </button>
        </div>
        <div class="dropdown dropdown-end">
          <button class="flex items-center h-10 px-2 py-2 -mb-px text-center text-gray-600 bg-transparent border-b-2 border-transparent sm:px-4 -px-1 dark:text-white whitespace-nowrap cursor-base focus:outline-none">
            <RouterLink to="/recorder"><span class="mx-1 text-sm sm:text-base"> Recorder </span></RouterLink>
          </button>
        </div>
        <div class="dropdown dropdown-end">
          <button class="flex items-center h-10 px-2 py-2 -mb-px text-center text-gray-600 bg-transparent border-b-2 border-transparent sm:px-4 -px-1 dark:text-white whitespace-nowrap cursor-base focus:outline-none">
            <RouterLink to="/diagnosis"><span class="mx-1 text-sm sm:text-base"> Diagnosis </span></RouterLink>
          </button>
        </div>
        <div class="dropdown dropdown-end">
          <button class="flex items-center h-10 px-2 py-2 -mb-px text-center text-gray-600 bg-transparent border-b-2 border-transparent sm:px-4 -px-1 dark:text-white whitespace-nowrap cursor-base focus:outline-none">
            <RouterLink to="/users"><span class="mx-1 text-sm sm:text-base"> Users </span></RouterLink>
          </button>
        </div>
        <div class="dropdown dropdown-end">
          <button class="flex items-center h-10 px-2 py-2 -mb-px text-center text-gray-600 bg-transparent border-b-2 border-transparent sm:px-4 -px-1 dark:text-white whitespace-nowrap cursor-base focus:outline-none">
            <RouterLink to="/admin"><span class="mx-1 text-sm sm:text-base"> Admin </span></RouterLink>
          </button>
        </div>
        <div class="dropdown dropdown-end">
        </div>

        <div class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full border border-purple-300 border-2">
              <img src="/avatar.png" />
            </div>
          </label>
          <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <RouterLink :to="'/users/edit/' + userId"><li><a>Profile</a></li></RouterLink>
            <RouterLink :to="'/users/file/' + userId"><li><a>File</a></li></RouterLink>
            <li><a @click="logOut()">Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
    </div>
  <div class="max-w-[1200px] mx-auto px-2 mt-[40px] sm:mt-[50px] md:mt-0">
    <RouterView />
  </div>

  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import {onMounted, ref} from "vue";
import {useCookies} from "vue3-cookies";
import {useRouter} from 'vue-router';
import {useRoute} from "vue-router";
import {useAuthStore} from "@/stores/auth";

const {cookies} = useCookies();
const router = useRouter();
const route = useRoute();
const auth = useAuthStore();
const userId = ref(0);
const role_id = ref(2);

const logOut = async () => {
  try {
    await axios.post("https://maria.develop.eiddew.com/licenta/public/api/logout")
        .then(async (response) => {

          delete axios.defaults.headers.common.Authorization;
          cookies.remove('Token', response.data.token);
          auth.logout();

          await router.push('/login');

        });
  } catch (e) {
    console.log(e);
    if (e.response?.data?.error) {
      await Swal.fire({
        icon: 'error',
        title: 'Ooops..',
        text: e.response.data.error,
      })
    } else {
      await Swal.fire({
        icon: 'error',
        title: 'Ooops..',
        text: "An unknown error has occured",
      })
    }
  }
};

onMounted(async () => {
  axios.interceptors.response.use((response) => {
    return response
  }, function(error) {
    return Promise.reject(error)
  })

  let my_cookie_value = cookies.get("Token");

  axios.defaults.headers.common.Authorization  =  "Bearer " + my_cookie_value;

  await axios.get("https://maria.develop.eiddew.com/licenta/public/api/getUser")
      .then((result)=> {
        auth.setUser(result.data);
        userId.value = result.data.id;
        role_id.value = result.data.role;
      })
      .catch((error) => {
        console.log('eroare: ',error);
        if(route.name) {
          if(route.name !== 'login' && route.name !== 'register'){
            if (error.response?.status === 401) {
              router.push('/login');
            }
          }
        }
      })
})
</script>
