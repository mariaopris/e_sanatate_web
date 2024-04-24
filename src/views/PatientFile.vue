<template>
  <div class="container mt-5">
    <template v-if="spinner">
      <div class="flex items-center justify-center mt-28 space-x-2">
        <div aria-label="Loading..." role="status">
          <svg class="w-16 w-16 animate-spin" viewBox="3 3 18 18">
            <path
                class="fill-indigo-200"
                d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"></path>
            <path
                class="fill-indigo-800"
                d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"></path>
          </svg>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="mockup-window border bg-base-300">
        <h2 class="text-3xl tracking-tight font-extrabold text-violet-500 text-center mb-5 mt-8">
          <div class="flex justify-center">
            <span class="block">{{name}}'s File</span>
            <RouterLink :to="'/users/file/edit/'+ form.user_id">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="ml-3 mt-2 w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
              </svg>
            </RouterLink>
          </div>
        </h2>
        <div class="hero bg-base-200">
          <div class="hero-content">
            <div>
              <div class="grid-cols-2 grid">
                <div class="flex">
                  <p class="text-violet-500 mr-2 text-xl ml-10">Address: </p>
                  <p class="text-xl">{{form.address}}</p>
                </div>
                <div class="flex">
                  <p class="text-violet-500 mr-2 ml-20 text-xl">Birthdate: </p>
                  <p class="text-xl">{{form.birthday}}</p>
                </div>
              </div>
              <div class="grid-cols-2 grid mt-3">
                <div class="flex">
                  <p class="text-violet-500 mr-2 text-xl ml-10">Gender: </p>
                  <p class="text-xl">{{form.gender}}</p>
                </div>
                <div class="flex">
                  <p class="text-violet-500 mr-2 text-xl ml-20">Phone: </p>
                  <p class="text-xl">{{form.phone}}</p>
                </div>
              </div>
              <div class="grid-cols-2 grid mt-3">
                <div class="flex">
                  <p class="text-violet-500 mr-2 text-xl ml-10">Weight: </p>
                  <p class="text-xl">{{form.weight}}</p>
                </div>
                <div class="flex">
                  <p class="text-violet-500 mr-2 text-xl ml-20">Height: </p>
                  <p class="text-xl">{{form.height}}</p>
                </div>
              </div>
              <div class="flex mt-3">
                <p class="text-violet-500 mr-2 text-xl ml-10">Other Affections: </p>
                <div v-if="form.other_affections" class="text-xl">{{form.other_affections}}</div>
                <div v-if="!form.other_affections" class="text-xl">none</div>
              </div>

              <div class="grid grid-cols-3 mt-10 ml-10 space-x-3">
                <div class="text-xl font-semibold text-gray-600">Date of diagnostic</div>
                <div class="text-xl font-semibold text-gray-600">Diagnostic Type</div>
                <div class="text-xl font-semibold text-gray-600">Actions</div>
              </div>
              <div v-for="item in diagnostics" class="grid grid-cols-3 mt-2 ml-10">
                <div>
                  <div class="font-semibold text-gray-600">{{item.date}}</div>
                </div>
                <div class="ml-10">
                  <div v-if="item.type === 1" class="badge badge-lg badge-secondary text-sm">Heart</div>
                  <div v-if="item.type === 2" class="badge badge-lg badge-accent text-white text-sm">Lungs</div>
                </div>
                <div>
                  <button class="btn btn-ghost btn-xs bg-blue-100 mr-2"><RouterLink :to="'/results/'+ item.id">View</RouterLink></button>
                  <button @click="deleteAlarm(item.id)" class="btn btn-ghost btn-xs bg-red-100 mr-2">Delete</button>
                </div>
              </div>
              <RouterLink class="btn btn-sm w-32 gap-2 ml-2 mt-5" to="/home-page">back</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import {useRoute} from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import {onMounted, ref} from "vue";
import {File} from "@/composables/dataTypes";

const route = useRoute();

const id = route.params.id;
const form = ref(new File());
const diagnostics = ref([]);
const name = ref('');
const spinner = ref(true);

const deleteAlarm = (id) => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      deleteRow(id);
    }
  })
}

const deleteRow = async (id) => {
  try {
    await axios
        .delete("https://maria.develop.eiddew.com/licenta/public/api/diagnostic/" + id)
        .then((response) => {
          if (response.data.status === true) {
            let i = diagnostics.value.map(item => item.id).indexOf(id);
            diagnostics.value.splice(i, 1);
            Swal.fire(
                'Deleted!',
                response.data.message,
                'success'
            )
          }
        });
  } catch (e) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
    })
  }
}

const getUserFile = async () => {
  try {
    await axios
        .get(`https://maria.develop.eiddew.com/licenta/public/api/file/${id}`)
        .then((response) => {
          name.value = response.data.user.name;
          form.value = response.data.file;
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

const getUserDiagnostics = async () => {
  try {
    await axios
        .get(`https://maria.develop.eiddew.com/licenta/public/api/get-diagnostic-user/${id}`)
        .then((response) => {
          response.data.diagnostics.forEach((diagnostic) => {
            diagnostic.created_at = diagnostic.created_at.substring(0, diagnostic.created_at.indexOf('T'))
            diagnostics.value.push({
              date: diagnostic.created_at,
              id: diagnostic.id,
              type: diagnostic.type
            })
          })
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

onMounted(async ()=> {
  await getUserFile();
  await getUserDiagnostics();
  spinner.value = false;
})
</script>
