import { Component, OnInit } from '@angular/core';
import { nextTick } from 'q';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  
  constructor() { }

  ngOnInit() {
  }
  displayValue= "0"; 
  value=null;
  numberArray=[];
  flag:boolean=false;
  operator:string="";
  waitingForOperand:boolean=true;
  size=this.displayValue.length;
  
  /*checkSize(){
    const element=document.getElementById("displayNumbers");
    for (let i=12; i=20;i++){
      if(this.size==12){
        element.style.fontSize="32px";
      }
    }
  }*/
  
  plusMinus(){
    this.displayValue.charAt(0)==='-'? this.displayValue=this.displayValue.substr(1):this.displayValue="-"+this.displayValue;
  }
  clear(){
    this.displayValue="0";
  }
  addDot(){
    if(this.waitingForOperand){
      this.displayValue= '.';
      this.waitingForOperand=false;
    }
    else if(this.displayValue.indexOf(".")==-1){
      this.displayValue=this.displayValue+ ".";
      this.waitingForOperand=false;
    }
  }
  addNumber(digit){
    
    if(this.size==12){
      const element=document.getElementById("inputNumbers");
      element.style.fontSize="32px";
    }
    else if (this.waitingForOperand){
      this.displayValue=String(digit);
      this.waitingForOperand=false;
    }else{
     this.displayValue==='0'? this.displayValue=String(digit):this.displayValue=this.displayValue+digit;
     console.log(this.displayValue);
     
     
    }
  };
  logarithm(){
    let c=parseInt(this.displayValue);
    c=Math.log(c);
    this.displayValue=c.toString();
    this.flag=true;
  }
   
  performOperation(nextOperator){  
  const nextValue = parseFloat(this.displayValue);
  const operations ={
    "+":(previousValue,nextValue) => previousValue + nextValue,
    "-":(previousValue,nextValue) => previousValue - nextValue,
    "*":(previousValue,nextValue) => previousValue * nextValue,
    "/":(previousValue,nextValue) => previousValue / nextValue,
    "=":(previousValue,nextValue) => nextValue,
  };
  if (this.value == null){
    this.value=nextValue;
  } else if (this.operator){
    const currentValue = this.value || 0;
    const mathValue=operations[this.operator](currentValue,nextValue);
  this.value=mathValue;
  this.displayValue=String(mathValue);
  }
  this.waitingForOperand=true;  
  this.operator=nextOperator;
 
 
  }
}