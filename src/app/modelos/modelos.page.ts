import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDesenvolveusuariotrabalho } from '../model/IDesenvolveusuariotrabalho.model';
import { IModelo } from '../model/IModelo.model';
import { ITrabalho } from '../model/ITrabalho.model';
import { ModeloService } from '../services/modelo.service';
import { TrabalhoService } from '../services/trabalho.service';
import { Storage } from '@ionic/storage-angular';
import { DesenvolveUsuarioTrabalhoService } from '../services/desenvolve-usuario-trabalho.service';

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
    formatacao: '',
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
    formatacao: '',
    dtCadastro: null,
    descricao: '',
    cnpj: null
  }

  desenvolveUsuarioTrabalho: IDesenvolveusuariotrabalho = {
    cpf: '',
    codigo: null,
    cargo: 1,
  }

  constructor(
    private trabalhoService: TrabalhoService,
    private modeloService: ModeloService,
    private desenvolve: DesenvolveUsuarioTrabalhoService,
    private router: Router,
    private storage: Storage
  ) { }

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
        this.trabalho.formatacao = this.modelo.formatacao;
        this.trabalho.modelo = this.modelo.codigo;
        this.trabalhoService.inserir(this.trabalho).subscribe(
          retorno => {
            this.desenvolveUsuarioTrabalho.codigo = retorno.codigo;
            console.log(this.desenvolveUsuarioTrabalho);
            this.desenvolve.inserir(this.desenvolveUsuarioTrabalho).subscribe(
              retorno => this.desenvolve.exibirToast('Trabalho criado com sucesso','medium')
            );
          }
        );
      } 
    );
  }

}
