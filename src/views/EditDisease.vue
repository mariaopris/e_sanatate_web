<template>
  <div class="container justify-center items-center mx-auto">
    <h2 class="text-3xl tracking-tight font-extrabold text-violet-500 text-center mt-8 mb-10">
      <span class="block">Edit Disease</span>
    </h2>
    <form @submit.prevent="onSubmit()">
      <div class="grid">
        <input v-model="name" type="text" placeholder="Disease Name" class="input input-bordered"/>
        <label class="mt-5 mb-1">Symptoms:</label>
        <v-select multiple class="h-12" v-model="symptoms_ids" :options="symptoms"></v-select>
        <label class="mt-10 mb-1">Description:</label>
        <textarea v-model="description" rows="3" class="border border-gray-300 rounded-lg"></textarea>
<!--        <label class="mt-5 mb-1">Treatment:</label>-->
<!--        <textarea v-model="treatment" rows="5" class="border border-gray-300 rounded-lg "></textarea>-->
        <div class="flex ml-8 mt-10 justify-center">
          <button class="btn btn-sm w-32 gap-2 bg-violet-400 border border-0" type="submit"> Save </button>
          <RouterLink class="btn btn-sm w-32 gap-2 bg-gray-400 ml-2 border border-0" to="/admin"><span> back  </span></RouterLink>
        </div>
      </div>
    </form>
    <Transition>
      <div v-if="open_popup" class="mt-40" style="background-color: white; padding: 20px 50px; box-sizing: border-box; top: 5px; border: 1px solid rgba(0, 0, 0, 0.12); border-radius: 5px; left: 50%; max-width: 375px; position: absolute; transform: translateX(-50%); width: calc(100% - 10px); z-index: 99;">
        <p class="font-semibold flex justify-center mt-7">Choose a wight for this symptom</p>
        <div class="flex mt-10 justify-between">
          <div @click="weight = 'low'" class="flex">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 mt-2 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div v-if="weight !== 'low'" @click="weight = 'low'" class="ml-1 mt-2">low</div>
            <div v-if="weight === 'low'" class="ml-1 mt-2 font-semibold text-green-600">low</div>
          </div>
          <div @click="weight = 'medium'" class="flex">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8" style="margin-top: 4px">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div v-if="weight !== 'medium'" @click="weight = 'medium'" class="ml-1 mt-2">medium</div>
            <div v-if="weight === 'medium'" class="ml-1 mt-2 font-semibold text-yellow-600">medium</div>
          </div>
          <div @click="weight = 'high'" class="flex">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div v-if="weight !== 'high'" @click="weight = 'high'" class="ml-1 mt-2">high</div>
            <div v-if="weight === 'high'" class="ml-1 mt-2 font-semibold text-red-600">high</div>
          </div>

        </div>
        <div class="justify-center flex">
          <button @click="saveWeight()" class="btn btn-sm gap-2 bg-violet-400 border border-0 mt-8"> Done </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import {ref, watch} from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import {useRoute} from "vue-router";
import {useRouter} from "vue-router";
const router = useRouter();
const route = useRoute();

const id = route.params.id;
const name = ref('');
const description = ref('');
const treatment = ref('');
const symptoms = ref([]);
const symptoms_ids = ref([]);
const weights = ref('');
const weight = ref('');
const open_popup = ref(false);
const symptoms_ids_len = ref(0);

watch(symptoms_ids, (newValue, oldValue) => {
  if(newValue != oldValue) {
    if (symptoms_ids.value.length != symptoms_ids_len.value && symptoms_ids.value.length > symptoms_ids_len.value) {
      open_popup.value = true;
    }
    if (symptoms_ids.value.length < symptoms_ids_len.value) {
        Object.keys(weights.value).forEach((weight) => {
          let i = symptoms_ids.value.map(item => item.value).indexOf(Number(weight));
          if (i < 0) {
            delete weights.value[weight];
          }
        })
    }
  }
});

const saveWeight = () => {
    if (weight.value !== '') {
      let symptom = symptoms_ids.value[symptoms_ids.value.length - 1];
      if (weight.value === 'low') {
        weights.value[symptom.value] = 33.33;
      }
      if (weight.value === 'medium') {
        weights.value[symptom.value] = 66.66;
      }
      if (weight.value === 'high') {
        weights.value[symptom.value] = 100;
      }
      open_popup.value = false;
      symptoms_ids_len.value = symptoms_ids.value.length;
      weight.value = '';
    } else {
      Swal.fire({
        icon: 'error',
        title: 'You must select a weight!',
      })
    }


}

const getDisease = async () => {
  try {
    await axios
        .get(`https://maria.develop.eiddew.com/licenta/public/api/disease/${id}`)
        .then((response) => {
          name.value = response.data.disease.name;
          description.value = response.data.disease.description;
          treatment.value = response.data.disease.treatment;
          symptoms_ids.value = JSON.parse(response.data.disease.symptoms_ids);
          symptoms_ids_len.value = symptoms_ids.value.length;
          weights.value = JSON.parse(response.data.disease.weights);

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

const getSymptoms = async () => {
  try {
    await axios.get("https://maria.develop.eiddew.com/licenta/public/api/symptom")
        .then(async (response) => {
          response.data.symptoms.forEach((symptom) => {
            symptoms.value.push({
              value: symptom.id,
              label: symptom.name
            })
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

const onSubmit = async () => {
  try {
    await axios.put(`https://maria.develop.eiddew.com/licenta/public/api/disease/${id}`, {
      name: name.value,
      description: description.value,
      treatment: treatment.value,
      symptoms_ids: JSON.stringify(symptoms_ids.value),
      weights: JSON.stringify(weights.value)
    })
        .then(async (response) => {
          await Swal.fire({
            title: 'Done!',
            text: 'Disease details changed!',
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

getDisease();
getSymptoms();
</script>
