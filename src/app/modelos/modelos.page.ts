import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDesenvolveusuariotrabalho } from '../model/IDesenvolveusuariotrabalho.model';
import { IModelo } from '../model/IModelo.model';
import { ITrabalho } from '../model/ITrabalho.model';
import { ModeloService } from '../services/modelo.service';
import { TrabalhoService } from '../services/trabalho.service';
import { DesenvolveUsuarioTrabalhoService } from '../services/desenvolve-usuario-trabalho.service';
import { Observable } from 'rxjs';
import { IPesquisa } from '../model/IPesquisa.model';
import { delay } from 'rxjs/operators';
import { IInstituicao } from '../model/IInstituicao.model';
import { IUsuario } from '../model/IUsuario.model';
import { UsuarioService } from '../services/usuario.service';
import { InstituicaoService } from '../services/instituicao.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modelos',
  templateUrl: './modelos.page.html',
  styleUrls: ['./modelos.page.scss'],
})
export class ModelosPage implements OnInit {
  
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

  trabalho: ITrabalho = {
    codigo: null,
    nome: 'novo trabalho',
    descricao: '',
    arquivo: '',
    margemDireita: '',
    margemEsquerda: '',
    margemTopo: '',
    margemBaixo: '',
    finalizado: 0,
    dtCriacao: null,
    dtAlteracao: null,
    dtPublicacao: null,
    avaliacao: null,
    modelo: null,
    cnpj: null
  }

  modelo: IModelo = {
    codigo: null,
    nome: '',
    arquivo: '',
    margemDireita: '',
    margemEsquerda: '',
    margemTopo: '',
    margemBaixo: '',
    dtCriacao: null,
    descricao: '',
    cnpj: null
  }

  desenvolveUsuarioTrabalho: IDesenvolveusuariotrabalho = {
    cpf: '',
    codigo: null,
    cargo: 1,
  }

  pesquisa: IPesquisa = {
    pesquisa: ''
  }

  listaModelo: Observable<IModelo[]>;

  tipo = '';
  booleanUsuario = false;
  booleanInstituicao = false;

  constructor(
    private usuarioService: UsuarioService,
    private instituicaoService: InstituicaoService,
    private trabalhoService: TrabalhoService,
    private modeloService: ModeloService,
    private desenvolve: DesenvolveUsuarioTrabalhoService,
    private router: Router
  ) {
    this.pesquisar();
  }

  ngOnInit() {
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

    this.desenvolveUsuarioTrabalho.cpf = String(environment.codigo);
  }

  criarTrabalho(codigo: number){
    this.modelo.codigo = codigo;
    this.modeloService.consultar(this.modelo).subscribe( 
      retorno => {
        this.modelo = retorno;
        this.trabalho.descricao = this.modelo.descricao;
        this.trabalho.arquivo = this.modelo.arquivo;
        this.trabalho.margemDireita = this.modelo.margemDireita;
        this.trabalho.margemEsquerda = this.modelo.margemEsquerda;
        this.trabalho.margemTopo = this.modelo.margemTopo;
        this.trabalho.margemBaixo = this.modelo.margemBaixo;
        this.trabalho.modelo = this.modelo.codigo;
        this.trabalhoService.inserir(this.trabalho).subscribe(
          retorno => {
            this.desenvolveUsuarioTrabalho.codigo = retorno.codigo;
            this.desenvolve.inserir(this.desenvolveUsuarioTrabalho).subscribe(
              retorno => {
                this.desenvolve.exibirToast('Trabalho criado com sucesso.','success');
              }
            );
          }
        );
      } 
    );
  }

  pesquisar(){
    this.listaModelo = this.modeloService.listar(this.pesquisa).pipe(delay(1000));
  }
}
