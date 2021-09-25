import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-homepage-system',
  templateUrl: './homepage-system.page.html',
  styleUrls: ['./homepage-system.page.scss'],
})
export class HomepageSystemPage implements OnInit {

  codigo = 0;
  senha = '';
  tipo = '';
  constructor(
    private storage: Storage
  ) { }

  async ngOnInit() {
    await this.storage.create();
    this.codigo = parseInt(await this.storage.get('codigo'));
    this.senha = await this.storage.get('senha');
    this.tipo = await this.storage.get('tipo');
    console.log('Código: ', this.codigo, '. Senha: ', this.senha, this.tipo);
  }

}
