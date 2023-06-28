<template>
  <div>
    <div class="flex justify-center">
      <span class="block text-3xl bolder font-semibold">{{patient_name}}'s File</span>
    </div>
    <form @submit.prevent="save()">
      <div class="border-b border-gray-900/10 pb-12">
        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

          <div class="sm:col-span-2">
            <label for="gender" class="block text-sm font-medium leading-6 text-gray-900">Gender</label>
            <div class="mt-2">
              <select v-model="form.gender" id="gender" name="gender"
                      class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
            </div>
          </div>

          <div class="sm:col-span-2">
            <label for="birthday" class="block text-sm font-medium leading-6 text-gray-900">Birthdate</label>
            <div class="mt-2">
              <input v-model="form.birthday" id="birthday" name="birthday" type="date"
                     class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            </div>
          </div>

          <div class="col-span-full">
            <label for="address" class="block text-sm font-medium leading-6 text-gray-900">Address</label>
            <div class="mt-2">
              <input v-model="form.address" id="address" name="address" type="text"
                     class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            </div>
          </div>

          <div class="col-span-full">
            <label for="other_affections" class="block text-sm font-medium leading-6 text-gray-900">Other Affections</label>
            <div class="mt-2">
              <textarea v-model="form.other_affections" type="text" name="other_affections" id="other_affections"
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
            </div>
          </div>

          <div class="sm:col-span-2">
            <label for="weight" class="block text-sm font-medium leading-6 text-gray-900">Weight</label>
            <div class="mt-2">
              <input v-model="form.weight" type="text" name="weight" id="weight"
                     class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            </div>
          </div>

          <div class="sm:col-span-2">
            <label for="height" class="block text-sm font-medium leading-6 text-gray-900">Height</label>
            <div class="mt-2">
              <input v-model="form.height" type="text" name="height" id="height"
                     class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            </div>
          </div>

          <div class="sm:col-span-2">
            <label for="phone" class="block text-sm font-medium leading-6 text-gray-900">Phone</label>
            <div class="mt-2">
              <input v-model="form.phone" type="tel" name="phone" id="phone"
                     class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 flex items-center justify-center gap-x-6">
        <button type="button" class="text-sm font-semibold leading-6 text-gray-900"><RouterLink :to="'/users/file/'+ form.user_id">Cancel</RouterLink></button>
        <button type="submit"
                class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Save
        </button>
      </div>
    </form>

  </div>
</template>

<script setup>
import {useRoute} from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import {onMounted, ref} from "vue";
import {File} from "@/composables/dataTypes";
import {useRouter} from "vue-router";
const router = useRouter();
const route = useRoute();

const id = route.params.id;
const form = ref(new File());
const patient_name = ref('');

const save = () => {
  try {
     axios
        .put(`https://maria.develop.eiddew.com/licenta/public/api/file/${form.value.id}`, form.value)
        .then((response) => {
           Swal.fire({
            title: 'Done!',
            text: response.data.message,
            icon: 'success'
          }).then((result) => {
            if (result.isConfirmed) {
              router.push('/users/file/' + form.value.user_id);
            }
          })
          console.log(response.data)
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

const getUserFile = async () => {
  try {
    await axios
        .get(`https://maria.develop.eiddew.com/licenta/public/api/file/${id}`)
        .then((response) => {
          form.value.parseData(response.data.file);
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

const getUser = async () => {
  try {
    await axios
        .get(`https://maria.develop.eiddew.com/licenta/public/api/patient/${id}`)
        .then((response) => {
          patient_name.value = response.data.user.name;
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
  await getUser();
  await getUserFile();
})
</script>
