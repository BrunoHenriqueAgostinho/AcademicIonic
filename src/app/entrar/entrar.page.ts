import { Component, OnInit } from '@angular/core';
import { ILogin } from './../model/ILogin.model';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.page.html',
  styleUrls: ['./entrar.page.scss'],
})
export class EntrarPage implements OnInit {

  login: ILogin = {
    email: '',
    senha: ''
  } 

  constructor() { }

  ngOnInit() {
  }

}
