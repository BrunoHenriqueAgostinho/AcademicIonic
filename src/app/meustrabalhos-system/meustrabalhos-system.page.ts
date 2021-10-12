import { Component, OnInit } from '@angular/core';
import { ITrabalho } from './../model/ITrabalho.model';
import { TrabalhoService } from './../services/trabalho.service';
import { Storage } from '@ionic/storage-angular';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { DesenvolveUsuarioTrabalhoService } from '../services/desenvolve-usuario-trabalho.service';
import { IUsuario } from '../model/IUsuario.model';

@Component({
  selector: 'app-meustrabalhos-system',
  templateUrl: './meustrabalhos-system.page.html',
  styleUrls: ['./meustrabalhos-system.page.scss'],
})
export class MeustrabalhosSystemPage implements OnInit {

  usuario: IUsuario = {
    cpf: '',
    nome: '',
    senha: '',
    descricao: '',
    foto: '',
    dtCadastro: null,
    tema: null,
    status: null,
    contaStatus: null,
    email: '',
    telefoneFixo: '',
    telefoneCelular: ''
  }

  listaTrabalho: Observable<ITrabalho[]>;

  constructor(
    private trabalhoService: TrabalhoService,
    private desenvolveService: DesenvolveUsuarioTrabalhoService,
    private storage: Storage
    ) {
      this.desenvolveService.listar(this.usuario).subscribe(
        retorno => {
          console.log(retorno);
        }
      );
      //this.listaTrabalho = this.desenvolveService.listar(this.usuario).pipe(delay(1000));
  }

  async ngOnInit() {
    await this.storage.create();
    this.usuario.cpf = await this.storage.get('codigo');
  }

}
