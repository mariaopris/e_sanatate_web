<template>
  <div>
    <div class="mt-5 grid justify-center items-center">
      <div class="py-10 px-10 bg-violet-500">
        <h2 class="text-3xl tracking-tight font-extrabold text-gray-100">
          <span class="block">Get a heart and lung diagnostic using AI</span>
          <span class="block"></span>
        </h2>
        <p class="text-gray-300 mt-5">
          This website uses multiple AI algorithms to determine if you have an affection. Please select a diagnostic type and upload a .wav file! Keep in mind that the results are not always reliable.
        </p>
      </div>
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
        <ul class="steps steps-vertical lg:steps-horizontal mt-10">
          <li class="step step-primary">Upload .wav File</li>
          <li class="step">Add Symptoms</li>
          <li class="step">Get Results</li>
          <li class="step">View Treatment</li>
        </ul>
        <p class="tracking-tight font-bold text-violet-500 text-left mb-2 mt-20">
          <span class="block">Diagnostic Type: </span>
        </p>
        <v-select class=" h-12" v-model="form.type" :options="diagnostic_types"></v-select>

<!--        <template v-if="form.type">-->
<!--          <p class="tracking-tight font-bold text-violet-500 text-left mb-2 mt-10">-->
<!--            <span class="block">Choose audio file: </span>-->
<!--          </p>-->

<!--          <div class="flex mt-10 justify-center">-->
<!--            <div class="mr-20 card w-48 bg-base-100 shadow-xl">-->
<!--              <figure class="px-10 pt-10">-->
<!--                <img src="/from_device.jpg" alt="Device" class="rounded-xl w-22" />-->
<!--              </figure>-->
<!--              <div class="card-body items-center text-center">-->
<!--                <div class="card-actions">-->
<!--                  <button @click="from_device = true; from_app = false; record_now = false" class="btn btn-primary">From Device</button>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->

<!--            <div class="card w-48 bg-base-100 shadow-xl">-->
<!--              <figure class="px-10 pt-10">-->
<!--                <img src="/recorder.png" alt="Recorder" class="rounded-xl w-22" />-->
<!--              </figure>-->
<!--              <div class="card-body items-center text-center">-->
<!--                <div class="card-actions">-->
<!--                  <label for="my-modal-3" @click="from_device = false; from_app = false; record_now = true" class="btn btn-primary">Record Now</label>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->

<!--            <div class="ml-20 card w-48 bg-base-100 shadow-xl">-->
<!--              <figure class="px-10 pt-10">-->
<!--                <img src="/from_app.webp" alt="App" class="rounded-xl w-22" />-->
<!--              </figure>-->
<!--              <div class="card-body items-center text-center">-->
<!--                <div class="card-actions">-->
<!--                  <button @click="from_device = false; from_app = true; record_now = false" class="btn btn-primary">From App</button>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </template>-->

        <div v-if="from_device">
          <input @change="processFile($event)" type="file" name="waw_file" class="mt-12 file-input file-input-bordered file-input-primary w-full " />
        </div>

<!--        <div v-if="from_app" class="mt-12">-->
<!--          <v-select v-model="recording_from_app" class=" h-12" :options="recordings"></v-select>-->
<!--        </div>-->

<!--        <div v-if="record_now">-->
<!--          <input type="checkbox" id="my-modal-3" class="modal-toggle" />-->
<!--          <div class="modal">-->
<!--            <div class="modal-box relative">-->
<!--              <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>-->
<!--              <div>-->
<!--                <tapir-widget class="no_border" :time="2" :customUpload="upload" buttonColor="mediumpurple"></tapir-widget>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->

        <div class="flex justify-end mb-10">
          <button type="submit" @click="onSubmit()" class="mt-16 relative w-80 inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group">
            <span class="w-48 h-48 rounded rotate-[-40deg] bg-violet-500 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
            <span class="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">Add Symptoms</span>
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import {onMounted, ref} from "vue";
import Swal from 'sweetalert2'
import TapirWidget from 'vue-audio-tapir';
import 'vue-audio-tapir/dist/vue-audio-tapir.css';
import {Diagnostic} from "@/composables/dataTypes";
import {useRouter} from "vue-router";
const router = useRouter();
const file = ref('');
const spinner = ref(false);
const from_device = ref(true);
const from_app = ref(false);
const record_now = ref(false);
const diagnostic_types = ref([{'value': 1, 'label': 'Heart'}, {'value': 2, 'label': 'Lungs'}]);
const form = ref(new Diagnostic());
form.value.date = ref(new Date().toLocaleDateString());
const recordings = ref([]);
const recording_from_app = ref('');

const upload = async (blob) => {
  let formData = new FormData();
  formData.append('audio', blob);
  formData.append('userId', form.value.user_id);
  file.value  = new File([blob], 'some_file_name.wav',);

  try {
    await axios
        .post("https://maria.develop.eiddew.com/licenta/public/api/audio", formData)
        .then(async (response) => {
          form.value.recording_id = response.data.recording_id;

          if (response.data.status) {
            await Swal.fire({
              title: 'Done!',
              text: response.data.message,
              icon: 'success'
            })
            await onSubmit();
          } else {
            await Swal.fire({
              title: 'Error!',
              text: response.data.message,
              icon: 'error'
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

const onSubmit = async () => {
  if(from_app.value) {
    await getAudio();
    form.value.recording_id = recording_from_app.value.value;
  }
  let formData = new FormData();
  formData.append("waw_file", file.value)

  if (form.value.type['value'] === 1) {
    try {
      spinner.value = true;
      await axios.post("http://127.0.0.1:5000/uploader", formData)
          .then((response) => {
            afterSubmit();
            if (response.data.status == 'false') {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: response.data.error,
              })
              spinner.value = false;
            } else {
              form.value.predictions = response.data.predictionsCNN;

              form.value.result = 'Your BPM value is: ' + response.data.bpm + '. '  +
                  'Your diagnostic based on the CNN method is: ' + response.data.predictionCNN + '. ' + 'Your BPM value is: '+ response.data.bpm +' . The diagnostic based on your BPM is:'+  response.data.diagnostic + '.';

              form.value.result_short = response.data.predictionCNN;

              if (form.value.result_short === 'Heart murmur') {
                form.value.disease_id = 10;
              } else if (form.value.result_short === 'Heart normal') {
                form.value.disease_id = 12;
              } else if (form.value.result_short === 'Heart failure') {
                form.value.disease_id = 9;
              } else if (form.value.result_short === 'Heart Arrhythmia') {
                form.value.disease_id = 11;
              }

              saveDiagnostic();
            }
            recording_from_app.value = '';
          });
    } catch (e) {
      spinner.value = false;
      console.log(e);
    }
  } else if (form.value.type['value'] === 2) {
    try {
      spinner.value = true;
      await axios.post("http://127.0.0.1:5000/uploader-lungs", formData)
          .then((response) => {
            afterSubmit();
            if (response.data.status == 'false') {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: response.data.error,
              })
              spinner.value = false;
            } else {
              form.value.predictions = response.data.predictions;

              form.value.result = 'Your diagnostic based on the CNN method is: ' + response.data.predictionCNN;

              form.value.result_short = response.data.predictionCNN;

              if (form.value.result_short === 'ASTM') {
                form.value.disease_id = 7;
              } else if (form.value.result_short === 'BPOC') {
                form.value.disease_id = 6;
              } else if (form.value.result_short === 'Normal') {
                form.value.disease_id = 13;
              } else if (form.value.result_short === 'Pneumonia') {
                form.value.disease_id = 8;
              }

              saveDiagnostic();
            }

            recording_from_app.value = '';
          });
    } catch (e) {
      spinner.value = false;
      console.log(e);
    }
  }
}

const afterSubmit = async () => {
  try {
    await axios.get("http://127.0.0.1:5000/uploader")
  } catch (e) {
    console.log(e);
  }
}

const saveDiagnostic = async () => {
  form.value.type = form.value.type['value'];
  try {
    await axios
        .post(`https://maria.develop.eiddew.com/licenta/public/api/diagnostic`, {
          form: form.value
        })
        .then((response) => {
          if(form.value.type === 1) {
            addNewDiagnosticHeart();
          } else if(form.value.type === 2) {
            addNewDiagnosticLungs();
          }
          Swal.fire({
            title: 'Diagnostic saved!',
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Next!'
          }).then((result) => {
            if (result.isConfirmed) {
              spinner.value = false;
              router.push('/add-symptoms/' + response.data.id);
            }
          })
        });
  } catch (e) {
    console.log(e);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
    })
  }
}

const addNewDiagnosticHeart = async () => {
  try {
    await axios
        .post(`https://maria.develop.eiddew.com/licenta/public/api/addNewDiagnosticHeart`)
        .then((response) => {
        });
  } catch (e) {
    console.log(e);
  }
}

const addNewDiagnosticLungs = async () => {
  try {
    await axios
        .post(`https://maria.develop.eiddew.com/licenta/public/api/addNewDiagnosticLungs`)
        .then((response) => {
        });
  } catch (e) {
    console.log(e);
  }
}

const processFile = async (event) => {
  file.value = event.target.files[0];

  let blob = new Blob([file.value])

  let formData = new FormData();
  formData.append('audio', blob);
  formData.append('userId', form.value.user_id);

  try {
    await axios
        .post("https://maria.develop.eiddew.com/licenta/public/api/audio", formData)
        .then(async (response) => {
          form.value.recording_id = response.data.recording_id;

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

const getAudio = async () => {
  await axios.get(`https://maria.develop.eiddew.com/licenta/public/api/getAudio`, {
    params:{
      filename: recording_from_app.value.path
    },
    responseType: 'blob'
  })
      .then(async (response) => {
        let blob = new Blob([response.data])
        file.value = new File([blob], 'some_file_name.wav',);
      })
      .catch((error) => {
        console.log('eroare: ', error);
      })
}

const getAudioRecordings = async (user_id) => {
  await axios.get(`https://maria.develop.eiddew.com/licenta/public/api/audio/${user_id}`)
      .then((response) => {
        response.data.recordings.forEach((rec) => {
          recordings.value.push({
            value: rec.id,
            label: rec.file_name,
            path: rec.path + rec.file_name,
          })
        })
      })
      .catch((error) => {
        console.log('eroare: ', error);
      })
}

onMounted(async () => {
  await axios.get("https://maria.develop.eiddew.com/licenta/public/api/getUser")
      .then(async (result) => {
        form.value.user_id = result.data.id;
        await getAudioRecordings(form.value.user_id);
      })
      .catch((error) => {
        console.log('eroare: ',error);
      })
})
</script>

<style>
.steps .step-primary + .step-primary:before,
.steps .step-primary:after {
  background-color: rgb(139 92 246 ) !important;

}

.no_border {
  border: none !important;
  box-shadow: none !important;
}
</style>