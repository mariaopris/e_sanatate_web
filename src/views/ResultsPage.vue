<template>
  <div class="container">
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
          <span class="block">Diagnostic Results</span>
        </h2>
        <div class="hero bg-base-200">
          <div class="hero-content flex-col lg:flex-row-reverse">
            <div>
              <div class="flex">
                <p class="text-violet-500 mr-2 text-2xl">Type: </p>
                <p class="text-2xl">{{form.type}}</p>
              </div>
              <div v-if="symptoms.length > 0" class="grid mt-2">
                <p class="text-violet-500 mr-2 text-2xl">Symptoms: </p>
                <template v-for="symptom in symptoms">
                  <li class="text-2xl">{{symptom}}</li>
                </template>
              </div>
              <div>
                <p class="text-violet-500 mr-2 text-2xl">Recording: </p>
                <div class="flex">
                  <audio controls v-if="recording_path">
                    <source class="bg-gray-100" :src="recording_path" type="audio/wav">
                    Your browser does not support the audio element.
                  </audio>
                  <p class="font-semibold mt-3">{{recording_name}}</p>
                </div>
              </div>
              <div class="flex mt-2">
                <p class="text-violet-500 mr-2 text-2xl">Result: </p>
                <p class="text-2xl">{{form.result}}</p>
              </div>
              <template v-if="form.disease_id && form.disease_id != 12 && form.disease_id != 13">
                <button @click="getDetailsDisease()" class="btn btn-primary mt-5">What is {{form.result_short}}?</button>
              </template>
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
import {ref} from "vue";
import {Diagnostic} from "@/composables/dataTypes";
import {useRouter} from "vue-router";
const router = useRouter();
const route = useRoute();

const id = route.params.id;
const form = ref(new Diagnostic());
const symptoms = ref([]);
const recording_path = ref(null);
const spinner = ref(true);
const user_id = ref(0);
const recording_name = ref('');

const getDetailsDisease = () => {
  switch (form.value.disease_id) {
    case 6:
      router.push('/diseases/COPD');
      break;
    case 7:
      router.push('/diseases/asthma');
      break;
    case 8:
      router.push('/diseases/pneumonia');
      break;
    case 9:
      router.push('/diseases/heart-failure');
      break;
    case 10:
      router.push('/diseases/heart-murmur');
      break;
    case 11:
      router.push('/diseases/heart-arrhythmia');
      break;
  }
}

const getAudio = async (recording_id) => {
  await axios.get(`https://maria.develop.eiddew.com/licenta/public/api/showAudio`, {
    params: {
      id: recording_id,
    }
  })
    .then(async (response) => {
      recording_path.value = 'https://maria.develop.eiddew.com/licenta/public/storage' + response.data.recording.path + response.data.recording.file_name;
      recording_name.value = response.data.recording.file_name;
      spinner.value = false;
    })
    .catch((error) => {
      console.log('eroare: ', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'The audio file is no longer available!',
      }).then((result) => {
        if(result.isConfirmed) {
          router.push('/users/file/'+user_id.value);
        }
      })
    })
}

const getPatient = async () => {
  try {
    await axios
        .get(`https://maria.develop.eiddew.com/licenta/public/api/diagnostic/${id}`)
        .then(async (response) => {
          user_id.value = response.data.diagnostic.user_id;
          form.value = response.data.diagnostic;
          await getAudio(form.value.recording_id);
          if (form.value.type === 1) {
            form.value.type = "Heart";
          } else {
            form.value.type = "Lungs";
          }

          form.value.symptoms = JSON.parse(form.value.symptoms);
          if (form.value.symptoms) {
            form.value.symptoms.forEach((symptom) => {
              try {
                axios
                    .get(`https://maria.develop.eiddew.com/licenta/public/api/symptom/${symptom}`)
                    .then((response) => {
                      symptoms.value.push(response.data.symptom.name);
                    })
              } catch (e) {
                console.log(e);
              }
            })
          }
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

getPatient();
</script>
