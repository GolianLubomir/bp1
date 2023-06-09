<template>
  <div class="h-80 w-80 p-3 py-12">
    <div v-if="!showResult">
      <h2 class="text-white text-lg bg-teal-700 w-4/5 mx-auto rounded-md">
        {{ conversionSys }}
      </h2>
      <p class="text-white text-3xl py-10">{{ numberFrom }}</p>
      <input
        v-model="userAnswer"
        autofocus="true"
        @keyup.enter="checkAnswer"
        placeholder=""
        class="bg-teal-500 border-2 rounded-md text-center text-2xl text-white h-12 w-72 pb-1 focus:border-slate-600 focus:ring-slate-600"
      />
    </div>
    <div v-if="showResult">
      <p class="text-white text-3xl p-16">{{ result }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      numberFrom: "",
      numberTo: "",
      answer: "",
      result: "",
      score: 0,
      conversionSys: "",
      showResult: false,
      conversions: [
        { valueFrom: 2, valueTo: 16, label: "Binary -> Hexadecimal" },
        { valueFrom: 2, valueTo: 10, label: "Binary -> Decimal" },
        { valueFrom: 16, valueTo: 2, label: "Hexadecimal -> Binary" },
      ],
      currentConversion: {},
    };
  },

  created() {
    this.setConversion();
    this.generateNumber();
  },
  methods: {
    generateNumber() {
      const randomNumber = Math.floor(Math.random() * 251) + 5;

      this.numberFrom = this.convertNumber(
        randomNumber,
        this.currentConversion.valueFrom,
        true
      );
      this.numberTo = this.convertNumber(
        randomNumber,
        this.currentConversion.valueTo,
        false
      );
      this.resetState();
    },

    setConversion() {
      this.currentConversion =
        this.conversions[Math.floor(Math.random() * this.conversions.length)];
      this.conversionSys = this.currentConversion.label;
    },

    checkAnswer() {
      let userAnswer =
        this.currentConversion.valueTo === 16 &&
        (this.userAnswer.startsWith("0x") || this.userAnswer.startsWith("0X"))
          ? this.userAnswer.substring(2).toUpperCase().padStart(2, "0")
          : this.userAnswer
              .toUpperCase()
              .padStart(this.currentConversion.valueTo == 2 ? 8 : 2, "0");
      if (userAnswer === this.numberTo) {
        this.handleCorrectAnswer();
      } else {
        this.handleIncorrectAnswer();
      }
    },

    convertNumber(number, base, isFrom) {
      let numberString = "";
      if (base === 2) {
        numberString = number.toString(base).padStart(8, "0");
        return isFrom ? numberString.match(/.{1,4}/g).join(" ") : numberString;
      } else if (base === 16) {
        numberString = number.toString(base).toUpperCase();
        return isFrom
          ? numberString.padStart(4, "0x")
          : numberString.padStart(2, "0");
      } else {
        console.log("Invalid conversion value");
        return number.toString(base);
      }
    },

    resetState() {
      this.userAnswer = "";
      this.result = "";
      this.showResult = false;
    },

    handleCorrectAnswer() {
      this.result = "+1";
      this.score += 1;
      this.updateScore(this.score);
      this.showResult = true;
      setTimeout(() => {
        this.setConversion();
        this.generateNumber();
      }, 1000);
    },

    handleIncorrectAnswer() {
      this.result = "Try again";
      this.showResult = true;
      setTimeout(() => {
        this.showResult = false;
      }, 400);
    },

    updateScore() {
      this.$emit("update-score");
    },
  },
};
</script>
