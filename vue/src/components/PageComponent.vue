<template>
  <div>
    <div class="w-full h-3/5 flex absolute myzindex primary-bg"></div>
    <div class="w-full pt-10">
      <div class="w-full max-w-5xl h-96 flex mx-auto md:w-4/5">
        <div class="w-full text-center h-96 mx-8 my-0 primary-bg">
          <div class="max-w-sm py-0 mx-auto sm:py-10">
            <h1 class="text-3xl my-4 text-white">
              Trénovanie intuitívnej matematiky
            </h1>
            <p class="text-lg pt-5 text-white">
              Precvičte si svoju schopnosť intuitívne riešiť matematické
              problémy pomocou kognitívnych hier. Zlepšite sa a porazte
              ostatných.
            </p>
            <router-link
              :to="'/training/mathreactions'"
              tag="button"
              class="inline-block bg-slate-100 hover:text-amber-600 text-gray-600 myButtonShadow font-bold my-12 py-3 px-8 rounded-full"
            >
              Začať
            </router-link>
          </div>
        </div>
        <div
          class="w-full h-96 flex items-center justify-center mx-8 my-0 primary-bg hidden sm:block"
        >
          <img
            class="my-10 mx-auto max-h-96 transition-all duration-1000 ease-in-out md:my-5 lg:my-0"
            src="../img/theme-bp-transparent.png"
            alt="img1"
          />
        </div>
      </div>
    </div>
    <div class="h-full mx-auto text-center my-bg py-10">
      <div
        class="grid grid-cols-1 gap-4 max-w-4xl my-7 mx-auto sm:w-11/12 sm:grid-cols-2 md:w-4/5 lg:grid-cols-3 lg:w-3/4"
      >
        <router-link
          :to="'/training/mathreactions'"
          tag="div"
          class="bg-white myBoxShadow w-4/5 max-w-xs h-48 text-black py-6 px-6 mx-auto my-2 rounded-lg lg:w-60"
        >
          <img
            src="../icon/math-reaction-icon.png"
            alt="bla"
            class="w-20 mx-auto"
          />
          <h1 class="text-lg text-sky-800 font-medium pt-2">
            Matematické Reakcie
          </h1>
        </router-link>
        <router-link
          :to="'/training/numbermemory'"
          tag="div"
          class="bg-white myBoxShadow w-4/5 max-w-xs h-48 text-black py-6 px-6 mx-auto my-2 rounded-lg lg:w-60"
        >
          <img
            src="../icon/number-memory-icon.png"
            alt="bla"
            class="w-20 mx-auto"
          />
          <h1 class="text-lg text-sky-800 font-medium pt-2">Číselná Pamäť</h1>
        </router-link>
        <router-link
          :to="'/training/mathmemory'"
          tag="div"
          class="bg-white myBoxShadow w-4/5 max-w-xs h-48 text-black py-6 px-6 mx-auto my-2 rounded-lg lg:w-60"
        >
          <img
            src="../icon/math-memory-icon.png"
            alt="bla"
            class="w-20 mx-auto"
          />
          <h1 class="text-lg text-sky-800 font-medium pt-2">
            Matematická Pamäť
          </h1>
        </router-link>
        <router-link
          :to="'/training/findthesame'"
          tag="div"
          class="bg-white myBoxShadow w-4/5 max-w-xs h-48 text-black py-6 px-6 mx-auto my-2 rounded-lg lg:w-60"
        >
          <img
            src="../icon/find-the-same-icon.png"
            alt="bla"
            class="w-20 mx-auto"
          />
          <h1 class="text-lg text-sky-800 font-medium pt-2">Nájdi rovnaké</h1>
        </router-link>
        <router-link
          :to="'/training/graphs'"
          tag="div"
          class="bg-white myBoxShadow w-4/5 max-w-xs h-48 text-black py-6 px-6 mx-auto my-2 rounded-lg lg:w-60"
        >
          <img src="../icon/graphs-icon.png" alt="bla" class="w-20 mx-auto" />
          <h1 class="text-lg text-sky-800 font-medium pt-2">Grafy</h1>
        </router-link>
        <router-link
          :to="'/training/numbersystems'"
          tag="div"
          class="bg-white myBoxShadow w-4/5 max-w-xs h-48 text-black py-6 px-6 mx-auto my-2 rounded-lg lg:w-60"
        >
          <img
            src="../icon/number-systems-icon.png"
            alt="bla"
            class="w-20 mx-auto"
          />
          <h1 class="text-lg text-sky-800 font-medium pt-2">Číselné sústavy</h1>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: "String",
});
</script>

<style>
.myzindex {
  z-index: -1;
}
.myzindex2 {
  z-index: -2;
}

.myBoxShadow {
  box-shadow: 3px -1px 20px rgba(0, 0, 0, 0.4);
  transition: all 0.5s;
}

.myBoxShadow:hover {
  box-shadow: 5px 5px 20px rgba(59, 59, 59, 0.6);
  transform: translate3d(0px, -5px, 0px);
}

.myButtonShadow {
  box-shadow: 2px -1px 10px rgba(0, 0, 0, 0.4);
  transition: all 0.5s;
}

.myButtonShadow:hover {
  box-shadow: 3px 3px 15px rgba(59, 59, 59, 0.6);
  transform: translate3d(0px, -5px, 0px);
}
</style>
