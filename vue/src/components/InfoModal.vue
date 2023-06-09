<template>
  <div class="modal" v-if="isOpen">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2 class="text-xl pb-4">Sledovanie aktivity</h2>
      <p>Aktivita sa v rôznych hrách monitoruje odlišne a každá hra vyžaduje iný čas na dosiahnutie cieľa. <span class="text-slate-600 font-bold"> Vašou úlohou je dosiahnuť stanovený cieľ v priebehu 7 dní a potom udržiavať tieto úrovne </span>, čo sa odráža na vyplnení grafov. Systém sledovania aktivity je navrhnutý tak, aby užívateľovi umožnil rozložiť svoju aktivitu na viac dní, alebo, ak preferuje, môže dosiahnuť cieľ v priebehu jediného dňa.</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['isOpen'],
  methods: {
    closeModal() {
      this.$emit('close');
    }
  }
}
</script>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 60%;
  border-radius: 10px;
}

.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style>
