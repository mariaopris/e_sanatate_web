<template>
  <h1 class="text-3xl flex justify-center font-bold mb-10">Heart Murmur</h1>
  <div class="grid grid-cols-2">
    <img src="/heart_murmur.jpg" class="w-96 custom-dim">
    <p class="text-xl">A heart murmur is an abnormal sound heard during a heartbeat, typically caused by turbulent blood flow through the heart's valves or chambers. While heart murmurs can be harmless and require no treatment, they can also indicate an underlying heart condition that may require further evaluation and treatment.

      Heart murmurs are typically detected during a physical examination by a healthcare provider, who may hear a whooshing or swishing sound during the heartbeat. Depending on the sound, location, and timing of the murmur, further testing may be needed to determine the cause and severity of the murmur.

      There are two types of heart murmurs: innocent murmurs and abnormal murmurs. Innocent murmurs are harmless and do not require treatment, often occurring in children and young adults due to the natural flow of blood through the heart. Abnormal murmurs, on the other hand, may indicate an underlying heart condition such as a defective heart valve, an enlarged heart, or a hole in the heart.
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