<template>
    <PageComponent> </PageComponent>
</template>

<script setup>
import PageComponent from "../components/PageComponent.vue"
import store from "../store"
import { onMounted } from 'vue';

 onMounted(() => {
      //store.dispatch('fetchFindTheSameExpressions'); 
      console.log("mounted home");

});


</script>

<style>

</style>