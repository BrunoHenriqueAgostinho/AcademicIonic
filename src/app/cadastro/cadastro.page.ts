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
  //Variáveis
  corUsuario = "white";
  corInstituicao = "white";

  displayU = 'none'
  displayI = 'block'

  usuario: IUsuario = {
    cpf: null,
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

  instituicao: IInstituicao = {
    cnpj: null,
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

  confirmarSenhaUsuario: string = '';
  confirmarSenhaInstituicao: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private instituicaoService: InstituicaoService
  ) { }

  ngOnInit() {
  }

  //Segment
  segmentChanged(ev: any) {
    if(ev.detail.value == 'usuario'){
      this.displayU='block';
      this.displayI='none';
    }else{
      this.displayU='none';
      this.displayI='block';
    }
  }
  
  //CadastrarUsuario
  cadastrarUsuario() { 
    if(this.validarCamposUsuario()){
      if(this.usuario.senha == this.confirmarSenhaUsuario){
        this.usuarioService.inserir(this.usuario).subscribe( 
          retorno => { 
            this.usuarioService.exibirToast(retorno.mensagem,'success');
          } 
        ); 
      } else {
        this.usuarioService.exibirToast("As senhas informadas não coincidedem.", "danger");
      }
    }
  }

  //CadastrarInstituicao
  cadastrarInstituicao() { 
    if(this.validarCamposInstituicao()){
      if(this.instituicao.senha == this.confirmarSenhaInstituicao){
        this.instituicaoService.inserir(this.instituicao).subscribe( 
          retorno => { 
            this.instituicaoService.exibirToast(retorno.mensagem,'success');
          } 
        ); 
      } else {
        this.instituicaoService.exibirToast("As senhas informadas não coincidedem.", "danger");
      }
    }
  }

  //ValidarCamposUsuario
  validarCamposUsuario(): boolean{
    if (this.usuario.cpf == null || this.usuario.nome == '' || this.usuario.senha == '' || this.usuario.email == '' || this.confirmarSenhaUsuario == ''){
      this.usuarioService.exibirToast("Todos os campos devem ser preenchidos para realizar o cadastro.", "danger");
      return false;
    } else {
      return true;
    }
  }

  //ValidarCamposInstituicao
  validarCamposInstituicao(): boolean{
    if (this.instituicao.cnpj == null || this.instituicao.nome == '' || this.instituicao.senha == '' || this.instituicao.email == '' || this.confirmarSenhaInstituicao == ''){
      this.instituicaoService.exibirToast("Todos os campos devem ser preenchidos para realizar o cadastro.", "danger");
      return false;
    } else {
      return true;
    }
  }

  //Indicação da validade do confirmar senha do usuário por cores
  corSenhaUsuario(){
    if(this.usuario.senha != '' && this.confirmarSenhaUsuario != ''){
      if(this.usuario.senha == this.confirmarSenhaUsuario){
        this.corUsuario = "#2F77FF";
      } else {
        this.corUsuario = "red";
      }
    } else {
      this.corUsuario = "white";
    }
  }

  //Indicação da validade do confirmar senha do usuário por cores
  corSenhaInstituicao(){
    if(this.instituicao.senha != '' && this.confirmarSenhaInstituicao != ''){
      if(this.instituicao.senha == this.confirmarSenhaInstituicao){
        this.corInstituicao = "#2F77FF";
      } else {
        this.corInstituicao = "red";
      }
    } else {
      this.corInstituicao = "white";
    }
  }
}
