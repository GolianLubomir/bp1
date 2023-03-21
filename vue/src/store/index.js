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
            scores:[],
            score:{
                mathReactions: {
                    best: 0,
                    percentil: 0,
                    all: [],
                    trainingTime: 0,
                },
                numberMemory: {
                    best: 0,
                    percentil: 0,
                    all: [],
                    trainingTime: 0,
                },
                mathMemory: {
                    best: 0,
                    percentil: 0,
                    all: [],
                    trainingTime: 0,
                },
                findTheSame: 0,
                graphs: 0,
                numberSystems: 0,
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
        /*silentAuth({ commit }) {
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
        }*/
        async fetchScores({ commit }) {
            const response = await axiosClient.get('/scores');
            commit('setScores', response.data);
          },
        async addScore({ commit }, score) {
            const response = await axiosClient.post('/scores', score);
            commit('addScore', response.data);
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
        setToken: (state, token) => {
            state.user.token = token;
            sessionStorage.setItem('TOKEN', token);
        },
        /*setReloadUser: (state, userData) => {
            //console.log('setting user', userData.name)
            state.user.data = userData;
            //state.user.data.email = userData.email;   
        },*/
        setScores: (state, scores) => {
            state.user.scores = scores.scores
            console.log(scores.scores)
        },
        addScore: (state, score) => {
            //state.user.scores.unshift(score)
            state.user.scores[score.game_name].all.push( {score:  score.score.score})
            //state.user.scores[score.game_name].best = Math.min(state.user.scores[score.game_name].all)
            console.log(state.user.scores[score.game_name])
            
            //.log(score.game_name)
            // OPRAVIT  
            console.log(score)
        },

    },
    modules:{},
    plugins: [createPersistedState()]

})

export default store;