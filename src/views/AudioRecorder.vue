<template>
  <div>
    <h2 class="text-3xl tracking-tight font-extrabold text-violet-500 text-center mb-5 mt-7">
      <span class="block">Record/Manage Recordings</span>
    </h2>
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
      <div class="grid mt-12">
        <div>
          <tapir-widget :time="2" :customUpload="upload" buttonColor="mediumpurple"></tapir-widget>
        </div>
        <div class="flex justify-center mt-10 ">
          <div class="overflow-x-auto">
            <table class="table w-full">
              <thead>
              <tr>
                <th>File Name</th>
                <th>Edit</th>
                <th>Recording</th>
                <th>Delete</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(recording, recording_index) in recordings">
                <td>
                  <template v-if="recording.in_edit">
                    <input type="text" class="input input-bordered input-primary w-full max-w-xs" v-model="recording.file_name"/>
                  </template>
                  <template v-else>
                    {{recording.file_name}}
                  </template>
                </td>

                <td class="mt-3">
                  <template v-if="recording.in_edit" class="flex">
                    <button @click="updateAudioName(recording.id, recording_index)">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="green" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </button>
                    <button class="ml-2" @click="recording.in_edit = false">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </template>
                  <template v-else>
                    <button @click="checkInEdit(recording_index)">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                      </svg>
                    </button>
                  </template>
                </td>

                <td>
                  <audio controls>
                    <source class="bg-gray-100" :src="recording.path" type="audio/wav">
                    Your browser does not support the audio element.
                  </audio>
                </td>

                <td>
                  <button @click="alertDeleteAudioRecording(recording.id, recording_index)">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                </td>

              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>


<script setup>
import {onMounted, ref} from 'vue';
import TapirWidget from 'vue-audio-tapir';
import 'vue-audio-tapir/dist/vue-audio-tapir.css';
import axios from "axios";
import Swal from "sweetalert2";

const userId = ref('');
const recordings = ref([]);
const spinner = ref(true);

const checkInEdit = (index) => {
  recordings.value.forEach((rec, rec_index) => {
    rec.in_edit = index === rec_index;
  })
}

const updateAudioName = (id, index) => {
  axios.post("https://maria.develop.eiddew.com/licenta/public/api/change-audio-name", {
    id: id,
    file_name: recordings.value[index].file_name,
  })
      .then((response) => {
        recordings.value[index].in_edit = false;
      })
      .catch((error) => {
        console.log('eroare: ', error);
      })
}

const alertDeleteAudioRecording = (id, index) => {
  Swal.fire({
    title: 'Sure that you want to delete this recording?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes'
  }).then((result) => {
    if (result.isConfirmed) {
      deleteAudioRecording(id, index);
    }
  })
}

const deleteAudioRecording = (id, index) => {
  axios.delete(`https://maria.develop.eiddew.com/licenta/public/api/audio/${id}`)
      .then((response) => {
        recordings.value.splice(index,1);
      })
      .catch((error) => {
        console.log('eroare: ', error);
      })
}

const upload = async (blob) => {
  let formData = new FormData();
  formData.append('audio', blob);
  formData.append('userId', userId.value);

  try {
    await axios
        .post("https://maria.develop.eiddew.com/licenta/public/api/audio", formData)
        .then(async (response) => {
          if (response.data.status) {
            await Swal.fire({
              title: 'Done!',
              text: response.data.message,
              icon: 'success'
            })
            await getAudioRecordings();
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

const getUser = async () => {
  await axios.get("https://maria.develop.eiddew.com/licenta/public/api/getUser")
      .then(async (result) => {
        userId.value = result.data.id;
        if (userId.value) {
          await getAudioRecordings();
        }
      })
      .catch((error) => {
        console.log('eroare: ', error);
      })
}

const getAudioRecordings = async () => {
  recordings.value = [];
  await axios.get(`https://maria.develop.eiddew.com/licenta/public/api/audio/${userId.value}`)
      .then((response) => {
        response.data.recordings.forEach((rec) => {
          recordings.value.push({
            id: rec.id,
            file_name: rec.file_name,
            path: 'https://maria.develop.eiddew.com/licenta/public/storage' + rec.path + rec.file_name,
            in_edit: false,
          })
        })
        spinner.value = false;
      })
      .catch((error) => {
        console.log('eroare: ', error);
      })
}

onMounted(async ()=> {
  await getUser();
})
</script>