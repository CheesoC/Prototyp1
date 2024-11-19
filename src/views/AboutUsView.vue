<script setup>
import ImpressumItem from '@/components/ImpressumItem.vue'
import NavbarItem from '@/components/NavbarItem.vue'
</script>

<template>
  <NavbarItem />
  <section class="bg-gray-100 py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-4xl font-bold text-center mb-6">ABOUT US</h1>
      <div class="text-lg text-gray-700">
        <p class="mb-4">
          Welcome to our educational platform, a place where you can enhance
          your algebra skills through interactive and engaging exercises. Our
          mission is to make learning algebra fun and accessible for everyone.
        </p>
        <h2 class="text-2xl font-semibold mt-6 mb-4">Our Team</h2>
        <p class="mb-4">
          Our team consists of passionate educators, developers, and designers
          who are dedicated to creating the best learning experience for our
          users. We believe that education should be enjoyable and effective,
          and we strive to achieve this through our innovative platform.
        </p>
        <h2 class="text-2xl font-semibold mt-6 mb-4">Our Goals</h2>
        <p class="mb-4">
          Our primary goal is to help students master algebra by providing a
          variety of exercises and challenges that cater to different learning
          styles. We aim to:
        </p>
        <ul class="list-disc list-inside mb-4">
          <li>Offer a wide range of algebra topics and exercises</li>
          <li>
            Provide instant feedback to help students learn from their mistakes
          </li>
          <li>Create a supportive and motivating learning environment</li>
          <li>Continuously improve our platform based on user feedback</li>
        </ul>
        <p class="mb-4">
          Thank you for choosing our platform to enhance your algebra skills. We
          are committed to helping you achieve your learning goals and look
          forward to supporting you on your educational journey.
        </p>
      </div>
    </div>
  </section>

  <ImpressumItem />
</template>
