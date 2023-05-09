<template>
<div >
    
    <div class="w-full mx-auto  my-6 bg-white rounded-lg text-box">
        <div class="primary-bg w-full h-8 rounded-t-lg"></div>
        <div class=" py-3 pb-12 px-6 my-3 w-11/12 mx-auto ">
            <h3 class="text-2xl text-slate-600 text-center font-bold mb-4">Ťahák</h3>

            <div class="pb-10 border-b-2">
                <h3 class="text-xl text-slate-600 font-bold mb-4">Binárna -> Decimálna</h3>

                <div class="pl-8">
                    <p class="text-lg py-5">
                        Ku každej cifre binárneho čísla zaznačíme pozíciu, začínajúc od pravej strany s 0.  Pre každú pozíciu, vypočítame hodnotu v desiatkovej sústave,  <span class='text-slate-600 font-bold'> násobiac cifru (0 alebo 1) hodnotou 2^(pozícia).</span> Súčet týchto hodnôt je hodnota v desiatkovej sústave. 
                    </p>

                    <img src="../img/cheatsheet-imgs/B-to-D-base.PNG" alt="btod base">

                    <p class="text-lg py-5">
                        Pre rýchle prevody z hlavy si uvedomme, že stačí <span class='text-slate-600 font-bold'> sčítať hodnoty cifier, ktoré majú hodnotu 1. </span> Tento postup nie je vhodný pre vyššie hodnoty čísel. 
                    </p>

                    <img src="../img/cheatsheet-imgs/B-to-D-example.PNG" alt="btod base">
                </div>

            </div>

            <div class="py-10 border-b-2">
                <h3 class="text-xl text-slate-600 font-bold mb-4">Binárna -> Hexadecimálna</h3>
                <div class="pl-8">
                    <p class="text-lg py-5">
                        Rozdeľ binárne číslo na <span class='text-slate-600 font-bold'> skupiny po štyroch čísliciach,</span> začínajúc od pravej strany. Ak je potrebné, dopln ľavú stranu nulami, aby si mal úplné skupiny štyroch číslic. Každú skupinu binárnych číslic, <span class='text-slate-600 font-bold'> preveď na ekvivalentnú šestnástkovú číslicu.</span> <span class='text-slate-600 font-bold'> Spoj šestnástkové číslice,</span> ktoré si získal, aby si vytvoril výsledné šestnástkové číslo.
                    </p>

                    <img src="../img/cheatsheet-imgs/B-to-H-base.PNG" alt="btod base">

                    <p class="text-lg py-5">
                        Prevod je pomerne jednoduchý a možno ho rýchlo vypočítať z hlavy. Stačí previesť každú skupinu štyroch binárnych číslic na číslo v desiatkovej sústave, čo sme vysvetlili vyššie. Potom už len podľa uvedenej tabuľky prevedieme desiatkové hodnoty na šestnástkové a spojíme ich.

                    </p>

                    <img src="../img/cheatsheet-imgs/B-to-H-example.PNG" alt="btod base">
                </div>
                

            </div>

            <div class="py-10 border-b-2">
                <h3 class="text-xl text-slate-600 font-bold mb-4">Hexadecimálna -> Binárna</h3>

                <div class="pl-8">
                    <p class="text-lg py-5">
                        Pre každú šestnástkovú číslicu, previeď ju na ekvivalentné binárne číslo (skupinu štyroch číslic)
                    </p>

                    <!--<img src="../img/cheatsheet-imgs/B-to-D-base.PNG" alt="btod base">-->

                    <p class="text-lg py-5">
                        wargawrgh

                    </p>

                    <img src="../img/cheatsheet-imgs/H-to-B-example.PNG" alt="btod base">
                </div>

            </div>
            
        </div>
    </div>
  </div>
  
</template>

<script>
export default {

}
</script>

<style>

</style>