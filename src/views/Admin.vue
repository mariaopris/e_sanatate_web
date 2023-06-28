<template>
  <div class="container justify-center items-center mx-auto mt-20">

    <div class="flex justify-between">
      <button class="btn btn-sm gap-2 bg-violet-400 mb-5 border border-0">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 448 512" fill="currentColor">
          <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
        </svg>
        <RouterLink to="/add-disease"><span>Add Disease</span></RouterLink>
      </button>

      <button class="btn btn-sm gap-2 bg-violet-400 mb-5 border border-0">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 448 512" fill="currentColor">
          <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
        </svg>
        <RouterLink to="/add-symptom"><span>Add Symptom</span></RouterLink>
      </button>
    </div>

    <div class="flex justify-between">
      <div class="overflow-x-auto">
        <table class="table table-compact w-96">
          <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in diseases">
            <th>{{index+1}}</th>
            <td>{{item.name}}</td>
            <td>
              <button class="btn btn-ghost btn-xs bg-blue-100 mr-2"><RouterLink :to="'/edit-disease/'+item.id">Edit</RouterLink></button>
              <button @click="deleteAlarmDisease(item.id)" class="btn btn-ghost btn-xs bg-red-100 mr-2">Delete</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <div class="overflow-x-auto">
        <table class="table table-compact w-96">
          <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in symptoms">
            <th>{{index+1}}</th>
            <td>{{item.name}}</td>
            <td>
              <button class="btn btn-ghost btn-xs bg-blue-100 mr-2"><RouterLink :to="'/edit-symptom/'+item.id">Edit</RouterLink></button>
              <button @click="deleteAlarmSymptom(item.id)" class="btn btn-ghost btn-xs bg-red-100 mr-2">Delete</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import Swal from "sweetalert2";
import {ref} from "vue";

const symptoms = ref([]);
const diseases = ref([]);

const deleteAlarmDisease = (id) => {
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
      deleteRowDisease(id);
    }
  })
}

const deleteAlarmSymptom = (id) => {
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
      deleteRowSymptom(id);
    }
  })
}

const deleteRowDisease = async (id) => {
  try {
    await axios
        .delete("https://maria.develop.eiddew.com/licenta/public/api/disease/" + id)
        .then((response) => {
          if (response.data.status === true) {
            let i = diseases.value.map(item => item.id).indexOf(id);
            diseases.value.splice(i, 1);
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

const deleteRowSymptom = async (id) => {
  try {
    await axios
        .delete("https://maria.develop.eiddew.com/licenta/public/api/symptom/" + id)
        .then((response) => {
          if (response.data.status === true) {
            let i = symptoms.value.map(item => item.id).indexOf(id);
            symptoms.value.splice(i, 1);
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

const getSymptoms = async () => {
  try {
    await axios.get("https://maria.develop.eiddew.com/licenta/public/api/symptom")
        .then(async (response) => {
          symptoms.value = response.data.symptoms;
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

const getDiseases = async () => {
  try {
    await axios.get("https://maria.develop.eiddew.com/licenta/public/api/disease")
        .then(async (response) => {
          diseases.value = response.data.diseases;
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

getSymptoms();
getDiseases();
</script>
