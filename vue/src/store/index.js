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
            //scores:[],
            scores:{
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
                FindTheSame: {
                    best: 0,
                    percentil: 0,
                    all: [],
                    trainingTime: 0,
                },
                Graphs: {
                    best: 0,
                    percentil: 0,
                    all: [],
                    trainingTime: 0,
                },
                NumberSystems: {
                    best: 0,
                    percentil: 0,
                    all: [],
                    trainingTime: 0,
                },
            },

            activity:[],

            token: sessionStorage.getItem("TOKEN"),
        },
        game: {
            data: {
                description: {
                    MathReactions: {
                        about: "V tejto hre trénujeme rýchlosť, akou dokážeme spracovať a porozumieť matematickým informáciám. Vyššia rýchlosť spracovania umožňuje rýchlejšie a presnejšie riešenie matematických problémov. Takáto hra môže byť užitočná pre jednotlivcov, ktorí chcú zlepšiť svoju schopnosť rýchlo a efektívne spracovávať informácie. Hranie tejto hry môže pomôcť zlepšiť kognitívnu flexibilitu a pamäť, ktoré sú dôležité pre matematické schopnosti.",
                        instructions: "Tvojou úlohou je čo najrýchlejšie vyhodnotiť výraz a zvoliť true alebo false . Budeme merať tvoj priemerný reakčný čas pri vyhodnocovaní 10-tich roznych výrazov. Postupne sa bude zvyšovať obtiažnosť výrazov. V prípade každého nesprávneho vyhodnotenia sa pripočítava časová penalizácia 2 sekundy k výslednemu priemernému reakčnému času. Ak chceš svoje skóre uložiť, stlač tlačidlo <span class='text-slate-600 font-bold whitespace-nowrap'> 'Save score' </span>, inak sa skóre neuloží."
                    },
                    NumberMemory: {
                        about: "<span class='text-slate-600 font-bold'> Pracovná pamäť je schopnosť mozgu uchovávať a manipulovať s informáciami v krátkodobom pamäťovom systéme </span>. V prípade tejto hry, sa hráči snažia zapamätať si sekvenciu čísel a následne ju zopakovať. Takáto hra môže byť užitočná pre jednotlivcov, ktorí chcú zlepšiť svoju kratkodobú pamäť. Hra tiež navádza hráča v krátkom čase <span class='text-slate-600 font-bold'> hľadať v sekvencii čísel rôzne vzory a techniky </span> , pre ulahčenie zapamätávania. Zlepšenie pracovnej pamäte môže pomôcť zlepšiť kognitívnu flexibilitu a rýchlosť riešenia matematických úloh.",
                        instructions: "<span class='text-slate-600 font-bold'> Tvojou úlohou bude zapamätať si sekvenciu čísel a následne ju zapísať do poľa na obrazovke. </span> Vstupné poľe bude automaticky zamerané, následne použi klavesnicu na zadanie sekvencie čisel bez medzier. <br> <br> Na potvrdenie odpovede použi <span class='text-slate-600 font-bold'> 'Enter' </span> na klavesnici. Ak zadaná sekvencia bude nesprávna, hra končí a aplikacia ti zobrazí získané skóre. Ak chceš svoje skóre uložiť, stlač tlačidlo <span class='text-slate-600 font-bold whitespace-nowrap'> 'Save score' </span>, inak sa skóre neuloží."
                    },
                    MathMemory: {
                        about: "V porovnaní s predchádzajúcou hrou, Math Memory je komplikovanejšia a kladie <span class='text-slate-600 font-bold'> väčší dôraz na manipuláciu s jednoduchými matematickými výrazmi v krátkodobom pamäťovom systéme </span> . To znamená, že hráči sa spoliehajú hlavne na svoju pracovnú pamäť, aby si zapamätali výrazy a vypočítali ich výsledky, bez akýchkoľvek vizuálnych pomôcok. Hra tiež navádza hráča v krátkom čase <span class='text-slate-600 font-bold'> hľadať v sekvencii výrazov rôzne vzory a techniky</span>, pre ulahčenie zapamätávania. Hra kombinuje trénovanie rýchlosti spracovania a trénovanie pracovnej pamäte",
                        instructions: "V hre matematická pamäť je tvojou úlohou <span class='text-slate-600 font-bold'> zapamätať si sekvenciu výrazov a následne zapísať ich výsledky do polí na obrazovke</span>. Polia odporúčame vypĺnať postupne a pre rýchlejšiu prácu s rozhraním použite <span class='text-slate-600 font-bold'> 'Enter' / 'Tab' </span> na preklikavanie medzi poliami.  <br> <br> Po vyplnení všetkých polí použi <span class='text-slate-600 font-bold'> 'Enter' </span> na potvrdenie odpovede. Ak zadaná sekvencia bude nesprávna, hra končí a aplikacia ti zobrazí získané skóre. Ak chceš svoje skóre uložiť, stlač tlačidlo <span class='text-slate-600 font-bold whitespace-nowrap'> 'Save score' </span>, inak sa skóre neuloží."
                    },
                    FindTheSame: {
                        about: " Hra Find The Same je zameraná na <span class='text-slate-600 font-bold'> precvičovanie základných poznatkov z matematickej analýzy, ako sú limity, derivácie a integrály.</span>. V hre sa stretneš s rôznymi matematickými výrazmi, ktoré musíš porovnávať a hľadať ich zhody. Týmto spôsobom si osviežiš svoje vedomosti a zlepšíš svoju <span class='text-slate-600 font-bold'> rýchlosť a presnosť pri spracovaní matematických informácií</span>. Hra tiež využíva tvoju pracovnú pamäť, ktorú si mohol natrénovať v predchádzajúcich hrách. Hra Find The Same je teda ideálna pre všetkých, ktorí chcú zlepšiť svoje matematické schopnosti a zábavne si zopakovať učivo.",
                        instructions: "Cieľom hry Find The Same je <span class='text-slate-600 font-bold'> nájsť a označiť všetky dvojice matematických výrazov, ktoré sú si rovné</span>. Keď klikneš na pole, zmení sa jeho farba. Potom musíš nájsť druhé pole s ekvivalentným výrazom a kliknúť naň. Ak si našiel správnu dvojicu, obe polia zostanú označené. Ak si klikol na nesprávne pole, pôvodné pole sa odznačí. <br> <br> Hra sa končí, keď označíš všetky dvojice. <span class='text-slate-600 font-bold'> Tvoje skóre je čas, ktorý si potreboval na dokončenie hry</span>. Ak chceš svoje skóre uložiť, stlač tlačidlo <span class='text-slate-600 font-bold whitespace-nowrap'> 'Save score' </span>, inak sa skóre neuloží."
                    },
                    Graphs: {
                        about: "Táto hra umožňuje hráčovi <span class='text-slate-600 font-bold'> trénovať znalosti z matematických funkcií</span>. V hre si musíš vypočítať smer funkcie dosadzovaním hodnôt x-súradnice do funkcie a predstaviť si približný tvar a polohu funkcie. Týmto spôsobom si trénuješ svoju pracovnú pamäť, kognitívne funkcie a rýchlosť spracovania matematických informácií. <span class='text-slate-600 font-bold'> Ak si chceš osviežiť základné vzory na určovanie smeru a tvaru funkcií, môžeš použiť náš ťahák</span>. S dostatočným tréningom sa ti bude dariť odhadovať grafy aj bez výpočtov a intuitívne reagovať na zadanú funkciu. <br> <br> Hra ti poskytuje spätnú väzbu o tvojej presnosti a porovnáva tvoj graf so správnym riešením. <span class='text-slate-600 font-bold'> Presnosť tvojho grafu neovplyvňuje tvoje výsledné skóre</span>, dôležité je len to, či si nakreslil graf správne. ",
                        instructions: "Tvojou úlohou je <span class='text-slate-600 font-bold'> nakresliť graf funkcie </span>, ktorá je zadaná. Použi interaktívny kresliaci panel, <span class='text-slate-600 font-bold'> stlačním ľavého tlačidla myši a pohybom </span> sa snaž nakresliť čo najpresnejší graf. Graf musí mať odchylku menšiu ako 2 jednotky v 70% svojej dĺžky, aby bol považovaný za správny. Za každý správny graf získaš bod. Keď začneš tréning, môžeš hneď začať kresliť. <span class='text-slate-600 font-bold'> Kresli jedným ťahom a stredným tempom, aby sa graf dobre zaznamenal.</span> Po dokončení kresby sa ti ukáže správny graf a porovnanie s tvojím grafom. Pokračuj v hre kliknutím na tlačidlo <span class='text-slate-600 font-bold'> 'Next'</span>. V pravom hornom rohu vidíš svoje životy. Ak trikrát nakreslíš nesprávny graf, hra sa skončí a ukáže sa ti tvoje skóre. Ak chceš svoje skóre uložiť, stlač tlačidlo <span class='text-slate-600 font-bold whitespace-nowrap'> 'Save score' </span>, inak sa skóre neuloží."
                    },
                    NumberSystems: {
                        about: "Hra Number Systems je zameraná na <span class='text-slate-600 font-bold'> tréning znalostí z prevodov medzi číselnými sústavami</span>. Vzhľadom na koncept hry, prevádzame čísla len medzi týmito číselnými sústavami: <span class='text-slate-600 font-bold'> Binárna -> Decimálna, Binárna -> Hexadecimálna a Hexadecimálna -> Binárna. </span> Ak si chceš osviežiť základné vzory a pravidlá na prevody medzi sústavami, môžeš použiť náš <span class='text-slate-600 font-bold'>ťahák</span>. <br> <br> Týmto spôsobom si cvičíš svoju pracovnú pamäť, kognitívne funkcie a rýchlosť spracovania matematických informácií. Hra tiež stimuluje tvoje deduktívne a induktívne myslenie, keďže musíš použiť základné vzorce a pravidlá na prevody medzi číselnými sústavami. ",
                        instructions: "Cieľom tejto hry je <span class='text-slate-600 font-bold'> vykonať čo najviac prevodov medzi rôznymi číselnými sústavami </span> v časovom limite 2 minút. Na obrazovke sú vždy zobrazené tri možnosti prevodov a ty si môžeš vybrať jednu z nich. Nad každou možnosťou je uvedený typ prevodu. Binárne, decimálne a hexadecimálne čísla sú v tvare:  <br> <br>  <p class='text-center'> <span class='text-slate-600 font-bold  whitespace-nowrap'> BBBB BBBB, B = {0,1} </span>, <span class='text-slate-600 font-bold  whitespace-nowrap'> DD, D = {0,1,2,3,4,5,6,7,8,9}</span>,  <span class='text-slate-600 font-bold  whitespace-nowrap'> 0xHH, H = {0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F}.</span> </p>  <br>   Pri zápise binárnych čísel môžeš použiť alebo vynechať medzery a nuly na začiatku. Pri zápise hexadecimálnych čísel môžeš použiť alebo vynechať predponu '0x' a veľké alebo malé písmená.<span class='text-slate-600 font-bold'> Na potvrdenie tvojej odpovede použi klávesu 'Enter'. </span>Tvoje skóre zobrazuje počet správne vykonaných prevodov do konca hry. Ak chceš svoje skóre uložiť, stlač tlačidlo <span class='text-slate-600 font-bold whitespace-nowrap'> 'Save score' </span>, inak sa skóre neuloží."
                    },
                }
            },
            training: {
                findthesame:{},
                graphs:{},
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
        async fetchFindTheSameExpressions({ commit }) {
            const response = await axiosClient.get('/training/findthesame');
            commit('setFindTheSameExpressions', response.data);
        },
        async addSpentTime({ commit }, activityData) {
            const response = await axiosClient.post('/activity', activityData);
            commit('addSpentTime', response.data);
            console.log(response.data);
        },
        async getSpentTime({ commit }) {
            const response = await axiosClient.get('/activity');
            commit('setActivities', response.data);
            console.log(response.data);
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
        setFindTheSameExpressions: (state, expressions) => {
            state.game.training.findthesame = expressions.expressions
            console.log(expressions.expressions)
        },
        addSpentTime: (state, activityData) => {

            state.user.activity[activityData.game_name] = activityData.spentTime 

        },
        setActivities: (state, activityData) => {

            state.user.activity = activityData

        },

    },
    modules:{},
    plugins: [
        createPersistedState({
          reducer: (state) => ({
            user: state.user,
            
          }),
          expires: 12 * 60 * 60 * 1000, // 12 hour
        }),
    ],

})

export default store;