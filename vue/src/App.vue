<script setup>
import { ref, onMounted } from 'vue'
import store from './store'
//import { onCreated, ref } from 'vue'
    //import HelloWorld from './components/HelloWorld.vue'
    /*import { mapActions, mapState } from 'vuex';


    export default {
      name: 'ProtectedPage',
      computed: {
        ...mapState(['user'])
      },
      created() {
        console.log("blblalla")
        this.silentAuth();
      },
      methods: {
        ...mapActions(['silentAuth'])
      }
    };*/

  

    

    /*    onMounted(() => {
          store.dispatch('silentAuth');
    })*/

    

  
</script>

<template>
  <router-view> </router-view>
</template>

<style>

</style>
