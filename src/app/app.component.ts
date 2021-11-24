import { Component, EventEmitter } from '@angular/core';
import { IInstituicao } from './model/IInstituicao.model';
import { IUsuario } from './model/IUsuario.model';
import { InstituicaoService } from './services/instituicao.service';
import { UsuarioService } from './services/usuario.service';
import { RouterEventDetail } from '@ionic/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public paginasAnonimo = [
    { title: 'Início', url: '/folder', icon: 'home' },
    { title: 'Para Estudantes', url: '/para-estudantes', icon: 'book' },
    { title: 'Para Instituições', url: '/para-instituicoes', icon: 'storefront' },
    { title: 'Cadastro', url: '/cadastro', icon: 'key' },
    { title: 'Entrar', url: '/entrar', icon: 'enter' }
  ];

  public paginasUsuario = [
    { title: 'Início', url: '/homepage-system', icon: 'home' },
    { title: 'Perfil', url: '/perfil', icon: 'body' },
    { title: 'Para Estudantes', url: '/para-estudantes', icon: 'book' },
    { title: 'Para Instituições', url: '/para-instituicoes', icon: 'storefront' },
    { title: 'Meus Trabalhos', url: '/meustrabalhos-system', icon: 'clipboard' }
  ];

  public paginasInstituicao = [
    { title: 'Início', url: '/homepage-system', icon: 'home' },
    { title: 'Perfil', url: '/perfil', icon: 'body' },
    { title: 'Para Estudantes', url: '/para-estudantes', icon: 'book' },
    { title: 'Para Instituições', url: '/para-instituicoes', icon: 'storefront' },
    { title: 'Meus Modelos', url: '/meusmodelos-system', icon: 'clipboard' }
  ];

  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

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
  booleanUsuario = false;
  booleanInstituicao = false;
  booleanAnonimo = false;
  tipo = '';

  constructor(
    private usuarioService: UsuarioService,
    private instituicaoService: InstituicaoService
  ) {}

  ngOnInit() {
  }

  alterarMenu(){
    console.log("teste");
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
      this.booleanInstituicao = false;
      this.booleanAnonimo = false;
    } else if (this.tipo == 'cnpj') {
      this.instituicao.cnpj = environment.codigo;
      this.instituicao.senha = environment.senha;
      this.instituicaoService.consultar(this.instituicao).subscribe(
        retorno => {
          this.instituicao = retorno;
        }
      );
      this.booleanUsuario = false;
      this.booleanInstituicao = true;
      this.booleanAnonimo = false;
    } else {
      this.booleanUsuario = false;
      this.booleanInstituicao = false;
      this.booleanAnonimo = true;
    }
  }
}
