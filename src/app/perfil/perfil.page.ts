import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { IAdicionausuariousuario } from '../model/IAdicionausuariousuario.model';
import { IUsuario } from '../model/IUsuario.model';
import { AdicionaUsuarioUsuarioService } from '../services/adiciona-usuario-usuario.service';
import { UsuarioService } from '../services/usuario.service';
import { ITrabalho } from './../model/ITrabalho.model';
import { TrabalhoService } from './../services/trabalho.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  usuario: IUsuario = {
    cpf: '',
    nome: '',
    senha: '',
    descricao: '',
    foto: '',
    dtCadastro: null,
    tema: null,
    status: null,
    contaStatus: null,
    email: '',
    telefoneFixo: '',
    telefoneCelular: ''
  }

  numeroSeguidores = 0;
  numeroSeguidos = 0;

  tipo = '';

  status: String = '';
  tema: String = '';
  contaStatus: String = '';

  constructor(
    private storage: Storage,
    private usuarioService: UsuarioService,
    private trabalhoService: TrabalhoService,
    private adicionaService: AdicionaUsuarioUsuarioService,
    private router: Router
    ) { }

  async ngOnInit() {
    await this.storage.create();
    this.tipo = await this.storage.get('tipo');
    if (this.tipo == 'cpf'){
      
      this.usuario.cpf = String(await this.storage.get('codigo'));
      this.usuario.senha = await this.storage.get('senha');
      console.log(this.usuario);
      this.usuarioService.consultar(this.usuario).subscribe(
        retorno => {
          this.usuario = retorno;
          console.log(this.usuario);
        }
      );

      this.adicionaService.contar_seguidores(this.usuario).subscribe(
        retorno => {
          this.numeroSeguidores = retorno.mensagem;
        }
      );

      this.adicionaService.contar_seguidos(this.usuario).subscribe(
        retorno => {
          this.numeroSeguidos = retorno.mensagem;
        }
      );
    }
    /*if(this.usuario.tema == 1){
      this.tema = "Light";
    }else{
      this.tema = "Dark";
    }

    if(this.usuario.status == 1){
      this.status = 'Disponível';
    }else{
      this.status = 'Indisponível';
    }

    if(this.usuario.contaStatus == 1){
      this.contaStatus = "Ativa";
    }else{
      this.contaStatus = "Desativada";
    }*/
  }

  salvarAlteracoes() {
    this.usuario.telefoneCelular = String(this.usuario.telefoneCelular);
    this.usuario.telefoneFixo = String(this.usuario.telefoneFixo);
    console.log(this.usuario);
    this.usuarioService.alterar(this.usuario).subscribe(
      retorno => {
        this.usuarioService.exibirToast(retorno.mensagem, "success");
      }
    );
  }

  async sair(){
    await this.storage.create();
    this.storage.clear();
    this.router.navigate(["/folder"]);
  }
}
