<template>
  <div class="grid justify-center items-center">
    <h2 class="text-3xl tracking-tight font-extrabold text-violet-500 text-center mt-10 mb-10">
      <span class="block">Profile</span>
    </h2>
    <form @submit.prevent="onSubmit()">
      <div class="grid">
        <div class="flex">
          <p class="mt-2">Name:</p>
          <input v-model="form.name" type="text" placeholder="Name" class="input input-bordered w-80 ml-3" />
        </div>
        <div class="flex mt-5">
          <p class="mt-2">Email:</p>
          <input v-model="form.email" type="text" placeholder="Email" class="input input-bordered w-80 ml-3" />
        </div>
        <div class="">
          <p class="mt-5">Change password:</p>
          <input v-model="old_password" type="password" placeholder="Insert current password" class="input input-bordered w-80 mt-2" />
          <input v-model="new_password" type="password" placeholder="Insert new password" class="input input-bordered w-80 mt-2 ml-3" />
          <input v-model="confirm_password" type="password" placeholder="Confirm new password" class="input input-bordered w-80 mt-2 ml-3" />
          <button class="btn bg-blue-900 w-60 mt-2 ml-3" type="button"> Save password</button>
        </div>

        <div class="flex ml-8 mt-60 justify-center space-x-3">
          <RouterLink class="btn btn-sm w-32 gap-2 bg-gray-400 ml-2" to="/home-page"><span> back  </span></RouterLink>
          <button class="btn btn-sm w-32 gap-2 bg-violet-400" type="submit"> Save </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import {useRoute} from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import {ref} from "vue";
import {User} from "@/composables/dataTypes";
import {useRouter} from "vue-router";
const router = useRouter()
const route = useRoute();
const id = route.params.id;
const form = ref(new User());
const new_password = ref('');
const old_password = ref('');
const confirm_password = ref('');

const getUser = async () => {
  try {
    await axios
        .get(`https://maria.develop.eiddew.com/licenta/public/api/users/${id}`)
        .then((response) => {
          form.value = response.data.user;
        });
  } catch (e) {
    console.log(e);
    if (e.response?.status !== 401) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    }
  }
}

const onSubmit = async () => {
  try {
    await axios.put(`https://maria.develop.eiddew.com/licenta/public/api/users/${id}`, form.value)
        .then(async (response) => {
          await Swal.fire({
            title: 'Done!',
            text: 'User details changed!',
            icon: 'success'
          }).then((result) => {
            if (result.isConfirmed) {
              router.push('/users');
            }
          })
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
      Swal.fire({
        icon: 'error',
        title: 'Ooops..',
        text: "An unknown error has occured",
      })
    }
  }
};

getUser();
</script>
