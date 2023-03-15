<template>
    <div class="  py-6 px-6" >
        <div class="h-56 max-w-screen-xl mx-auto border-2 border-gray-200 bg-slate-100 rounded-lg px-3 py-3">
            <DashboardHeader> </DashboardHeader>
        </div>
        <div class="my-6 flex mx-auto max-w-screen-xl ">
            <div class="w-32 h-fit mr-6 border-2 border-gray-200 bg-slate-100 rounded-lg hidden sm:block">
                <div class="mx-4 my-4 w-24 h-24 rounded-lg bg-white">
                    <router-link :to="'/training/mathreactions'" tag="a" >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="0.5" stroke="currentColor" class="text-cyan-500 w-18 h-24 mx-auto ">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                        </svg> 
                    </router-link>
                </div>
                <div class="mx-4 my-4 w-24 h-24 rounded-lg  bg-white"> <router-link :to="'/training/numbermemory'" tag="a" > <Icon class="text-cyan-500"> </Icon> </router-link></div>
                <div class="mx-4 my-4 w-24 h-24 rounded-lg  bg-white"> <router-link :to="'/training/mathmemory'" tag="a" > <Icon class="text-cyan-500"> </Icon> </router-link></div>
                <div class="mx-4 my-4 w-24 h-24 rounded-lg  bg-white"> <router-link :to="'/training/findthesame'" tag="a" > <Icon class="text-cyan-500"> </Icon> </router-link></div>
                <div class="mx-4 my-4 w-24 h-24 rounded-lg  bg-white"> <router-link :to="'/training/graphs'" tag="a" > <Icon class="text-cyan-500"> </Icon> </router-link></div>
                <div class="mx-4 my-4 w-24 h-24 rounded-lg  bg-white"> <router-link :to="'/training/game'" tag="a" > <Icon class="text-cyan-500"> </Icon> </router-link></div>
            </div>
            <div class="w-full">
                <div class="ml-0 bg-slate-100 border-2 border-gray-200 flex rounded-lg">
                    <div class=" grid grid-cols-1 gap-0 w-9/10 mx-auto md:grid-cols-2 lg:grid-cols-3 ">
                        <div class="mx-4 my-4 w-content h-80 rounded-lg tile-shadow bg-white"> <router-link :to="'/training/numbermemory'">  <StatsTileComponent title="Math Reactions" linkTo="MathReactions" percent="88" points="12.3" :seriesprops=[10]> </StatsTileComponent> </router-link> </div> 
                        <div class="mx-4 my-4 w-content h-80 rounded-lg tile-shadow bg-white"> <StatsTileComponent title="Number Memory" linkTo="NumberMemory" percent="75" points="7" :seriesprops=[65]> </StatsTileComponent> </div>
                        <div class="mx-4 my-4 w-content h-80 rounded-lg tile-shadow bg-white"> <StatsTileComponent title="Math Memory" linkTo="MathMemory" percent="23" points="11" :seriesprops=[85]> </StatsTileComponent> </div>
                        <div class="mx-4 my-4 w-content h-80 rounded-lg tile-shadow bg-white"> <StatsTileComponent title="Find the Same" linkTo="FindTheSame" percent="45" points="14.5" :seriesprops=[22]> </StatsTileComponent> </div>
                        <div class="mx-4 my-4 w-content h-80 rounded-lg tile-shadow bg-white"> <StatsTileComponent title="Game 5" linkTo="Graphs" percent="13" points="35" :seriesprops=[15]> </StatsTileComponent> </div>
                        <div class="mx-4 my-4 w-content h-80 rounded-lg tile-shadow bg-white"> <StatsTileComponent title="Game 6" linkTo="Game" percent="93" points="4" :seriesprops=[20]> </StatsTileComponent> </div>
                    </div>
                    
                </div>
                <div class="w-full h-96 my-6 border-2 border-gray-200 bg-slate-100 rounded-lg">
                    <div>
                        <TimerBar :time="5" :widthprops="'50px'"> </TimerBar>
                    </div>
                </div>
            </div>
            
        </div>
        
    </div>
</template>

<script setup>
import PageComponent from "../components/PageComponent.vue"
import StatsTileComponent from "../components/StatsTileComponent.vue"
import DashboardHeader from "../components/DashboardHeader.vue"
import Icon from "../components/Icon.vue"
import TimerBar from "../components/TimerBar.vue"


</script>

<style>
.tile-shadow{
    box-shadow: 6px -3px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.5s;
}

.tile-shadow:hover{
    box-shadow: 3px 3px 20px rgba(59, 59, 59, 0.3);
    transform: translate3d(0px,-5px,0px);
}

</style>