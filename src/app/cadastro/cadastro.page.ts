import { Component, OnInit } from '@angular/core';
import { IUsuario } from './../model/IUsuario.model'; 
import { IInstituicao } from '../model/IInstituicao.model';
import { UsuarioService } from './../services/usuario.service';
import { InstituicaoService } from '../services/instituicao.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  usuario: IUsuario = {
    cpf: null,
    nome: '',
    senha: '',
    email: ''
  } 

  instituicao: IInstituicao = {
    cnpj: null,
    nome: '',
    senha: '',
    email: ''
  } 

  constructor(
    private usuarioService: UsuarioService,
    private instituicaoService: InstituicaoService
  ) { }

  ngOnInit() {
  }

  cadastrarUsuario() { 
    console.log(this.usuario);
    this.usuarioService.inserir(this.usuario).subscribe( 
      retorno => { 
        this.usuarioService.exibirToast(retorno.mensagem,'medium');
      } 
    ); 
  }

  cadastrarInstituicao() { 
    console.log(this.instituicao);
    this.instituicaoService.inserir(this.instituicao).subscribe( 
      retorno => { 
        this.instituicaoService.exibirToast(retorno.mensagem,'medium');
      } 
    ); 
  }
}
