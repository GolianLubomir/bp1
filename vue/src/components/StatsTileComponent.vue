<template>
  <div class="px-6 py-1 text-center">
    <h1  class="text-2xl font-bold text-slate-600 mb-2 border-b-2"> {{title}} </h1>
    <div class="py-6 mx-auto w-36 h-36 my-border border-green-500 rounded-full text-center">
        <p class="text-3xl text-slate-600 py-4">
           {{percent}}%
        </p>
    </div>
    <p  class="text-lg py-3"> Score: <span class="text-2xl">{{points}}</span>  points </p>
    <router-link :to="{name: 'MathReactions'}" tag="a" class="text-lg font-bold underline decoration-2 text-sky-500"> Play </router-link>
  </div>
  
</template>

<script setup>
import {useRouter} from "vue-router"
const props = defineProps({
    title: "String",
    percent: "String",
    points: "String",


})
</script>

<style>
.my-border{
    border-width: 12px;
}
</style>