import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  title = 'app';
  num=1;
  nak=true;
  toggleDive(){
    this.nak=!this.nak
    this.num +=1;
  }

  details=[
    {'name':'naushad','mob':8802843350,'add':'up'},
    {'name':'mihir','mob':12355,'add':'2p'},
    {'name':'krishna','mob':3333333,'add':'3p'},
    {'name':'akshay','mob':4444444,'add':'4p'},
    {'name':'raghav','mob':5555555,'add':'5p'}
  ]

  check=33;
  constructor( private router: Router){
    setTimeout(()=>{
      this.check=1000;
    },5*1000);
  }

  username="nakwarsi"
  change(event){
    this.username=event.target.value;
  };

goto(){
  this.router.navigate(['/user'])
}

}

