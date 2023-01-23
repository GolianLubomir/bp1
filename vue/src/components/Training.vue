<template>
    <div>
        <div class="w-full h-96 primary-bg text-center items-center">
            <div class="w-4/5 h-full mx-auto py-10 primary-bg"> 
                <router-view > </router-view>
            </div>


        </div>
        <div class="w-full flex absolute myzindex h-32 primary-bg">
            
        </div>

        <div class="w-full h-96 justify-around mx-auto py-4 ">

            <div class="w-4/5 h-64 px-6 py-6 mx-auto my-9 bg-slate-100 rounded-xl myBoxShadow"> 
                <router-view name="description"> </router-view>
            </div>

            <div class="w-4/5 h-48 px-6 py-6 mx-auto  my-12 bg-slate-100 rounded-xl myBoxShadow"> 
                <router-view name="stats"> </router-view>
            </div>
        
        </div>
    </div>
    
</template>

<script setup>
import PageComponent from "../components/PageComponent.vue"

</script>

<style>
/*.myzindex{
    z-index: -1;
}


.myBoxShadow{
    box-shadow: 3px -1px 20px rgba(0, 0, 0, 0.4);
  
}*/
</style>