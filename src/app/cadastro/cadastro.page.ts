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
  displayU = 'none'
  displayI = 'block'

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
      console.log('Segment changed', ev);
    }else{
      this.displayU='none';
      this.displayI='block';
      console.log('Segment changed', ev);
    }
  }
  
  //CadastrarUsuario
  cadastrarUsuario() { 
    if(this.validarCamposUsuario()){
      if(this.usuario.senha == this.confirmarSenhaUsuario){
        console.log(this.usuario);
        this.usuarioService.inserir(this.usuario).subscribe( 
          retorno => { 
            this.usuarioService.exibirToast(retorno.mensagem,'medium');
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
        console.log(this.instituicao);
        this.instituicaoService.inserir(this.instituicao).subscribe( 
          retorno => { 
            this.instituicaoService.exibirToast(retorno.mensagem,'medium');
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
}
