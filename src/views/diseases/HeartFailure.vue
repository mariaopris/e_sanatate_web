<template>
  <h1 class="text-3xl flex justify-center font-bold mb-10">Heart Failure</h1>
  <div class="grid grid-cols-2">
    <img src="/heart_fail.jpg" class="custom-dim" alt="heart failure">
    <p class="text-xl">Heart failure is a chronic condition that affects the heart's ability to pump blood effectively. It occurs when the heart muscle is weakened or damaged, often as a result of underlying conditions such as coronary artery disease, high blood pressure, or diabetes. Heart failure can be a serious and life-threatening condition, but with proper management and treatment, individuals with heart failure can lead fulfilling lives.

      The symptoms of heart failure can vary depending on the severity of the condition, but may include shortness of breath, fatigue, swelling in the legs and ankles, coughing, and a rapid or irregular heartbeat. In some cases, individuals may experience chest pain or tightness, especially during physical activity.
      Treatment options vary depending on the underlying cause of the condition, but may include medications such as diuretics to reduce fluid buildup, beta-blockers to improve heart function, and ACE inhibitors to reduce blood pressure.
    </p>
  </div>
  <div class="flex justify-center mt-10">
    <RouterLink class="btn btn-sm w-32 bg-gray-400 border border-0" to="/diseases/all"><span> back  </span></RouterLink>
  </div>
</template>

<style>
  .custom-dim {
    height: 300px;
    width: 500px;
  }
</style>