<template>
  <div class="h-80 w-80 p-3 py-12" >
    
    <div v-if="!showResult">
      <h2 class="text-white text-1xl">{{conversionSys}} </h2>
      <p class="text-white text-3xl py-10">{{ numberFrom }}</p>
      <input v-model="userAnswer" autofocus="true" @keyup.enter="checkAnswer" placeholder="" class="bg-teal-500 border-2 text-center text-2xl text-white h-12 w-72 pb-1 focus:border-slate-600 focus:ring-slate-600"/>
    </div>
    <div v-if="showResult">
      <p class="text-white text-3xl p-16" >{{ result }}</p>
    </div>
    
  </div>
</template>

<script>



export default {


  data() {
    return {
      numberFrom: '',
      numberTo: '',
      answer: '',
      result: '',
      score: 0,
      conversionSys: '',
      showResult: false,
      conversions: [
        { valueFrom: 2, valueTo: 16, label: 'Binary -> Hexadecimal' },
        { valueFrom: 2, valueTo: 10, label: 'Binary -> Decimal' },
        { valueFrom: 16, valueTo: 2, label: 'Hexadecimal -> Binary' }
      ],
      currentConversion: {}
    }
  },
  created() {
    this.setConversion();
    this.generateNumber();
  },
  methods: {
    generateNumber() {
      let numberString = '';
      // Generate a random number between 0 and 255
      let randomNumber = Math.floor(Math.random() * 256);
      console.log("Random number: " + randomNumber);
      // Convert the number to a string in the current base
      if(this.currentConversion.valueFrom == 2){
        numberString = randomNumber.toString(this.currentConversion.valueFrom).padStart(8, '0');
        this.numberFrom = numberString.match(/.{1,4}/g).join(' ');
      }else if(this.currentConversion.valueFrom == 16){
        numberString = randomNumber.toString(this.currentConversion.valueFrom);
        this.numberFrom = numberString.toUpperCase().padStart(4, '0x');
      }else{
        console.log("Invalid conversion value")
      }
    
      //this.numberFrom = numberString.toUpperCase();
      //console.log(this.currentConversion.valueTo)




      numberString = randomNumber.toString(this.currentConversion.valueTo);
      this.numberTo = numberString.toUpperCase();
      console.log("From: " + this.numberFrom);
      console.log("To: " + this.numberTo);
      // Reset the answer and result
      this.userAnswer = '';
      this.result = '';
      this.showResult = false;
    },
    setConversion() {
      // Get a random base from the bases array
      this.currentConversion = this.conversions[Math.floor(Math.random() * this.conversions.length)];
      this.conversionSys = this.currentConversion.label
      console.log("Current conversion: " + this.currentConversion.label)
    },
    checkAnswer() {
      // Convert the user's answer to the current base
      /*console.log("get answer")
      console.log("answer: " + this.userAnswer)
      console.log("userAnswer: " + this.userAnswer)
      console.log("numberTo: " + this.numberTo)*/
      //let userAnswer = parseInt(this.answer, this.currentBase.value);
      // Convert the generated number to decimal
      //let correctAnswer = parseInt(this.number, this.currentBase.value);
      // Check if the user's answer is correct
      if (this.userAnswer.toUpperCase() === this.numberTo) {
        // Display a success message and generate a new number
        this.result = '+1';
        this.score += 1
        this.updateScore(this.score)
        this.showResult = true;
        setTimeout(() => {
            this.setConversion();        
            this.generateNumber();
        }, 1000);
        

      } else {
        // Display a failure message
        this.result = 'Try again';
        this.showResult = true;
        setTimeout(() => {
            this.showResult = false;
        }, 400);
      }
    },

    updateScore(){
      console.log("update score")
      this.$emit('update-score');
    }

  }
}
</script>
