<template>
  <h1 class="text-3xl flex justify-center font-bold mb-10">Heart Arrhythmia</h1>
  <div class="grid grid-cols-2">
    <img src="/heart_arry.jpg" class="w-96 custom-dim">
    <p class="text-xl">Arrhythmia is a medical condition characterized by an irregular heartbeat or abnormal heart rhythm. It occurs when the heart's electrical system does not function properly, causing the heart to beat too fast, too slow, or in an irregular pattern. While some forms of arrhythmia may be harmless, others can be serious and even life-threatening.

      Arrhythmia can be caused by a number of factors, including heart disease, high blood pressure, thyroid disorders, electrolyte imbalances, and certain medications. It can also occur in individuals with no underlying medical conditions. Symptoms of arrhythmia may include palpitations, chest pain or discomfort, shortness of breath, dizziness, fainting, and fatigue.
      For more serious cases of arrhythmia, treatment options may include medication to regulate the heart rate and rhythm, electrical cardioversion to shock the heart back into a normal rhythm, or ablation therapy to destroy the tissue causing the irregular heartbeat. In some cases, a pacemaker or implantable defibrillator may be necessary to regulate heart function.
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