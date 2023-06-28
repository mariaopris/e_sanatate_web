<template>
  <div class="container justify-center items-center mx-auto mt-10">
    <h2 class="text-3xl tracking-tight font-extrabold text-blue-700 text-center mb-12">
      <span class="block">Diseases detected by the AI Stethoscope</span>
    </h2>

    <div class="flex justify-between">
      <div class="card w-96 glass">
        <figure><img src="../../../public/bpoc_image.jpg" alt="BPOC image"/></figure>
        <div class="card-body">
          <h2 class="card-title">BPOC</h2>
          <p>BPOC, also known as COPD, is a progressive lung disease...</p>
          <div class="card-actions justify-end">
            <RouterLink to="COPD"><button class="btn btn-primary">Learn more</button></RouterLink>
          </div>
        </div>
      </div>

      <div class="card w-96 glass">
        <figure><img src="../../../public/asthma_image2.jpg" alt="Asthma image" class="mb-10"/></figure>
        <div class="card-body">
          <h2 class="card-title">Asthma</h2>
          <p>Asthma is a chronic lung disease that causes inflammation and narrowing of the airways...</p>
          <div class="card-actions justify-end">
            <RouterLink to="asthma"><button class="btn btn-primary">Learn more</button></RouterLink>
          </div>
        </div>
      </div>

      <div class="card w-96 glass">
        <figure><img src="../../../public/pneumonia_image.jfif" alt="Pneumonia image"/></figure>
        <div class="card-body">
          <h2 class="card-title">Pneumonia</h2>
          <p>Pneumonia is an infection of the lungs that causes inflammation in the lung tissue...</p>
          <div class="card-actions justify-end">
            <RouterLink to="pneumonia"><button class="btn btn-primary">Learn more</button></RouterLink>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-between mt-12 mb-20">
      <div class="card w-96 glass">
        <figure><img src="../../../public/heart_failure_image.webp" alt="Heart Failure image" class="mb-12"/></figure>
        <div class="card-body">
          <h2 class="card-title">Heart Failure</h2>
          <p>Heart failure is a condition in which the heart is unable to pump enough blood to meet the body's needs...</p>
          <div class="card-actions justify-end">
            <RouterLink to="heart-failure"><button class="btn btn-primary">Learn more</button></RouterLink>
          </div>
        </div>
      </div>

      <div class="card w-96 glass">
        <figure><img src="../../../public/heart_murmur_image.png" alt="Heart Murmur image" class="mb-12"/></figure>
        <div class="card-body">
          <h2 class="card-title">Heart Murmur</h2>
          <p>A heart murmur is an abnormal sound heard during a heartbeat, caused by turbulent blood flow through the heart's...</p>
          <div class="card-actions justify-end">
            <RouterLink to="heart-murmur"><button class="btn btn-primary">Learn more</button></RouterLink>
          </div>
        </div>
      </div>

      <div class="card w-96 glass">
        <figure><img src="../../../public/heart_arrythmia_image.webp" alt="Heart Arrhythmia image" class="mb-12"/></figure>
        <div class="card-body">
          <h2 class="card-title">Heart Arrhythmia</h2>
          <p>Arrhythmia is a condition in which the heart beats too fast, too slow, or in an irregular rhythm....</p>
          <div class="card-actions justify-end">
            <RouterLink to="heart-arrhythmia"><button class="btn btn-primary">Learn more</button></RouterLink>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>

</script>