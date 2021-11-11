import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { IInstituicao } from './model/IInstituicao.model';
import { IUsuario } from './model/IUsuario.model';
import { InstituicaoService } from './services/instituicao.service';
import { UsuarioService } from './services/usuario.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public paginasAnonimo = [
    { title: 'Início', url: '/folder', icon: 'home' },
    { title: 'Para Estudantes', url: '/folder', icon: 'book' },
    { title: 'Para Instituições', url: '/folder', icon: 'storefront' },
    { title: 'Cadastro', url: '/cadastro', icon: 'key' },
    { title: 'Entrar', url: '/entrar', icon: 'enter' }
  ];

  public paginasUsuario = [
    { title: 'Início', url: '/homepage-system', icon: 'home' },
    { title: 'Perfil', url: '/perfil', icon: 'body' },
    { title: 'Para Estudantes', url: '/folder', icon: 'book' },
    { title: 'Para Instituições', url: '/folder', icon: 'storefront' },
    { title: 'Meus Trabalhos', url: '/meustrabalhos-system', icon: 'clipboard' }
  ];

  public paginasInstituicao = [
    { title: 'Início', url: '/homepage-system', icon: 'home' },
    { title: 'Perfil', url: '/perfil', icon: 'body' },
    { title: 'Para Estudantes', url: '/folder', icon: 'book' },
    { title: 'Para Instituições', url: '/folder', icon: 'storefront' },
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
    private storage: Storage,
    private usuarioService: UsuarioService,
    private instituicaoService: InstituicaoService
  ) {}

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
      this.booleanUsuario = true;
    } else if (this.tipo == 'cnpj') {
      this.instituicao.cnpj = String(await this.storage.get('codigo'));
      this.instituicao.senha = await this.storage.get('senha');
      console.log(this.instituicao);
      this.instituicaoService.consultar(this.instituicao).subscribe(
        retorno => {
          this.instituicao = retorno;
          console.log(retorno);
        }
      );
      this.booleanInstituicao = true;
    } else {
      this.booleanAnonimo = true;
    }
  }
}
