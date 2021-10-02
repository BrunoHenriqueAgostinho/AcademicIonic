import { Component, OnInit } from '@angular/core';
import { ITrabalho } from './../model/ITrabalho.model';
import { TrabalhoService } from './../services/trabalho.service';
import { Storage } from '@ionic/storage-angular';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-meustrabalhos-system',
  templateUrl: './meustrabalhos-system.page.html',
  styleUrls: ['./meustrabalhos-system.page.scss'],
})
export class MeustrabalhosSystemPage implements OnInit {

  listaTrabalho: Observable<ITrabalho[]>;
  constructor() { 
    this.listaTrabalho = this.trabalhoService.listar_meusTrabalhos().pipe(delay(1000));
  }

  ngOnInit() {
  }

}
