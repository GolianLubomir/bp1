import {createStore} from "vuex";
import axiosClient from "../axios";
import createPersistedState from 'vuex-persistedstate'

const store = createStore({
    state: {
        user: {
            data:{
                name: 'asdf adfgrwg',
                email: 'asrg@agasg.com',
                //imageUrl: ,
                //  ' ',
            },
            score:{
                mathRe: 0,
                numberMe: 0,
                mathMe: 0,
                findSa: 0,
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
                console.log("token true")
                return axiosClient.post('/reload')
                .then(({ data }) => {
                  commit('setReloadUser', data.user);
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
            //console.log('setting user', userData.name)
            
            state.user.token = userData.token;
            state.user.data = userData;
            //state.user.data.email = userData.email;

            sessionStorage.setItem('TOKEN', userData.token);
        },
        setReloadUser: (state, userData) => {
            //console.log('setting user', userData.name)
            
            
            state.user.data = userData;
            //state.user.data.email = userData.email;

            
        },
        setToken: (state, token) => {
            state.user.token = token;
            sessionStorage.setItem('TOKEN', token);
          },
    },
    modules:{},
    plugins: [createPersistedState()]

})

export default store;