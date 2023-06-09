<template>
  <div>
    <div class="w-full mx-auto my-6 bg-white rounded-lg text-box">
      <div class="primary-bg w-full h-8 rounded-t-lg"></div>
      <div class="py-3 px-6 my-3 w-11/12 mx-auto border-b-2">
        <h3 class="text-2xl text-slate-600 text-center font-bold mb-4">
          Ťahák
        </h3>
        <p class="pb-6 text-center">V nasledujúcich príkladoch predpokladáme, že <span class="text-slate-600 font-bold"> definičný obor funkcie 'f' zahŕňa všetky reálne čísla</span>, čo značíme ako <span class="text-slate-600 font-bold"> D(f) = R </span>. Je dôležité si však uvedomiť, že niektoré <span class="text-slate-600 font-bold"> funkcie môžu mať iný definičný obor a pravidlá uvedené nižšie nebudú platiť mimo tohto oboru</span>.</p>
        
        <div class="pb-10 border-b-2">
          
          <h3 class="text-xl text-slate-600 font-bold mb-4">
            Vertikálny posun
          </h3>

          <div class="pl-8">
            <p class="text-lg py-5">
              <span class="text-slate-600 font-bold"
                >Ak k funkcií f(x) pridáš konštantu, výsledný graf sa posunie
                vertikálne.</span
              >
              Ak máš funkciu
              <span class="text-slate-600 font-bold">f(x) + k </span>, graf sa
              posunie o
              <span class="text-slate-600 font-bold">k </span> jednotiek smerom
              <span class="text-slate-600 font-bold">
                hore (pre k &gt; 0)
              </span>
              alebo
              <span class="text-slate-600 font-bold">
                dole (pre k &lt; 0).
              </span>
              Napríklad, ak máš funkciu
              <span class="text-slate-600 font-bold">x^2 </span> a zmeníš ju na
              <span class="text-slate-600 font-bold">x^2 + 4 </span>, celý graf
              sa posunie o 4 jednotky hore.
            </p>

            <img
              src="../img/cheatsheet-imgs/vertical-movement.png"
              width="300"
              alt="graph-vertical-movement"
              class="w-content m-auto"
            />
          </div>
        </div>

        <div class="pb-10 border-b-2">
          <h3 class="text-xl text-slate-600 font-bold mb-4">
            Horizontálny posun
          </h3>

          <div class="pl-8">
            <p class="text-lg py-5">
              <span class="text-slate-600 font-bold"
                >Ak k x pridáš alebo odčítaš konštantu pred aplikáciou funkcie,
                výsledný graf sa posunie horizontálne.</span
              >
              Ak máš funkciu
              <span class="text-slate-600 font-bold">f(x + k) </span>, graf sa
              posunie o k jednotiek
              <span class="text-slate-600 font-bold"
                >vľavo (pre k &gt; 0)
              </span>
              alebo
              <span class="text-slate-600 font-bold">
                vpravo (pre k &lt; 0).
              </span>
              Napríklad, funkcia
              <span class="text-slate-600 font-bold">(x + 4)^2 </span> sa
              posunie 4 jednotky doľava.
            </p>

            <img
              src="../img/cheatsheet-imgs/horizontal-movement.png"
              width="300"
              alt="graph-vertical-movement"
              class="w-content m-auto"
            />
          </div>
        </div>

        <div class="pb-10 border-b-2">
          <h3 class="text-xl text-slate-600 font-bold mb-4">
            Vertikálne škálovanie
          </h3>

          <div class="pl-8">
            <p class="text-lg py-5">
              Ak funkciu f(x) vynásobíš konštantou, graf sa rozšíri alebo zúži
              vertikálne.
              <span class="text-slate-600 font-bold">
                Ak máš funkciu kf(x), kde k &gt; 1, graf sa zúži; ak 0 &lt; k
                &lt; 1, graf sa rozšíri.</span
              >
              Ak je k &lt; 0, graf sa otočí okolo x-osi a potom sa škáluje.
            </p>

            <img
              src="../img/cheatsheet-imgs/vertical-scaling.png"
              width="300"
              alt="graph-vertical-movement"
              class="w-content m-auto"
            />
          </div>
        </div>

        <div class="pb-10 border-b-2">
          <h3 class="text-xl text-slate-600 font-bold mb-4">
            Horizontálne škálovanie
          </h3>

          <div class="pl-8">
            <p class="text-lg py-5">
              Ak násobiš x konštantou pred aplikáciou funkcie, graf sa rozšíri
              alebo zúži horizontálne.
              <span class="text-slate-600 font-bold">
                Ak máš funkciu f(kx), kde k &gt; 1, graf sa rozšíri; ak 0 &lt; k
                &lt; 1, graf sa zúži.</span
              >
            </p>

            <img
              src="../img/cheatsheet-imgs/horizontal-scaling.png"
              width="300"
              alt="graph-vertical-movement"
              class="w-content m-auto"
            />
          </div>
        </div>

        <div class="pb-10 border-b-2">
          <h3 class="text-xl text-slate-600 font-bold mb-4">
            Reflexia okolo y-osi
          </h3>

          <div class="pl-8">
            <p class="text-lg py-5">
              <span class="text-slate-600 font-bold"
                >Ak zmeníš znamienko x pred aplikáciou funkcie, graf bude symetricky združený
                okolo y-osi.</span
              >
              Teda, funkcia
              <span class="text-slate-600 font-bold">f(-x)</span> je zrkadlovým
              odrazom funkcie
              <span class="text-slate-600 font-bold">f(x)</span> okolo y-osi.
            </p>

            <img
              src="../img/cheatsheet-imgs/vertical-reflection.png"
              width="300"
              alt="graph-vertical-movement"
              class="w-content m-auto"
            />
          </div>
        </div>

        <div class="pb-10 border-b-2">
          <h3 class="text-xl text-slate-600 font-bold mb-4">
            Reflexia okolo x-osi
          </h3>

          <div class="pl-8">
            <p class="text-lg py-5">
              <span class="text-slate-600 font-bold"
                >Ak zmeníš znamienko celej funkcie, graf bude symetricky združený okolo
                x-osi.</span
              >
              Teda, <span class="text-slate-600 font-bold">-f(x)</span> je
              zrkadlovým odrazom funkcie
              <span class="text-slate-600 font-bold">f(x) </span>okolo x-osi.
            </p>

            <img
              src="../img/cheatsheet-imgs/horizontal-reflection.png"
              width="300"
              alt="graph-vertical-movement"
              class="w-content m-auto"
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
