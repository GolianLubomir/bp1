import {createStore} from "vuex";
import axiosClient from "../axios";

const store = createStore({
    state: {
        user: {
            data:{
                name: 'Ľubomír Golian',
                email: 'lubogolian@example.com',
                //imageUrl: ,
                //  ' ',
              },
            token: sessionStorage.getItem("TOKEN"),
        },
        game: {
            data: {
                description: {
                    mathReactions: "V hre trenujeme reakcie na matematicke výrazy. Tvojou úlohou je čo najrýchlejšie vyhodnotiť výraz a zvoliť true alebo false. Budeme merať tvoj priemerný reakčný čas pri vyhodnocovaní 5-tich roznych výrazov.",
                    numberMemory: "Tvojou úlohou bude zapamätať si sekvenciu čísel a následne ju zapísať do poľa na obrazovke. Testujeme a trenujeme tvoju pamäť, ktorá je dôležitá pri intuitívnom riešení matematických úloh."
                }
            }
        }

    },
    getters: {},
    actions: {
        register({commit}, user) {
            return axiosClient.post('/register', user)
              .then(({data}) => {
                commit('setUser', data.user);
                commit('setToken', data.token)
                return data;
              })
        },

        login({commit}, user) {
        return axiosClient.post('/login', user)
            .then(({data}) => {
            commit('setUser', data.user);
            commit('setToken', data.token)
            return data;
            })
        },
        logout({commit}) {
            return axiosClient.post('/logout',)
            .then(response => {
                commit('logout')
                return response;
            })
        }
    },
    mutations: {
        logout: (state) => {
            state.user.token = null;
            state.user.data = {};
            
        },
        setUser: (state, userData) => {
            state.user.token = userData.token;
            state.user.data = userData.user;
            sessionStorage.setItem('TOKEN', userData.token);
        },
        setToken: (state, token) => {
            state.user.token = token;
            sessionStorage.setItem('TOKEN', token);
          },
    },
    modules:{}
})

export default store;