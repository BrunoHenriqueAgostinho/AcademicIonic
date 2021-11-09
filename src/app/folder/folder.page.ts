import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ITrabalho } from '../model/ITrabalho.model';
import { TrabalhoService } from '../services/trabalho.service';
import { ModalController } from '@ionic/angular';
import { VisualizartrabalhoPage } from '../visualizartrabalho/visualizartrabalho.page';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {

  listaTrabalho: Observable<ITrabalho[]>;

  pesquisa = {
    pesquisa: ''
  };

  dataReturned: any;

  constructor(
    private trabalhoService: TrabalhoService,
    private router: Router,
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  pesquisar(){
    this.listaTrabalho = this.trabalhoService.pesquisar(this.pesquisa).pipe(delay(200));
    console.log(this.listaTrabalho);
  }

  async openModal(id) {
    const modal = await this.modalController.create({
      component: VisualizartrabalhoPage,
      componentProps: {
        "paramID": id,
        "paramTitle": "Visualizar Trabalho"
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
