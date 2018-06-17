import { Directive, ElementRef, HostListener } from '@angular/core';
import { element } from 'protractor';

@Directive({
  selector: '[appBluecolored]'   //this is the actual directive which angular will search in the html page this must be same in the html page 
})
export class BluecoloredDirective {

  constructor(element:ElementRef) {
   console.log(element);
   element.nativeElement.style.color="blue";
   }

   @HostListener('click')dosomethingbhai(){
     alert("it works");
     console.log("host listener is working");
   }
   
//    @HostListener('document:click',['$event'])
//    elemClicked(elem){
//      alert(elem);
//      console.log('clicked',elem);
//    }

 }
