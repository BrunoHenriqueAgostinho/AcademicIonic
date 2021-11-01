import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDesenvolveusuariotrabalho } from '../model/IDesenvolveusuariotrabalho.model';
import { IModelo } from '../model/IModelo.model';
import { ITrabalho } from '../model/ITrabalho.model';
import { ModeloService } from '../services/modelo.service';
import { TrabalhoService } from '../services/trabalho.service';
import { Storage } from '@ionic/storage-angular';
import { DesenvolveUsuarioTrabalhoService } from '../services/desenvolve-usuario-trabalho.service';
import { Observable } from 'rxjs';
import { IPesquisa } from '../model/IPesquisa.model';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-modelos',
  templateUrl: './modelos.page.html',
  styleUrls: ['./modelos.page.scss'],
})
export class ModelosPage implements OnInit {

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
    dtCadastro: null,
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

  constructor(
    private trabalhoService: TrabalhoService,
    private modeloService: ModeloService,
    private desenvolve: DesenvolveUsuarioTrabalhoService,
    private router: Router,
    private storage: Storage
  ) {
    this.pesquisar();
  }

  async ngOnInit() {
    await this.storage.create();
    this.desenvolveUsuarioTrabalho.cpf = String(await this.storage.get('codigo'));

  }

  criarTrabalho(codigo: number){
    this.modelo.codigo = codigo;
    this.modeloService.consultar(this.modelo).subscribe( 
      retorno => {
        this.modelo = retorno;
        console.log(this.modelo);
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
            console.log(this.desenvolveUsuarioTrabalho);
            this.desenvolve.inserir(this.desenvolveUsuarioTrabalho).subscribe(
              retorno => this.desenvolve.exibirToast('Trabalho criado com sucesso.','medium')
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
