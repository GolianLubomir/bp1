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
                MathReactions: {
                    best: 0,
                    percentil: 0,
                    all: [],
                    trainingTime: 0,
                },
                NumberMemory: {
                    best: 0,
                    percentil: 0,
                    all: [],
                    trainingTime: 0,
                },
                MathMemory: {
                    best: 0,
                    percentil: 0,
                    all: [],
                    trainingTime: 0,
                },
                FindTheSame: 0,
                Graphs: 0,
                NSumberSystems: 0,
            },

            token: sessionStorage.getItem("TOKEN"),
        },
        game: {
            data: {
                description: {
                    MathReactions: "V trenujeme reakcie na matematicke výrazy. Tvojou úlohou je čo najrýchlejšie vyhodnotiť výraz a zvoliť true alebo false. Budeme merať tvoj priemerný reakčný čas pri vyhodnocovaní 5-tich roznych výrazov.",
                    NumberMemory: "Tvojou úlohou bude zapamätať si sekvenciu čísel a následne ju zapísať do poľa na obrazovke. Testujeme a trenujeme tvoju pamäť, ktorá je dôležitá pri intuitívnom riešení matematických úloh.",
                    MathMemory: "sdavav",
                    FindTheSame: "advadvadv",
                    Graphs: "Táto hra hráčovi umožňuje trénovať grafy matematických funkcií. Cieľom je nakresliť správny graf zadanej funkcie pomocou interaktívneho kresliaceho panelu a získať body. Hra má základné aj pokročilé funkcie. Cieľom je získať čo najviac bodov. Hra je vhodná pre študentov matematiky a pre všetkých, ktorí sa chcú zabaviť a zlepšiť svoje matematické zručnosti",
                    NumberSystems: "advadv",
                }
            },
            training: {
                graphs:{}
            }
        }

    },
    getters: {
        allExpressions: state => {
            const easyExpressions = Object.values(state.game.training.graphs.easy)  || [];
            const mediumExpressions = Object.values(state.game.training.graphs.medium)  || [];
            const hardExpressions = Object.values(state.game.training.graphs.hard) || [];
            console.log(mediumExpressions)
            return [...easyExpressions, ...mediumExpressions, ...hardExpressions];
        }
    },
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
            dispatch("fetchScores");
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
        },
        async fetchGraphsExpressions({ commit }) {
            const response = await axiosClient.get('/training/graphs');
            commit('setGraphsExpressions', response.data);
        },
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
        setGraphsExpressions: (state, expressions) => {
            state.game.training.graphs = expressions.expressions
            console.log(expressions.expressions)
        },

    },
    modules:{},
    plugins: [
        createPersistedState({
          reducer: (state) => ({
            user: state.user,
          }),
          expires: 12 * 60 * 60 * 1000, // 1 hour
        }),
    ],

})

export default store;