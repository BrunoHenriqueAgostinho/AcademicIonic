import { Component, OnInit } from '@angular/core';
import { DesenvolveUsuarioTrabalhoService } from 'src/app/services/desenvolve-usuario-trabalho.service';
import { IDesenvolve } from 'src/app/model/IDesenvolve.model';
import { 
  ModalController, 
  NavParams 
  } from '@ionic/angular';
import { IUsuario } from 'src/app/model/IUsuario.model';
import { Observable } from 'rxjs';
import { ITrabalho } from 'src/app/model/ITrabalho.model';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-participantes-trabalho',
  templateUrl: './participantes-trabalho.page.html',
  styleUrls: ['./participantes-trabalho.page.scss'],
})
export class ParticipantesTrabalhoPage implements OnInit {

  tituloModal: string;
  codigoModal: number;
  dataReturned: any;

  listaUsuario: Observable<IDesenvolve[]>;

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

  constructor(
    private desenvolveService: DesenvolveUsuarioTrabalhoService,
    private modalController: ModalController,
    private navParams: NavParams
  ) { }

  ngOnInit() {
    this.codigoModal = this.navParams.data.paramID;
    this.tituloModal = this.navParams.data.paramTitle;
    this.trabalho.codigo = Number(this.codigoModal);
    this.listaUsuario = this.desenvolveService.listarUsuariosTrabalho(this.trabalho).pipe(delay(200));
    console.log(this.listaUsuario);
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

}
