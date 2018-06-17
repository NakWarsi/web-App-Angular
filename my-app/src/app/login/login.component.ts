import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  loginUser(e){
    var userName = e.target.element[0].value;
    var password = e.target.element[1].value;
    if(userName=='nakwarsi'&& password=='password'){
      this.router.navigate(['user']);
    }
  }
 }
