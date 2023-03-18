<template>
    <div>
        <div class="w-full h-3/5 flex absolute myzindex primary-bg">

        </div>

        <div class="w-full pt-0 text-center items-center">
            <div class="w-full  pt-0 mx-auto  primary-bg"> 
                <router-view > </router-view>
            </div>


        </div>
        <!--<div class="w-full flex absolute myzindex h-32 primary-bg">
            
        </div>-->

        <div class="w-full h-content justify-around mx-auto pb-10 ">

            <div class="w-4/5 max-w-5xl h-64 px-6 py-6 mx-auto my-9 bg-white rounded-xl myBoxShadow2"> 
                <router-view name="description"> </router-view>
            </div>

            <div class="w-4/5 max-w-5xl h-48 px-6 py-6 mx-auto  my-12 bg-white rounded-xl myBoxShadow2"> 
                <router-view name="stats"> </router-view>
            </div>
        
        </div>
        
        
    </div>
    
</template>

<script >
import PageComponent from "../components/PageComponent.vue"

export default {
    setup(){




    }
}
</script>

<style>
/*.myzindex{
    z-index: -1;
}
*/

.myBoxShadow2{
    box-shadow: 3px -1px 15px rgba(0, 0, 0, 0.2);
  
}
</style>