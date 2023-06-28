import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/diagnosis',
      name: 'diagnosis',
      component: () => import('../views/HeartDiagnosis.vue')
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/Users.vue')
    },
    {
      path: '/users/edit/:id',
      name: 'users-edit',
      component: () => import('../views/EditUser.vue')
    },
    {
      path: '/users/file/:id',
      name: 'users-file',
      component: () => import('../views/PatientFile.vue')
    },
    {
      path: '/users/file/edit/:id',
      name: 'users-file-edit',
      component: () => import('../views/EditPatientFile.vue')
    },
    {
      path: '/results/:id',
      name: 'results',
      component: () => import('../views/ResultsPage.vue')
    },
    {
      path: '/add-symptoms/:id',
      name: 'add-symptoms',
      component: () => import('../views/AddSymptoms.vue')
    },
    {
      path: '/diseases/all',
      name: 'diseases/all',
      component: () => import('../views/diseases/DiseasesList.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/Admin.vue')
    },
    {
      path: '/add-disease',
      name: 'add-disease',
      component: () => import('../views/AddDisease.vue')
    },
    {
      path: '/add-symptom',
      name: 'add-symptom',
      component: () => import('../views/AddSymptom.vue')
    },
    {
      path: '/edit-disease/:id',
      name: 'edit-disease',
      component: () => import('../views/EditDisease.vue')
    },
    {
      path: '/edit-symptom/:id',
      name: 'edit-symptom',
      component: () => import('../views/EditSymptom.vue')
    },
    {
      path: '/recorder',
      name: 'recorder',
      component: () => import('../views/AudioRecorder.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/',
      name: 'login-home',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/Dashboard.vue')
    },
    {
      path: '/home-page',
      name: 'home-page',
      component: () => import('../views/HomePage.vue')
    },
    {
      path: '/diseases/COPD',
      name: '/diseases/COPD',
      component: () => import('../views/diseases/COPD.vue')
    },
    {
      path: '/diseases/asthma',
      name: '/diseases/asthma',
      component: () => import('../views/diseases/Asthma.vue')
    },
    {
      path: '/diseases/pneumonia',
      name: '/diseases/pneumonia',
      component: () => import('../views/diseases/Pneumonia.vue')
    },
    {
      path: '/diseases/heart-failure',
      name: '/diseases/heart-failure',
      component: () => import('../views/diseases/HeartFailure.vue')
    },
    {
      path: '/diseases/heart-murmur',
      name: '/diseases/heart-murmur',
      component: () => import('../views/diseases/HeartMurmur.vue')
    },
    {
      path: '/diseases/heart-arrhythmia',
      name: '/diseases/heart-arrhythmia',
      component: () => import('../views/diseases/HeartArrhythmia.vue')
    }
  ]
});

export default router;
