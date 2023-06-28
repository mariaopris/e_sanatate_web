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
         <div class="ml-5">
           <div class="mt-5 stats shadow">
             <div class="stat bg-violet-50">
               <div class="stat-figure text-primary">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
               </div>
               <div class="stat-title">Total Diagnostics</div>
               <div class="stat-value text-primary">{{no_total_diagnostics}}</div>
               <div class="stat-desc">{{stat_total_diagnostic}}% more than last month</div>
             </div>

             <div class="stat">
               <div class="stat-figure text-secondary">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
               </div>
               <div class="stat-title">New users</div>
               <div class="stat-value text-secondary">{{no_monthly_users}}</div>
             </div>

             <div class="stat bg-violet-50">
               <div class="grid grid-cols-2">
                 <div>
                   <div class="stat-value">{{no_total_users}}</div>
                   <div class="stat-title">All users</div>
                 </div>
                 <div>
                   <div class="avatar-group -space-x-6 ">
                     <div class="avatar">
                       <div class="w-12 ">
                         <img src="/avatar6.png" />
                       </div>
                     </div>
                     <div class="avatar">
                       <div class="w-12">
                         <img src="/avatar5.png" />
                       </div>
                     </div>
                     <div class="avatar placeholder">
                       <div class="w-12 bg-neutral-focus text-neutral-content">
                         <span>+99</span>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
               <div class="stat-desc text-secondary">{{stat_total_users}}% more than last month</div>
             </div>

           </div>

           <div v-if="data.length > 0" class="mt-3" >
             <Chart
                 :size="{ width: 790, height: 350 }"
                 :data="data"
                 :margin="margin"
                 direction="horizontal">

               <template #layers>
                 <Grid strokeDasharray="2,2" />
                 <Line :dataKeys="['name', 'pl']" />
               </template>

             </Chart>
           </div>
         </div>

         <div class="artboard custom-h-2 phone-2 bg-violet-100 rounded-lg mt-5 mr-5 mb-3">
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
import {defineComponent, onMounted, ref} from 'vue'
import { Chart, Grid, Line } from 'vue3-charts'
import axios from "axios";
import {AuthUser, User} from '@/composables/dataTypes';

const user = ref(new User());
const no_total_diagnostics = ref(0);
const no_total_users = ref(0);
const no_monthly_diagnostics = ref(0);
const no_monthly_users = ref(0);
const stat_total_diagnostic = ref(0);
const stat_total_users = ref(0);
const diagnostic_heart = ref({
  id: -1,
  result: 'No records'
});
const diagnostic_lungs = ref({
  id: -1,
  result: 'No records'
});
const spinner = ref(true);
const data = ref([])
const margin = ref({
  left: 0,
  top: 20,
  right: 20,
  bottom: 0
})

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

const getStatistics = async () => {
  try {
    await axios
        .get(`https://maria.develop.eiddew.com/licenta/public/api/statistic`)
        .then((response) => {
          no_total_diagnostics.value = response.data.no_total_diagnostics;
          no_total_users.value = response.data.no_total_users;
          no_monthly_users.value = response.data.no_monthly_users;
          no_monthly_diagnostics.value = response.data.no_monthly_diagnostics;
          stat_total_diagnostic.value = (no_monthly_diagnostics.value / no_total_diagnostics.value) * 100;
          stat_total_diagnostic.value = Math.round(stat_total_diagnostic.value);
          stat_total_users.value = (no_monthly_users.value / no_total_users.value) * 100;
          stat_total_users.value = Math.round(stat_total_users.value);

          let counter = 100;
          response.data.statistics.forEach((statistic: any) => {
            if(data.value.length <= 7) {
              data.value.push({
                name: statistic.date,
                pl: statistic.no_new_diagnostic_h + statistic.no_new_diagnostic_l,
                inc: counter,
              })
              counter = counter + 100;
            }
          })
        });
  } catch (e) {
    console.log(e);
  }
}

onMounted(async () => {
  await getStatistics();
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
.custom-h-2 {
  height: 470px !important;
}
</style>