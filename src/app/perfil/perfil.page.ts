import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { IAdicionausuariousuario } from '../model/IAdicionausuariousuario.model';
import { IInstituicao } from '../model/IInstituicao.model';
import { IUsuario } from '../model/IUsuario.model';
import { AdicionaUsuarioUsuarioService } from '../services/adiciona-usuario-usuario.service';
import { InstituicaoService } from '../services/instituicao.service';
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

  instituicao : IInstituicao = {
    cnpj: '',
    nome: '',
    logotipo: '',
    dtCadastro: null,
    senha: '',
    contaStatus: null,
    email: '',
    telefoneFixo: '',
    telefoneCelular: '',
    cidade: ''
  }

  numeroSeguidores = 0;
  numeroSeguidos = 0;

  tipo = '';
  booleanUsuario = false;
  booleanInstituicao = false;

  status: String = '';
  tema: String = '';
  contaStatus: String = '';

  constructor(
    private storage: Storage,
    private usuarioService: UsuarioService,
    private instituicaoService: InstituicaoService,
    private trabalhoService: TrabalhoService,
    private adicionaService: AdicionaUsuarioUsuarioService,
    private router: Router
    ) { }

  async ngOnInit() {
    //Autenticação de acesso à página
    await this.storage.create();
    this.tipo = await this.storage.get('tipo');
    if (this.tipo == 'cpf'){
      this.usuario.cpf = String(await this.storage.get('codigo'));
      this.usuario.senha = await this.storage.get('senha');
      this.usuarioService.consultar(this.usuario).subscribe(
        retorno => {
          this.usuario = retorno;
        }
      );

      this.booleanUsuario = true;

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
    } else if (this.tipo == 'cnpj') {
      this.instituicao.cnpj = String(await this.storage.get('codigo'));
      this.instituicao.senha = await this.storage.get('senha');
      this.instituicaoService.consultar(this.instituicao).subscribe(
        retorno => {
          this.instituicao = retorno;
        }
      );
      this.booleanInstituicao = true;
    } else {
      this.router.navigate(['/folder']);
    }
  }

  salvarAlteracoesUsuario() {
    this.usuario.telefoneCelular = String(this.usuario.telefoneCelular);
    this.usuario.telefoneFixo = String(this.usuario.telefoneFixo);
    this.usuarioService.alterar(this.usuario).subscribe(
      retorno => {
        this.usuarioService.exibirToast(retorno.mensagem, "success");
      }
    );
  }

  salvarAlteracoesInstituicao() {
    this.instituicao.telefoneCelular = String(this.instituicao.telefoneCelular);
    this.instituicao.telefoneFixo = String(this.instituicao.telefoneFixo);
    this.instituicaoService.alterar(this.instituicao).subscribe(
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
