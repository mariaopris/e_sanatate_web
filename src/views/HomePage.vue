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
      <div class="py-10 px-10 bg-violet-400 rounded-lg mt-5">
        <h2 class="text-3xl tracking-tight font-extrabold text-gray-100">
          <span class="block">Welcome back, {{user.name}}!</span>
          <span class="block"></span>
        </h2>
      </div>
      <div class="flex justify-between">

        <div class="card w-96 bg-base-100 shadow-xl mt-5 custom-height">
          <figure><img src="/stetoscop.jpg" alt="stetoscop" /></figure>
          <div class="card-body">
            <h2 class="card-title">What is iStethoscope?</h2>
            <p>Using the designated stethoscope this website uses multiple AI algorithms to determine if you have an affection.</p>
            <div class="card-actions justify-end">
              <RouterLink to="/diagnosis"><button class="btn w-32 gap-2 bg-violet-400 border border-0">Try Now</button></RouterLink>
            </div>
          </div>
        </div>

        <div class="card w-96 shadow-xl mt-5 custom-height">
          <figure><img src="/lungs-and-heart.jpg" alt="Shoes" /></figure>
          <div class="card-body">
            <h2 class="card-title">What does iStethoscope detect?</h2>
            <p>iStethoscope can detect a healthy patient as well as multiple heart and lungs affections, including: COPD, Heart Murmur, Asthma</p>
            <div class="card-actions justify-end">
              <RouterLink to="/diseases/all"><button class="btn w-32 gap-2 bg-violet-400 border border-0">View More</button></RouterLink>
            </div>
          </div>
        </div>

        <div class="artboard custom-height phone-2 bg-violet-100 rounded-lg mt-5 mr-5 mb-3">
          <div class="avatar justify-between flex mt-10">
            <p class="ml-10 text-xl mt-5 text-violet-800">Hello, {{user.name}}</p>
            <div class="mr-10 w-20 rounded-full">
              <img class="" src="/avatar.png" />
            </div>
          </div>
          <div class="flex justify-end mr-10 mt-3">
            <button class="btn btn-sm btn-outline btn-primary mr-2"><RouterLink :to="'/users/edit/'+ user.id">Edit</RouterLink></button>
          </div>
          <div class="ml-2 mt-5">
            <div class="stats shadow w-80 ml-2 bg-violet-50">
              <div class="stat">
                <div class="stat-title">Last diagnostic heart</div>
                <div class="stat-value text-3xl text-purple-400">{{diagnostic_heart.result}}</div>
                <div v-if="diagnostic_heart.id >= 0" class="stat-desc"><RouterLink :to="'/results/' + diagnostic_heart.id">more...</RouterLink></div>
              </div>
            </div>
          </div>

          <div class="ml-2 mt-5">
            <div class="stats shadow w-80 ml-2 bg-violet-50">
              <div class="stat">
                <div class="stat-title">Last diagnostic lungs</div>
                <div class="stat-value text-3xl text-purple-400">{{diagnostic_lungs.result}}</div>
                <div v-if="diagnostic_lungs.id >= 0" class="stat-desc"><RouterLink :to="'/results/' + diagnostic_lungs.id">more...</RouterLink></div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import axios from "axios";
import {AuthUser, User} from '@/composables/dataTypes';
import {json} from "stream/consumers";

const spinner = ref(true);
const user = ref(new User());
const diagnostic_heart = ref({
  id: -1,
  result: 'No records'
});
const diagnostic_lungs = ref({
  id: -1,
  result: 'No records'
});

const getDiagnostics = async (user_id: number) => {
  try {
    await axios
        .get(`https://maria.develop.eiddew.com/licenta/public/api/getLastDiagnostic`, {
          params: {
            user_id: user_id
          }
        })
        .then((response) => {
          if(response.data.diagnostic_heart) {
            diagnostic_heart.value.id = response.data.diagnostic_heart.id;
            diagnostic_heart.value.result = response.data.diagnostic_heart.result_short;
          }

          if(response.data.diagnostic_lungs) {
            diagnostic_lungs.value.id = response.data.diagnostic_lungs.id;
            diagnostic_lungs.value.result = response.data.diagnostic_lungs.result_short;
          }

          spinner.value = false;
        });
  } catch (e) {
    console.log(e);
  }
}

onMounted(async () => {
  await axios.get("https://maria.develop.eiddew.com/licenta/public/api/getUser")
      .then(async (result) => {
        user.value = result.data;
        await getDiagnostics(user.value.id);
      })
      .catch((error) => {
        console.log('eroare: ',error);
      })
})
</script>

<style>
.custom-height {
  height: 470px !important;
}
</style>