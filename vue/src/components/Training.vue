<template>
  <div>
    <div class="w-full h-3/5 flex absolute myzindex primary-bg"></div>

    <div class="w-full pt-0 text-center items-center">
      <div class="w-full pt-0 mx-auto primary-bg">
        <router-view> </router-view>
      </div>
    </div>
    <!--<div class="w-full flex absolute myzindex h-32 primary-bg">
            
        </div>-->

    <div class="w-full h-content justify-around mx-auto pb-10">
      <div
        class="w-4/5 px-6 py-6 mx-auto my-9 bg-white rounded-xl myBoxShadow2"
      >
        <router-view name="description"> </router-view>
      </div>

      <div
        class="w-4/5 px-6 py-6 mx-auto my-12 bg-white rounded-xl myBoxShadow2"
      >
        <router-view name="stats"> </router-view>
      </div>

      <div
        ref="cheatSheet"
        v-if="gameName == 'NumberSystems'"
        class="w-4/5 mx-auto my-12 bg-white rounded-xl myBoxShadow2"
      >
        <CheatSheetNumberSystems />
      </div>

      <div
        ref="cheatSheet"
        v-if="gameName == 'Graphs'"
        class="w-4/5 mx-auto my-12 bg-white rounded-xl myBoxShadow2"
      >
        <CheatSheetGraphs />
      </div>

      <div
        ref="cheatSheet"
        v-if="gameName == 'FindTheSame'"
        class="w-4/5 mx-auto my-12 bg-white rounded-xl myBoxShadow2"
      >
        <CheatSheetFindTheSame />
      </div>
    </div>

    <button
      v-if="gameName == 'Graphs' || gameName == 'FindTheSame' || gameName == 'NumberSystems'"
      ref="scrollButton"
      @click="scrollToCheatsheet"
      class="scroll-button"
      :style="{ opacity: showScrollButton ? 1 : 0 }"
    >
      
      <img src="../icon/cheat-sheet.png" alt="bla" class="w-20 mx-auto">
    </button>
  </div>
</template>

<script>
import PageComponent from "../components/PageComponent.vue";
import CheatSheetFindTheSame from "../components/CheatSheetFindTheSame.vue";
import CheatSheetGraphs from "../components/CheatSheetGraphs.vue";
import CheatSheetNumberSystems from "../components/CheatSheetNumberSystems.vue";
import { useRouter } from "vue-router";

export default {
  components: {
    CheatSheetFindTheSame,
    CheatSheetGraphs,
    CheatSheetNumberSystems,
  },

  setup() {},

  data() {
    return {
      showScrollButton: true,
      gameName: "",
    };
  },

  methods: {
    scrollToCheatsheet() {
      this.showScrollButton = false;
      this.$nextTick(() => {
        const element = this.$refs.cheatSheet;
        const top =
          element.getBoundingClientRect().top +
          window.pageYOffset -
          element.clientTop;
        window.scrollTo({ top: top, behavior: "smooth" });
      });
    },
  },

  mounted() {
    const router = useRouter();
    this.gameName = router.currentRoute.value.name;
    setTimeout(() => {
      this.showScrollButton = false;
    }, 8000);
  },
};
</script>

<style>
/*.myzindex{
    z-index: -1;
}
*/

.myBoxShadow2 {
  box-shadow: 3px -1px 15px rgba(0, 0, 0, 0.2);
}

@keyframes bounceUp {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-12px);
  }
}

.scroll-button {
  position: fixed;
  width: 100px;
  bottom: 20px;
  right: 20px;
  padding: 10px 15px;
  font-size: 16px;
  /*background-color: #76c1f4;*/
  color: rgb(10, 10, 10);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  animation: bounceUp 3s infinite;
  transition: opacity 1s;
}
</style>
