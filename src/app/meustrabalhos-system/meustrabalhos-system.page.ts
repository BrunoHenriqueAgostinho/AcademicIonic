import { Component, OnInit } from '@angular/core';
import { ITrabalho } from './../model/ITrabalho.model';
import { Storage } from '@ionic/storage-angular';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { DesenvolveUsuarioTrabalhoService } from '../services/desenvolve-usuario-trabalho.service';
import { IUsuario } from '../model/IUsuario.model';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { InstituicaoService } from '../services/instituicao.service';
import { IInstituicao } from '../model/IInstituicao.model';
import { IModelo } from '../model/IModelo.model';
import { ModeloService } from '../services/modelo.service';

@Component({
  selector: 'app-meustrabalhos-system',
  templateUrl: './meustrabalhos-system.page.html',
  styleUrls: ['./meustrabalhos-system.page.scss'],
})
export class MeustrabalhosSystemPage implements OnInit {

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

  modelo: IModelo = {
    codigo: null,
    nome: 'novo trabalho',
    arquivo: '',
    margemDireita: '0cm',
    margemEsquerda: '0cm',
    margemTopo: '0cm',
    margemBaixo: '0cm',
    dtCriacao: null,
    descricao: '',
    cnpj: null
  }

  listaTrabalho: Observable<ITrabalho[]>;

  listaModelos: Observable<IModelo[]>;

  tipo = '';
  booleanUsuario = false;
  booleanInstituicao = false;

  constructor(
    private usuarioService: UsuarioService,
    private instituicaoService: InstituicaoService,
    private desenvolveService: DesenvolveUsuarioTrabalhoService,
    private modeloService: ModeloService,
    private storage: Storage,
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
      this.atualizarListaTrabalho();
    } else if (this.tipo == 'cnpj') {
      this.instituicao.cnpj = String(await this.storage.get('codigo'));
      this.instituicao.senha = await this.storage.get('senha');
      this.instituicaoService.consultar(this.instituicao).subscribe(
        retorno => {
          this.instituicao = retorno;
        }
      );
      this.booleanInstituicao = true;
      this.atualizarListaModelos();
    } else {
      this.router.navigate(['/folder']);
    }
  }

  ionViewDidEnter(){
    if (this.tipo == "cpf"){
      this.atualizarListaTrabalho();
    } else if (this.tipo == "cnpj"){
      this.atualizarListaModelos();
    }

  }

  abrirTrabalho(codigoTrabalho) {
    this.router.navigate(["/edicaotrabalho-system/" + codigoTrabalho]);
  }
  abrirModelo(codigoModelo) {
    this.router.navigate(["/edicaomodelo-system/" + codigoModelo]);
  }

  atualizarListaTrabalho(){
    this.listaTrabalho = this.desenvolveService.listar(this.usuario).pipe(delay(1000));
  }

  atualizarListaModelos(){
    console.log(this.instituicao);
    this.instituicao.cnpj
    this.listaModelos = this.modeloService.listarPorCnpj(this.instituicao).pipe(delay(0));
  }

  criarModelo(){
    this.modelo.cnpj = this.instituicao.cnpj;
    this.modeloService.inserir(this.modelo).subscribe(
      retorno => {
        this.instituicaoService.exibirToast(retorno.mensagem, "success");
      }
    );
    this.atualizarListaModelos();
  }
}
