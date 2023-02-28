import {createStore} from "vuex";
import axiosClient from "../axios";

const store = createStore({
    state: {
        user: {
            data:{
                name: 'asdf adfgrwg',
                email: 'asrg@agasg.com',
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
        },
        silentAuth({ commit }) {
            const token = sessionStorage.getItem('TOKEN');
            if (token) {
              axiosClient.post('/login')
                .then(({ data }) => {
                  commit('setUser', data.user);
                })
                .catch(error => {
                  console.error('Silent auth error:', error);
                });
            }
        }
    },
    mutations: {
        logout: (state) => {
            state.user.token = null;
            state.user.data = {};
            //sessionStorage.clear();
        },
        setUser: (state, userData) => {
            console.log('setting user', userData.name)
            state.user.token = userData.token;
            state.user.data = userData;
            //state.user.data.email = userData.email;

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