<template>
  <div class="h-96 w-80 p-3 pt-12" >
    <h2 class="text-white text-1xl">{{conversionSys}} </h2>
    <p class="text-white text-3xl py-10">{{ numberFrom }}</p>
    <input v-model="userAnswer" @keyup.enter="checkAnswer" placeholder="" class="bg-teal-500 border-2 text-center text-2xl text-white h-12 w-72 pb-1 focus:border-slate-600 focus:ring-slate-600"/>
    <!--<p v-if="showResult">{{ result }}</p>-->
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
        numberString = randomNumber.toString(this.currentConversion.valueFrom).padStart(8, '0');;
        this.numberFrom = numberString.match(/.{1,4}/g).join(' ');
      }else if(this.currentConversion.valueFrom == 16){
        numberString = randomNumber.toString(this.currentConversion.valueFrom);
        this.numberFrom = numberString.toUpperCase();
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
      console.log("get answer")
      console.log("answer: " + this.userAnswer)
      console.log("userAnswer: " + this.userAnswer)
      console.log("numberTo: " + this.numberTo)
      //let userAnswer = parseInt(this.answer, this.currentBase.value);
      // Convert the generated number to decimal
      //let correctAnswer = parseInt(this.number, this.currentBase.value);
      // Check if the user's answer is correct
      if (this.userAnswer.toUpperCase() === this.numberTo) {
        // Display a success message and generate a new number
        this.result = '+1';
        this.showResult = true;
        this.setConversion();        
        this.generateNumber();

      } else {
        // Display a failure message
        this.result = 'Try again';
        this.showResult = true;
      }
    }

  }
}
</script>
