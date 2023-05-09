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

            <div class="w-4/5   px-6 py-6 mx-auto my-9 bg-white rounded-xl myBoxShadow2"> 
                <router-view name="description"> </router-view>
            </div>

            <div class="w-4/5   px-6 py-6 mx-auto  my-12 bg-white rounded-xl myBoxShadow2"> 
                <router-view name="stats"> </router-view>
            </div>


            <div v-if="gameName == 'NumberSystems'" class="w-4/5 mx-auto my-12 bg-white rounded-xl myBoxShadow2"> 
                <CheatSheetNumberSystems />
            </div>

            <div v-if="gameName == 'Graphs'" class="w-4/5 mx-auto  my-12 bg-white rounded-xl myBoxShadow2"> 
                <CheatSheetGraphs />
            </div>

            <div v-if="gameName == 'FindTheSame'" class="w-4/5 mx-auto  my-12 bg-white rounded-xl myBoxShadow2"> 
                <CheatSheetFindTheSame />
            </div>
        
        </div>
        
        
    </div>
    
</template>

<script >
import PageComponent from "../components/PageComponent.vue"
import CheatSheetFindTheSame from "../components/CheatSheetFindTheSame.vue"
import CheatSheetGraphs from "../components/CheatSheetGraphs.vue"
import CheatSheetNumberSystems from "../components/CheatSheetNumberSystems.vue"
import { useRouter } from "vue-router";

export default {
    components:{
        CheatSheetFindTheSame,
        CheatSheetGraphs,
        CheatSheetNumberSystems

    },

    setup(){




    },

    data(){
        return{
            gameName: '',
        }
    },

    mounted(){
        const router = useRouter();
        this.gameName = router.currentRoute.value.name;
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