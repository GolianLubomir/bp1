<template>
  <div>
    <div class="w-full mx-auto my-6 bg-white rounded-lg text-box">
      <div class="primary-bg w-full h-8 rounded-t-lg"></div>
      <div class="py-3 pb-12 px-6 my-3 w-11/12 mx-auto">
        <h3 class="text-2xl text-slate-600 text-center font-bold mb-4">
          Ťahák
        </h3>

        <div class="pb-10 border-b-2">
          <h3 class="text-xl text-slate-600 font-bold mb-4">
            Binárna -> Decimálna
          </h3>

          <div class="pl-8">
            <p class="text-lg py-5">
              Pri prevode binárneho čísla na desiatkové si najprv všimneme
              pozície jednotlivých číslic, začínajúc od pravej strany s indexom
              0. Potom pre každú pozíciu vypočítame hodnotu v desiatkovej
              sústave nasledovne.
              <span class="text-slate-600 font-bold">
                Násobíme číslicu (0 alebo 1) hodnotou 2^(pozícia).</span
              >
              Nakoniec súčet týchto hodnôt predstavuje hodnotu čísla v
              desiatkovej sústave.
            </p>

            <img src="../img/cheatsheet-imgs/B-to-D-base.png" alt="btod base" />

            <p class="text-lg py-5">
              Ak chceme rýchlo previesť binárne číslo na desiatkové bez použitia
              papiera alebo kalkulačky, je potrebné si zapamätať hodnoty
              priradené ku každej pozícii. Potom sa môžeme sústrediť na sčítanie
              hodnôt len tých pozícií, kde sa nachádzajú jednotky (číslice 1).
              Tento postup je jednoduchší, ale môže byť zložitejší pri väčších
              číslach.
            </p>

            <img
              src="../img/cheatsheet-imgs/B-to-D-example.png"
              alt="btod base"
            />
          </div>
        </div>

        <div class="py-10 border-b-2">
          <h3 class="text-xl text-slate-600 font-bold mb-4">
            Binárna -> Hexadecimálna
          </h3>
          <div class="pl-8">
            <p class="text-lg py-5">
              Rozdeľ binárne číslo na
              <span class="text-slate-600 font-bold">
                skupiny po štyroch čísliciach,</span
              >
              začínajúc od pravej strany. Ak je potrebné, doplň ľavú stranu
              nulami, aby si mal úplné skupiny štyroch číslic. Každú skupinu
              binárnych číslic,
              <span class="text-slate-600 font-bold">
                preveď na ekvivalentný šestnástkový znak.</span
              >
              <span class="text-slate-600 font-bold">
                Spoj šestnástkové znaky,</span
              >
              ktoré si získal, aby si vytvoril výsledné šestnástkové číslo.
            </p>

            <img src="../img/cheatsheet-imgs/B-to-H-base.png" alt="btod base" />

            <p class="text-lg py-5">
              Prevod je pomerne jednoduchý a možno ho rýchlo vypočítať bez
              použitia papiera alebo kalkulačky. Stačí previesť každú skupinu
              štyroch binárnych číslic na číslo v desiatkovej sústave, čo sme
              vysvetlili vyššie. Potom už len podľa uvedenej tabuľky prevedieme
              desiatkové hodnoty na šestnástkové a spojíme ich.
            </p>

            <img
              src="../img/cheatsheet-imgs/B-to-H-example.png"
              alt="btod base"
            />
          </div>
        </div>
        <div class="py-10 border-b-2">
          <h3 class="text-xl text-slate-600 font-bold mb-4">
            Hexadecimálna -> Binárna
          </h3>

          <div class="pl-8">
            <p class="text-lg py-5">
              V tomto prípade vykonávame opačnú operáciu ako v predchádzajúcom
              príklade. Každý šestnástkový znak prevedieme na ekvivalentné
              binárne číslo (skupinu štyroch číslic). Pre každú skupinu
              priradíme jednotky tak, aby súčet hodnôt pozícií predstavoval daný
              hexadecimálny znak, a na zvyšné pozície doplníme nuly. Potom už
              iba spojíme skupiny binárnych čísel.
            </p>

            <img
              src="../img/cheatsheet-imgs/H-to-B-example.png"
              alt="btod base"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
