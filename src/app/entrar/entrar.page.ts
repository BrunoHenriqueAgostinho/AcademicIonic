import { Component, OnInit } from '@angular/core';
import { ILogin } from './../model/ILogin.model';
import { LoginService } from './../services/login.service';

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

  constructor(
    private loginService: LoginService
    ) { }

  ngOnInit() {
  }

  //Login
  entrar(){
    console.log(this.login);
    this.loginService.consultar(this.login).subscribe( 
      retorno => { 
        this.loginService.exibirToast(retorno.mensagem,'medium');
      } 
    );
  }

}
