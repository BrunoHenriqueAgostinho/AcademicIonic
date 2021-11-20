import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { IModelo } from 'src/app/model/IModelo.model';
import { ModeloService } from 'src/app/services/modelo.service';

@Component({
  selector: 'app-propriedadesmodelo',
  templateUrl: './propriedadesmodelo.page.html',
  styleUrls: ['./propriedadesmodelo.page.scss'],
})
export class PropriedadesmodeloPage implements OnInit {

  tituloModal: string;
  codigoModal: number;
  dataReturned: any;

  modelo: IModelo = {
    codigo: null,
    nome: '',
    arquivo: '',
    margemDireita: '0cm',
    margemEsquerda: '0cm',
    margemTopo: '0cm',
    margemBaixo: '0cm',
    dtCriacao: null,
    descricao: '',
    cnpj: null
  }

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private modeloService: ModeloService
  ) { }

  ngOnInit() {
    this.codigoModal = this.navParams.data.paramID;
    this.tituloModal = this.navParams.data.paramTitle;
    this.modelo.codigo = Number(this.codigoModal);

    this.modeloService.consultar(this.modelo).subscribe(
      retorno => {
        this.modelo.nome = retorno.nome;
        this.modelo.descricao = retorno.descricao;
        this.modelo.arquivo = retorno.arquivo;
        this.modelo.margemDireita = retorno.margemDireita;
        this.modelo.margemEsquerda = retorno.margemEsquerda;
        this.modelo.margemTopo = retorno.margemTopo;
        this.modelo.margemBaixo = retorno.margemBaixo;
        this.modelo.dtCriacao = retorno.dtAlteracao;
        this.modelo.cnpj = retorno.cnpj;
      }
    );
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

  salvarAlteracoesModelo(){
    this.modeloService.alterar(this.modelo).subscribe(
      retorno => {
        this.modeloService.exibirToast(retorno.mensagem, "success");
      }
    );
  }

}
