import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    document.querySelector('.img-btn').addEventListener('click',function(){
      document.querySelector('.cont').classList.toggle('s-signup')
    });
  }
  
  

}
