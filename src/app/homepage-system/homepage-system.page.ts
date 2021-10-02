import { Component, OnInit } from '@angular/core';
import { ITrabalho } from './../model/ITrabalho.model';
import { TrabalhoService } from './../services/trabalho.service';
import { Storage } from '@ionic/storage-angular';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-homepage-system',
  templateUrl: './homepage-system.page.html',
  styleUrls: ['./homepage-system.page.scss'],
})
export class HomepageSystemPage implements OnInit {

  codigo = 0;
  senha = '';
  tipo = '';
  listaTrabalho: Observable<ITrabalho[]>;
  constructor(
    private trabalhoService: TrabalhoService,
    private storage: Storage
  ) { 
    this.listaTrabalho = this.trabalhoService.listar().pipe(delay(1000));
  }

  async ngOnInit() {
    await this.storage.create();
    this.codigo = parseInt(await this.storage.get('codigo'));
    this.senha = await this.storage.get('senha');
    this.tipo = await this.storage.get('tipo');
    console.log('Código: ', this.codigo, '. Senha: ', this.senha, this.tipo);
  }

  pesquisar(trab: any){
    
  }
  /*atualizar() {
    this.listaTrabalho = this.trabalhoService.listar().pipe(delay(500));
  }*/

}
