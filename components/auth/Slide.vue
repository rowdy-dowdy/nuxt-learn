<script setup lang="ts">
  import Swiper, { Pagination, Autoplay } from 'swiper';
  import 'swiper/css';
  import 'swiper/css/pagination';

  Swiper.use([Pagination,Autoplay]);

  var swiper = null
  const id_component = 'swiper' + Math.random().toString(16).slice(2)
  const ref_slide = ref<HTMLElement>(null)

  onMounted(() => {
    console.log(id_component)
    swiper = new Swiper('#' + id_component, {
      loop: true,

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      }
    });
  })

  onActivated(() => {
    console.log(1)
  })

  const list_slide = ref([
    {
      image       : '/assets/images/home_slide_1.png' ,
      title       : 'Change the quality of the life' ,
      description : 'Lorem ipsum dolor sit amet consec tetur adipisicing elit.'
    },
    {
      image       : '/assets/images/home_slide_2.png' ,
      title       : 'Change the quality of the life' ,
      description : 'Lorem ipsum dolor sit amet consec tetur adipisicing elit.'
    },
    {
      image       : '/assets/images/home_slide_3.png' ,
      title       : 'Change the quality of the life' ,
      description : 'Lorem ipsum dolor sit amet consec tetur adipisicing elit.'
    },
  ])
</script>

<template>
  <div class="w-full">
    <div ref="ref_slide" :id="id_component" class="swiper auth_slide">
      <div class="swiper-wrapper">
        <div
          v-for="(value, index) in list_slide" :key="index"
          class="swiper-slide">
          <div class="w-full max-w-sm mx-auto text-white px-6 py-8">
            <div class="relative w-full pb-[100%]">
              <div class="bg-full">
                <img :src="value.image" alt="" class="w-full h-full object-contain">
              </div>
            </div>
            <div class="px-12 text-center">
              <h3 class="text-2xl font-bold">{{ value.title }}</h3>
              <p class="mt-2 text-sm">{{ value.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="swiper-pagination !bottom-0"></div>
    </div>
  </div>
</template>

<style global>
.auth_slide .swiper-pagination-bullet {
  @apply mx-0.5 w-1.5 h-1.5 bg-white rounded-full transition-all duration-300;
}
.auth_slide .swiper-pagination-bullet.swiper-pagination-bullet-active {
  @apply w-4;
}
</style>