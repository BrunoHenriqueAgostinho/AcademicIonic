import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { IApresentatrabalhotag } from 'src/app/model/IApresentatrabalhotag.model';
import { ITag } from 'src/app/model/ITag.model';
import { ITrabalho } from 'src/app/model/ITrabalho.model';
import { ApresentaTrabalhoTagService } from 'src/app/services/apresenta-trabalho-tag.service';
import { TagService } from 'src/app/services/tag.service';
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

  listaTag: Observable<ITag[]>;
  tag: IApresentatrabalhotag = {
    codigo: 0,
    tag: 0
  }

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private trabalhoService: TrabalhoService,
    private tagService: TagService,
    private apresentaTagService: ApresentaTrabalhoTagService
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
    this.listaTag = this.tagService.listar().pipe(delay(0));
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

  inserirExcluirTag(tag){
    this.tag.tag = tag;
    this.tag.codigo = this.trabalho.codigo;
    this.apresentaTagService.inserirExcluir(this.tag).subscribe(
      retorno => {
        this.apresentaTagService.exibirToast(retorno.mensagem, "success");
      }
    );
  }
}
