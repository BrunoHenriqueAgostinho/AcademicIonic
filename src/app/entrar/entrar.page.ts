import { Component, OnInit } from '@angular/core';
import { ILogin } from './../model/ILogin.model';
import { LoginService } from './../services/login.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

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

  codigo = 0;
  tipo = '';

  constructor(
    private loginService: LoginService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.tipo = environment.tipo;
    if (this.tipo == 'cpf' || this.tipo == 'cnpj'){
      this.router.navigate(['/homepage-system']);
    }
  }

  //Login
  entrar(){
    if (this.validarCampos()){
      this.loginService.consultar(this.login).subscribe( 
        retorno => {
          environment.codigo = null;
          environment.senha = null;
          environment.tipo = null;
          if (retorno.codigo.length == 11) {
            this.tipo = 'cpf';
          } else if (retorno.codigo.length == 14) {
            this.tipo = 'cnpj';
          }

          environment.codigo = retorno.codigo;
          environment.senha = this.login.senha;
          environment.tipo = this.tipo;
          this.loginService.exibirToast("Acesso realizado com sucesso.", "success");
          //location.reload();
          //
          this.router.navigate(['/homepage-system']);
        } 
      );
    }
  }

  validarCampos(): boolean{
    if (this.login.email == null || this.login.senha == ''){
      this.loginService.exibirToast("Todos os campos devem ser preenchidos para acessar sua conta.", "danger");
      return false;
    } else {
      return true;
    }
  }

}
