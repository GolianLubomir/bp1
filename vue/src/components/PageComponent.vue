<template>
  <div>
        <div class="w-full h-3/5 flex absolute myzindex primary-bg">

        </div>
        
        <div class="w-full pt-10  ">
            <div class="w-4/5 h-96 flex mx-auto">    
                <div class="w-full text-center h-96 mx-8 my-0 primary-bg">
                    <div class="max-w-sm py-10 mx-auto">
                        <h1 class="text-4xl my-4 text-white"> Trainer of Intuitive Math </h1>
                        <p class="text-xl pt-5 text-white"> Practice your ability to intuitively solve math problems with cognitive games. Improve yourself and beat your friends. </p>
                        
                        <router-link :to="'/training/mathreactions'" tag="button" class="inline-block bg-slate-100 hover:text-amber-600 text-gray-600 myButtonShadow font-bold my-12 py-3 px-4 rounded-full" >
                            Get Started
                        </router-link>
                    </div>
                </div>
                <div class="w-full h-96 flex items-center justify-center mx-8 my-0 primary-bg ">
                    <img class="h-96  mx-auto transition-all duration-1000 ease-in-out hover:h-80" src="../img/homepage-logo5.png" alt="img1"> 
                </div>
            </div>    
        </div>
        <!--<div class="w-full flex h-32 primary-bg absolute myzindex">
            
        </div>-->

        <div class="h-full mx-auto text-center py-10 "> 
            <div class="grid grid-cols-3 gap-4 w-3/4 max-w-4xl my-7 mx-auto ">
                <router-link :to="'/training/mathreactions'" tag="div" class="bg-white myBoxShadow w-60 h-48 text-black py-6 px-6 mx-auto my-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="0.5" stroke="currentColor" class="text-gray-600 w-24 h-24 mx-auto ">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                    </svg>
                    <h1 class="text-lg text-sky-800 font-medium">Math Reactions</h1>
                </router-link>
                <router-link :to="'/training/numbermemory'" tag="div" class="bg-white myBoxShadow w-60 h-48 text-black py-6 px-6 mx-auto my-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="0.5" stroke="currentColor" class="text-gray-600 w-24 h-24 mx-auto ">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
                    </svg>
                    <h1 class="text-lg text-sky-800 font-medium">Number Memory</h1>
                </router-link>
                <router-link :to="'/training/mathmemory'" tag="div" class="bg-white myBoxShadow w-60 h-48 text-black py-6 px-6 mx-auto my-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="0.5" stroke="currentColor" class="text-gray-600 w-24 h-24 mx-auto ">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
                    </svg>
                    <h1 class="text-lg text-sky-800 font-medium">Math Memory</h1>
                </router-link>
                <router-link :to="'/training/findthesame'" tag="div" class="bg-white myBoxShadow w-60 h-48 text-black py-6 px-6 mx-auto my-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="0.5" stroke="currentColor" class="text-gray-600 w-24 h-24 mx-auto ">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
                    </svg>
                    <h1 class="text-lg text-sky-800 font-medium">Find the Same</h1>
                </router-link>
                <router-link :to="'/training/graphs'" tag="div" class="bg-white myBoxShadow w-60 h-48 text-black py-6 px-6 mx-auto my-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="0.5" stroke="currentColor" class="text-gray-600 w-24 h-24 mx-auto ">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
                    </svg>
                    <h1 class="text-lg text-sky-800 font-medium">Game 5</h1>
                </router-link>
                <router-link :to="'/training/game'" tag="div" class="bg-white myBoxShadow w-60 h-48 text-black py-6 px-6 mx-auto my-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="0.5" stroke="currentColor" class="text-gray-600 w-24 h-24 mx-auto ">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
                    </svg>
                    <h1 class="text-lg text-sky-800 font-medium">Game 6</h1>
                </router-link>
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
.myzindex{
    z-index: -1;
}
.myzindex2{
    z-index: -2;
}

.myBoxShadow{
    box-shadow: 3px -1px 20px rgba(0, 0, 0, 0.4);
    transition: all 0.5s
}

.myBoxShadow:hover{
    box-shadow: 5px 5px 20px rgba(59, 59, 59, 0.6);
    transform: translate3d(0px,-5px,0px);
}

.myButtonShadow{
    box-shadow: 2px -1px 10px rgba(0, 0, 0, 0.4);
    transition: all 0.5s
}

.myButtonShadow:hover{
    box-shadow: 3px 3px 15px rgba(59, 59, 59, 0.6);
    transform: translate3d(0px,-5px,0px);
}
</style>