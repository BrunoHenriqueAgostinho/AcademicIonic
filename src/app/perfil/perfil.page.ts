import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
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
    private usuarioService: UsuarioService,
    private instituicaoService: InstituicaoService,
    private trabalhoService: TrabalhoService,
    private adicionaService: AdicionaUsuarioUsuarioService,
    private router: Router
    ) { }

  async ngOnInit() {
    //Autenticação de acesso à página
    this.tipo = environment.tipo;
    if (this.tipo == 'cpf'){
      this.usuario.cpf = environment.codigo;
      this.usuario.senha = environment.senha;
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
      this.instituicao.cnpj = environment.codigo;
      this.instituicao.senha = environment.senha;
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
    this.trabalhoService.exibirToast("Saída realizada com sucesso.", "success");
    environment.codigo = null;
    environment.senha = null;
    environment.tipo = null;
    this.router.navigate(['/folder']);
  }
}
