import { Component, OnInit } from '@angular/core';
import { ILogin } from './../model/ILogin.model';
import { LoginService } from './../services/login.service';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

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
    private storage: Storage,
    private router: Router
    ) { }

  async ngOnInit() {
    await this.storage.create();
    this.tipo = await this.storage.get('tipo');
    if (this.tipo == 'cpf'){
      this.router.navigate(['/homepage-system']);
    } else if (this.tipo == 'cnpj') {
      this.router.navigate(['/homepage-system']);
    }
  }

  //Login
  entrar(){
    if (this.validarCampos()){
      this.loginService.consultar(this.login).subscribe( 
        async retorno => {
          await this.storage.create();
          await this.storage.clear();
          if (retorno.codigo.length == 11) {
            this.tipo = 'cpf';
          } else if (retorno.codigo.length == 14) {
            this.tipo = 'cnpj';
          }
          await this.storage.set('codigo', retorno.codigo);
          await this.storage.set('senha', this.login.senha);
          await this.storage.set('tipo', this.tipo);
          this.loginService.exibirToast("Acesso realizado com sucesso.", "success");
          location.reload();
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
