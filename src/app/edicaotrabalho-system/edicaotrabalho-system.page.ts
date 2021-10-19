import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { delay } from 'rxjs/operators';
import { ITrabalho } from '../model/ITrabalho.model';
import { TrabalhoService } from '../services/trabalho.service';
import { ModalController } from '@ionic/angular';
import { ParticipantesTrabalhoPage } from '../modals/participantes-trabalho/participantes-trabalho.page';

@Component({
  selector: 'app-edicaotrabalho-system',
  templateUrl: './edicaotrabalho-system.page.html',
  styleUrls: ['./edicaotrabalho-system.page.scss'],
})
export class EdicaotrabalhoSystemPage implements OnInit {

  arquivo: string = '';
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
  dataReturned: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private trabalhoService: TrabalhoService,
    public modalController: ModalController
  ) { }

  ngOnInit() {
    this.trabalho.codigo = Number(this.activatedRoute.snapshot.paramMap.get('codigoTrabalho'));
    console.log(this.trabalho.codigo);
    if(this.trabalho.codigo == 0){
      this.router.navigate(["/homepage-system/"]);
    } else {
      console.log(this.trabalho);
      this.trabalhoService.consultar(this.trabalho).subscribe(
        retorno => {
          this.trabalho.nome = retorno.nome;
          this.trabalho.descricao = retorno.descricao;
          this.trabalho.arquivo = retorno.arquivo;
          this.trabalho.formatacao = retorno.formatacao;
          this.trabalho.finalizado = retorno.finalizado;
          this.trabalho.dtCriacao = retorno.dtCriacao;
          this.trabalho.dtAlteracao = retorno.dtAlteracao;
          this.trabalho.dtPublicacao = retorno.dtPublicacao;
          this.trabalho.avaliacao = retorno.avaliacao;
          this.trabalho.modelo = retorno.modelo;
          this.trabalho.cnpj = retorno.cnpj;
        }
      );
    }
  }

  salvar() {
    this.trabalho.arquivo = window.frames['textField'].document.body.innerHTML;
    this.trabalhoService.alterar(this.trabalho).subscribe(
      retorno => {
        console.log(retorno);
      }
    );
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: ParticipantesTrabalhoPage,
      componentProps: {
        "paramID": this.trabalho.codigo,
        "paramTitle": "Participantes do Trabalho"
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        //alert('Modal Sent Data :'+ dataReturned);
      }
    });

    return await modal.present();
  }
}
