<template>
  <div class="min-h-screen">
    <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
      <div class="mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center">
            <router-link class="flex-shrink-0" :to="{ name: 'DefaultLayout' }">
              <h1
                class="text-white font-bold text-2xl text-teal-500 underline decoration-2"
              >
                MathTrainer
              </h1>
            </router-link>
            <div class="hidden lg:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <router-link
                  v-for="item in navigation"
                  :key="item.name"
                  :to="item.to"
                  active-class="bg-gray-900 text-white"
                  :class="[
                    this.$route.name === item.to.name
                      ? ''
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'px-3 py-2 rounded-md text-sm font-medium',
                  ]"
                  >{{ item.name }}</router-link
                >
              </div>
            </div>
          </div>
          <div class="hidden lg:block">
            <div v-if="!userToken" class="">
              <router-link
                :to="{ name: 'Login' }"
                active-class="bg-gray-900 text-white"
                :class="[
                  this.$route.name === 'Login'
                    ? ''
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'px-3 py-2 rounded-md text-sm font-medium',
                ]"
                >Prihlásiť sa
              </router-link>

              <router-link
                :to="{ name: 'Register' }"
                active-class="bg-gray-900 text-white"
                :class="[
                  this.$route.name === 'Register'
                    ? ''
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'px-3 py-2 rounded-md text-sm font-medium',
                ]"
                >Registrovať sa
              </router-link>
            </div>
            <div v-if="userToken" class="ml-4 flex items-center md:ml-6">
              <!-- Profile dropdown -->
              <Menu as="div" class="relative ml-3">
                <div class="flex text-end">
                  <div class="ml-3 py-4 px-2">
                    <div class="text-base font-medium leading-none text-white">
                      {{ user.name }}
                    </div>
                    <div class="text-sm font-medium leading-none text-gray-400">
                      {{ user.email }}
                    </div>
                  </div>
                  <MenuButton
                    class="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none"
                  >
                    <span class="sr-only">Open user menu</span>
                    <img
                      class="h-10 w-10 rounded-full"
                      src="../icon/user2.png"
                      alt=""
                    />
                  </MenuButton>
                </div>
                <transition
                  enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95"
                >
                  <MenuItems
                    class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white bg-gray-700 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <!--<MenuItem v-slot="{ active }">
                      <router-link
                        :to="{ name: 'Profile' }"
                        :class="[
                          'block px-4 py-2 text-md font-bold text-gray-300 bg-gray-800 cursor-pointer hover:text-gray-100',
                          { 'bg-gray-900 text-white': active },
                        ]"
                        >Tvoj Profil</router-link
                      >
                    </MenuItem>-->
                    <MenuItem v-slot="{ active }">
                      <a
                        @click="logout"
                        :class="[
                          'block px-4 py-2 text-md font-bold text-gray-300 bg-gray-800 cursor-pointer hover:text-gray-100',
                        ]"
                        >Odhlásiť sa</a
                      >
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
          </div>
          <div class="-mr-2 flex lg:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton
              class="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span class="sr-only">Open main menu</span>
              <Bars3Icon
                v-if="!open"
                class="block h-6 w-6"
                aria-hidden="true"
              />
              <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel class="lg:hidden">
        <div class="space-y-1 px-2 pt-2 pb-3 sm:px-3">
          <router-link
            v-for="item in navigation"
            :key="item.name"
            :to="item.to"
            active-class="bg-gray-900 text-white"
            :class="[
              this.$route.name === item.to.name
                ? ''
                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
              'block px-3 py-2 rounded-md text-base font-medium',
            ]"
            >{{ item.name }}</router-link
          >
        </div>
        <div v-if="!userToken">
          <div class="mt-3 space-y-1 px-2">
            <router-link
              :to="{ name: 'Login' }"
              class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white cursor-pointer"
            >
              Prihlásiť sa
            </router-link>

            <router-link
              :to="{ name: 'Register' }"
              class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white cursor-pointer"
            >
              Registrovať sa
            </router-link>

            >
          </div>
        </div>
        <div v-if="userToken" class="border-t border-gray-700 pt-4 pb-3">
          <div class="flex items-center px-5">
            <div class="flex-shrink-0">
              <img
                class="h-10 w-10 rounded-full"
                src="../icon/user2.png"
                alt=""
              />
            </div>
            <div class="ml-3">
              <div class="text-base font-medium leading-none text-white">
                {{ user.name }}
              </div>
              <div class="text-sm font-medium leading-none text-gray-400">
                {{ user.email }}
              </div>
            </div>
          </div>
          <div class="mt-3 space-y-1 px-2">
            <!--<router-link
              :to="{ name: 'Profile' }"
              class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white cursor-pointer"
            >
              Tvoj Profil
            </router-link>-->

            <DisclosureButton
              as="a"
              @click="logout"
              class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white cursor-pointer"
              >Odhlásiť sa</DisclosureButton
            >
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>

    <router-view> </router-view>

    <Footer />
  </div>
</template>

<script>
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import Footer from "../components/Footer.vue";

const navigation = [
  { name: "Matematické Hry", to: { name: "DefaultLayout" } },
  { name: "Intuitívna Matematika", to: { name: "About" } },
  { name: "Prehľad", to: { name: "Dashboard" } },
];
export default {
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Bars3Icon,
    BellIcon,
    XMarkIcon,
    Footer,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    function logout() {
      store.dispatch("logout").then(() => {
        router.push({
          name: "Login",
        });
      });
    }

    return {
      user: computed(() => store.state.user.data),
      userToken: computed(() => store.state.user.token),
      navigation,
      logout,
    };
  },
};
</script>

<style>
:root {
  --primary-color: rgb(13, 148, 136);
  --primary-color-hover: #0b8177;
}

.primary-bg {
  background-color: var(--primary-color);
}

.bla{
  min-height: 100vh;
}
</style>
