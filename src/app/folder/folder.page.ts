import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ITrabalho } from '../model/ITrabalho.model';
import { TrabalhoService } from '../services/trabalho.service';
import { ModalController } from '@ionic/angular';
import { VisualizartrabalhoPage } from '../visualizartrabalho/visualizartrabalho.page';
import { Storage } from '@ionic/storage-angular';

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
  tipo = '';

  constructor(
    private trabalhoService: TrabalhoService,
    private router: Router,
    private modalController: ModalController,
    private storage: Storage
  ) { }

  async ngOnInit() {
    //Autenticação de acesso à página
    await this.storage.create();
    this.tipo = await this.storage.get('tipo');
    if (this.tipo == 'cpf' || this.tipo == 'cnpj'){
      this.router.navigate(['/homepage-system']);
    }
  }

  pesquisar(){
    this.listaTrabalho = this.trabalhoService.pesquisar(this.pesquisa).pipe(delay(200));
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
