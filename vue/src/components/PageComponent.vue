<template>
  <div>
        <div class="w-full flex h-96 bg-sky-200 ">
            <div class="w-full text-center h-content mx-8 my-8 bg-sky-400">
                <h1 class="text-4xl my-4 text-white"> Trainer of Intuitive Math </h1>
                <p class="text-xl pt-5 text-white"> Practice your ability to intuitively solve math problems with cognitive games. Improve yourself and beat your friends. </p>
                <button class="bg-indigo-600 hover:bg-indigo-500 text-white font-bold my-12 py-2 px-4 rounded-full">
                    Get Started
                </button>
            </div>
            <div class="w-full h-content justify-center mx-8 my-8 bg-sky-400">
                <img class="h-full mx-auto" src="../img/Math-Brain-Booster-Logo.jpg" alt="img1"> 
            </div>
            
        </div>
        <div class="h-full mx-auto bg-sky-300 text-center py-10"> 
            <div class="grid grid-cols-3 gap-4 w-3/4 mx-auto">
                <div class="bg-gradient-to-r from-green-400 to-blue-500 hover:bg-slate-300 text-black py-14 px-6 mx-2 my-2 rounded-lg">01</div>
                <div class="bg-gradient-to-r from-green-400 to-blue-500 text-black py-14 px-6 mx-2 my-2 rounded-lg">01</div>
                <div class="bg-gradient-to-r from-green-400 to-blue-500 text-black py-14 px-6 mx-2 my-2 rounded-lg">01</div>
                <div class="bg-gradient-to-r from-green-400 to-blue-500 text-black py-14 px-6 mx-2 my-2 rounded-lg">01</div>
                <div class="bg-gradient-to-r from-green-400 to-blue-500 text-black py-14 px-6 mx-2 my-2 rounded-lg">01</div>
                <div class="bg-gradient-to-r from-green-400 to-blue-500 text-black py-14 px-6 mx-2 my-2 rounded-lg">01</div>
            </div>
        </div>


    </div>
</template>

<script setup>
const props = defineProps({
    title: "String"
})


</script>

<style>

</style>