<template>
  <div class="container justify-center items-center mx-auto">
    <h2 class="text-3xl tracking-tight font-extrabold text-violet-500 text-center mt-10 mb-10">
      <span class="block">Add Symptoms</span>
    </h2>
    <form @submit.prevent="onSubmit()">
      <div class="grid">
        <input v-model="name" type="text" placeholder="Symptom Name" class="input input-bordered"/>

        <label class="mt-5 mb-1">Symptom for:</label>
        <v-select class=" h-12" v-model="type" :options="diagnostic_types"></v-select>

        <label class="mt-5 mb-1">Description:</label>
        <textarea v-model="description" rows="3" class="border border-gray-300 rounded-lg"></textarea>
        <div class="flex ml-8 mt-10 justify-center">
          <button class="btn btn-sm w-32 gap-2 bg-violet-400 border border-0" type="submit"> Save </button>
          <RouterLink class="btn btn-sm w-32 gap-2 bg-gray-400 ml-2 border border-0" to="/admin"><span> back  </span></RouterLink>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import {ref} from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import {useRouter} from "vue-router";
const router = useRouter();

const name = ref('');
const type = ref({});
const description = ref();
const diagnostic_types = ref([{'value': 1, 'label': 'Heart disease'}, {'value': 2, 'label': 'Lungs disease'}]);

const onSubmit = async () => {
  try {
    await axios.post("https://maria.develop.eiddew.com/licenta/public/api/symptom", {
      name: name.value,
      type: type.value.value,
      description: description.value,
    })
        .then(async (response) => {
          await Swal.fire({
            title: 'Done!',
            text: 'Symptom saved successfully!',
            icon: 'success'
          }).then((result) => {
            if (result.isConfirmed) {
              router.push('/admin');
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

</script>
