<template>
  <div>
    <template v-if="spinner">
      <div class="flex items-center justify-center mt-60 space-x-2">
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
      <div class="grid justify-center items-center mb-20">
        <h2 class="text-3xl tracking-tight font-extrabold text-violet-500 text-center mt-10 mb-10">
          <span class="block">Add Symptoms</span>
        </h2>
        <ul class="steps steps-vertical lg:steps-horizontal mt-3 mb-12">
          <li class="step step-primary">Upload .wav File</li>
          <li class="step step-primary">Add Symptoms</li>
          <li class="step">Get Results</li>
          <li class="step">View Treatment</li>
        </ul>
        <template v-for="symptom in symptoms" class="">
          <div class="form-control">
            <label class="label cursor-pointer">
              <span class="label-text flex">{{symptom.name}}</span>
              <input @change="checkSymptom(symptom.id)" type="checkbox" :checked="symptom.is_checked" class="checkbox checkbox-primary ml-3" />
            </label>
          </div>

          <div v-if="!symptom.info_desc && symptom.description" @click="symptom.info_desc = true" class="ml-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="blue" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
          </div>

          <template v-if="symptom.info_desc">
            <div class="alert">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span>{{symptom.description}}</span>
              <div>
                <button @click="symptom.info_desc = false">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </template>
        </template>

        <div class="flex justify-end ">
          <button type="submit" @click="onSubmit()" class="mt-16 relative w-80 inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group">
            <span class="w-48 h-48 rounded rotate-[-40deg] bg-violet-500 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
            <span class="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">Get results</span>
          </button>
        </div>

      </div>
    </template>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import {useRoute} from "vue-router";
import {useRouter} from "vue-router";
const router = useRouter();
const route = useRoute();
const spinner = ref(true);

const id = route.params.id;
const symptoms = ref([]);
const checked_ids = ref([]);
const diagnostic_type = ref(1);
const diseases = ref([]);
const means = ref({});
const predictions = ref([]);
const prediction = ref(0);
const disease_id = ref(0);
const result = ref('');
const result_short = ref('');

const getDiagnosticWeightedMean = () => {
  diseases.value.forEach((disease) => {
    let first_sum = 0;
    let second_sum = 0;
    let mean = 0;
    if (disease.weights) {
      for (let weight in disease.weights) {
        second_sum += disease.weights[weight];
      }

      checked_ids.value.forEach((symptom) => {
        if (disease.weights[symptom]) {
          first_sum += disease.weights[symptom]
        } else {
          if (disease.id === 8) {
            first_sum += 33.33;
          }
        }
      })

      mean = first_sum / second_sum;
      means.value[Number(disease.id)] = mean;
    }
  })

  if (diagnostic_type.value === 1) {
    predictions.value[0] = 0.6 * predictions.value[0] + 0.4 * means.value[11];
    predictions.value[1] = 0.6 * predictions.value[1] + 0.4 * means.value[9];
    predictions.value[2] = Number(predictions.value[2]) + 0.4;
    predictions.value[3] = 0.6 * Number(predictions.value[3]);
  }

  if (diagnostic_type.value === 2) {
    predictions.value[0] = 0.6 * predictions.value[0] + 0.4 * means.value[7];
    predictions.value[1] = 0.6 * predictions.value[1] + 0.4 * means.value[6];
    predictions.value[2] = 0.6 * Number(predictions.value[2]) + 0.4;
    predictions.value[3] = 0.6 * predictions.value[3] + 0.4 * means.value[8];
  }
  prediction.value = predictions.value.reduce((a, b) => Math.max(a, b), -Infinity);
  let index;
  index = predictions.value.map(item => item).indexOf(prediction.value);

  if (diagnostic_type.value === 1) {
    switch (index) {
      case 0:
        disease_id.value = 11;
        result_short.value = 'Heart Arrhythmia';
        break;
      case 1:
        disease_id.value = 9;
        result_short.value = 'Heart failure';
        break;
      case 2:
        disease_id.value = 10;
        result_short.value = 'Heart murmur';
        break;
      case 3:
        disease_id.value = 12;
        result_short.value = 'Heart normal';
        break;
    }
  }

  if (diagnostic_type.value === 2) {
    switch (index) {
      case 0:
        disease_id.value = 7;
        result_short.value = 'ASTM';
        break;
      case 1:
        disease_id.value = 6;
        result_short.value = 'BPOC';
        break;
      case 2:
        disease_id.value = 13;
        result_short.value = 'Normal';
        break;
      case 3:
        disease_id.value = 8;
        result_short.value = 'Pneumonia';
        break;
    }
  }

  result.value = 'Your diagnostic is: ' + result_short.value;

  means.value = JSON.stringify(means.value);
}

const onSubmit = async () => {
  symptoms.value.forEach((symptom) => {
    if(symptom.is_checked){
      checked_ids.value.push(symptom.id);
    }
  })

  getDiagnosticWeightedMean();

  try {
    await axios
        .put(`https://maria.develop.eiddew.com/licenta/public/api/diagnostic/${id}`, {
          symptoms: checked_ids.value,
          weighted_means_result: means.value,
          disease_id: disease_id.value,
          result: result.value,
          result_short: result_short.value
        })
        .then((response) => {
          Swal.fire({
            title: 'Symptoms saved!',
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Next!'
          }).then((result) => {
            if (result.isConfirmed) {
              router.push('/results/' + id);
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

const checkSymptom = async (id) => {
  let i = symptoms.value.map(item => item.id).indexOf(id);
  symptoms.value[i].is_checked = !symptoms.value[i].is_checked;
}

const getSymptoms = async () => {
  try {
    await axios.get("https://maria.develop.eiddew.com/licenta/public/api/getSymptomsByType", {
      params: {
        type: diagnostic_type.value
      }
    })
        .then(async (response) => {
          response.data.symptoms.forEach((symptom) => {
            symptoms.value.push({
              id: symptom.id,
              name: symptom.name,
              is_checked: false,
              info_desc: false,
              description: symptom.description
            })
          })

          spinner.value = false;
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

const getDiagnostic = async () => {
  try {
    await axios.get(`https://maria.develop.eiddew.com/licenta/public/api/diagnostic/${id}`)
        .then(async (response) => {
          diagnostic_type.value = response.data.diagnostic.type;
          response.data.diagnostic.predictions = response.data.diagnostic.predictions.substring(2);
          response.data.diagnostic.predictions = response.data.diagnostic.predictions.substring(0, response.data.diagnostic.predictions.length - 2);
          response.data.diagnostic.predictions = response.data.diagnostic.predictions.replace('  ',' ');
          predictions.value = response.data.diagnostic.predictions.split(' ');
          await getSymptoms();
          await getDiseasesByType();
        });
  } catch (e) {
    if (e.response?.data?.error) {
      console.log(e);
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
}

const getDiseasesByType = async () => {
  try {
    await axios.get(`https://maria.develop.eiddew.com/licenta/public/api/getDiseasesByType`, {
      params: {
        type: diagnostic_type.value
      }
    })
        .then(async (response) => {
          response.data.diseases.forEach((disease) => {
            diseases.value.push({
              id: disease.id,
              weights: JSON.parse(disease.weights)
            })
          })
        });
  } catch (e) {
    if (e.response?.data?.error) {
      console.log(e);
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
}
onMounted(async () => {
  await getDiagnostic();
})
</script>

<style>
.steps .step-primary + .step-primary:before,
.steps .step-primary:after {
  background-color: rgb(139 92 246 ) !important;

}
</style>
