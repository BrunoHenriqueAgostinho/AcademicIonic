import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import { delay } from 'rxjs/operators';
import { ITrabalho } from 'src/app/model/ITrabalho.model';
import { TrabalhoService } from 'src/app/services/trabalho.service';

@Component({
  selector: 'app-propriedadestrabalho',
  templateUrl: './propriedadestrabalho.page.html',
  styleUrls: ['./propriedadestrabalho.page.scss'],
})
export class PropriedadestrabalhoPage implements OnInit {

  tituloModal: string;
  dataReturned: any;

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

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private trabalhoService: TrabalhoService
  ) { }

  ngOnInit() {
    this.trabalho.codigo = this.navParams.data.paramID;
    this.tituloModal = this.navParams.data.paramTitle;
    this.trabalhoService.consultar(this.trabalho).subscribe(
      retorno => {
        this.trabalho.nome = retorno.nome;
        this.trabalho.descricao = retorno.descricao;
        this.trabalho.finalizado = retorno.finalizado;
        this.trabalho.arquivo = retorno.arquivo;
        this.trabalho.margemDireita = retorno.margemDireita;
        this.trabalho.margemEsquerda = retorno.margemEsquerda;
        this.trabalho.margemTopo = retorno.margemTopo;
        this.trabalho.margemBaixo = retorno.margemBaixo;
        this.trabalho.dtAlteracao = retorno.dtAlteracao;
        this.trabalho.avaliacao = retorno.avaliacao;
        this.trabalho.cnpj = retorno.cnpj;
      }
    );
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

  salvarAlteracoesTrabalho(){
    this.trabalhoService.alterar(this.trabalho).subscribe(
      retorno => {
        this.trabalhoService.exibirToast(retorno.mensagem, "success");
      }
    );
  }
}
