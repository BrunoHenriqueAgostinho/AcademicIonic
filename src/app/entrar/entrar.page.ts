import { Component, OnInit } from '@angular/core';
import { ILogin } from './../model/ILogin.model';
import { LoginService } from './../services/login.service';
import { Storage } from '@ionic/storage-angular';

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

  constructor(
    private loginService: LoginService,
    private storage: Storage
    ) { }

  ngOnInit() {
  }

  //Login
  entrar(){
    if (this.validarCampos()){
      console.log(this.login);
      this.loginService.consultar(this.login).subscribe( 
        async retorno => {
          await this.storage.create();
          await this.storage.clear();
          await this.storage.set('codigo', retorno.codigo);
          this.codigo = parseInt(await this.storage.get('codigo'));
          console.log(this.codigo);
          this.loginService.exibirToast("Acesso realizado com sucesso.", "medium");
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
