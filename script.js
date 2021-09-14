class Calculator{
	constructor(previousCalText, currentCalcText){
		this.previousCalText = previousCalText;
		this.currentCalcText = currentCalcText;
		this.clear()
	}

	clear(){
		this.currOperation = '';
		this.prevOperation = '';
		this.operator = undefined;
	}

	backspace(){
		this.currOperation = this.currOperation.toString()
		this.currOperation = this.currOperation.slice(0,-1)
	}
	equalfunction(){
		if (this.currOperation =="" && this.prevOperation != "") {
			this.currOperation = this.prevOperation;
			this.prevOperation = '';
			this.operator = undefined;
		}else{
			this.calculate()
		}
	}
	calculate(){
		let val;
		const prevVal = parseFloat(this.prevOperation);
		const currVal = parseFloat(this.currOperation);
		if (isNaN(prevVal) || isNaN(currVal)) return
		switch(this.operator) {
			case "+":
				val = prevVal + currVal;
				break
			case "-":
				val = prevVal - currVal;
				break
			case "*":
				val = prevVal * currVal;
				break
			case "/":
				val = prevVal / currVal;
				break
			case "%":
				val = prevVal * (currVal/100);
				break
			default:
				return;
		}
		this.currOperation = val;
		this.operator = undefined;
		this.prevOperation = "";
		
	}

	addNum(number){
		if(number === "." && this.currOperation.includes(".")) return;
		this.currOperation = this.currOperation.toString() + number.toString();
	}

	selectOperator(operator){
		if  (this.currentOperation === "") return
		if (this.prevOperation != ''){
			this.calculate()
		}
		this.operator = operator;
		if (this.currOperation === ""  &&  this.prevOperation != "") {
			return
		}else{
			this.prevOperation = this.currOperation;
			this.currOperation = '';
		}
	}
	formatNumber(number){
		const stringNumber = number.toString();
		const integerDigits = parseFloat(stringNumber.split('.')[0]);
		const decimalDigits = stringNumber.split('.')[1];
		let integerDisplay;
    	if (isNaN(integerDigits)) {
      		integerDisplay = ''
    	}else {
      		integerDisplay = integerDigits.toLocaleString('en-us', { maximumFractionDigits: 0 })
    	}
    	if (decimalDigits != null) {
      		return `${integerDisplay}.${decimalDigits}`
    	} else {
     		return integerDisplay
    	}
	}


	updateOutput(){
		this.currentCalcText.innerText = this.formatNumber(this.currOperation);
		if (this.operator != null) {
			this.previousCalText.innerText = this.formatNumber(this.prevOperation) + " " + this.operator.toString();
		}else{
			this.previousCalText.innerText = "";
		}
		
	}

}


const numButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operation]');

const clearButton = document.querySelector('[data-clear]');
const backspaceButton = document.querySelector('[data-delete]');

const equalButton = document.querySelector('[data-equal]');

const previousCalText = document.getElementById("calculation");
const currentCalcText = document.getElementById("output");



const calculator = new Calculator(previousCalText, currentCalcText);

clearButton.addEventListener('click', ()=>{
	calculator.clear();
	calculator.updateOutput();
})

backspaceButton.addEventListener('click', ()=>{
	calculator.backspace();
	calculator.updateOutput();
})


numButtons.forEach(button => {
	button.addEventListener('click', () =>{
		calculator.addNum(button.innerText);
		calculator.updateOutput();
	})
})

operatorButtons.forEach(button => {
	button.addEventListener('click', () =>{
		calculator.selectOperator(button.id)
		calculator.updateOutput();
	})
})

equalButton.addEventListener('click', ()=>{
	calculator.equalfunction();
	calculator.updateOutput();
})