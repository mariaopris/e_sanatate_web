<template>
  <div class="container justify-center items-center mx-auto">
    <h2 class="text-3xl tracking-tight font-extrabold text-violet-500 text-center mb-5 mt-10">
      <span class="block">User List</span>
    </h2>
    <div class="overflow-x-auto w-full">
      <table class="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Admin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in users">
            <td>
              <div class="flex items-center space-x-3">
                <div class="avatar">
                  <div class="mask mask-squircle w-12 h-12">
                    <img src="/avatar.png" alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
                <div>
                  <div class="font-bold">{{item.name}}</div>
                  <div class="text-sm opacity-50">{{item.email}}</div>
                </div>
              </div>
            </td>
            <td>
              <input @change="changeRole(item.id, item.is_admin)" type="checkbox" :checked="item.is_admin" class="checkbox checkbox-primary ml-3" />
            </td>
            <th>
              <button class="btn btn-ghost btn-xs bg-violet-100 mr-2"><RouterLink :to="'/users/file/'+ item.id">File</RouterLink></button>
              <button @click="deleteAlarm(item.id)" class="btn btn-ghost btn-xs bg-red-100 mr-2">Delete</button>
              <button class="btn btn-ghost btn-xs bg-blue-100 mr-2"><RouterLink :to="'/users/edit/'+ item.id">Edit</RouterLink></button>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import Swal from "sweetalert2";
import {ref} from "vue";

const users = ref([]);

const changeRole = async (id, role_id) => {
  let is_admin = role_id;
  if (role_id === false) {
    role_id = 1;
  } else {
    role_id = 2;
  }
  try {
    await axios
        .post("https://maria.develop.eiddew.com/licenta/public/api/change-role", {
          model_id: id,
          role_id: role_id,
        })
        .then((response) => {
          if (response.data.status === true) {
            let i = users.value.map(item => item.id).indexOf(id);
            users.value[i].is_admin = !is_admin;
            Swal.fire(
                response.data.message,
                '',
                'success'
            )
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

const deleteAlarm = (id) => {
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
      deleteRow(id);
    }
  })
}

const deleteRow = async (id) => {
  try {
    await axios
        .delete("https://maria.develop.eiddew.com/licenta/public/api/users/" + id)
        .then((response) => {
          if (response.data.status === true) {
            let i = users.value.map(item => item.id).indexOf(id);
            users.value.splice(i, 1);
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

const getUsers = async () => {
  try {
    await axios
        .get("https://maria.develop.eiddew.com/licenta/public/api/users")
        .then((response) => {
          response.data.users.forEach((item)=> {
            let admin = false;
            if (item.roles.length > 0) {
              if (item.roles[0].name === 'admin') {
                admin = true;
              }
            }
            users.value.push({
              id: item.id,
              name: item.name,
              email: item.email,
              is_admin: admin,
            })
          })
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

getUsers();
</script>
