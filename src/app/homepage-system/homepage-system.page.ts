import { Component, OnInit } from '@angular/core';
import { ITrabalho } from './../model/ITrabalho.model';
import { TrabalhoService } from './../services/trabalho.service';
import { Storage } from '@ionic/storage-angular';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';
import { InstituicaoService } from '../services/instituicao.service';
import { IUsuario } from '../model/IUsuario.model';

@Component({
  selector: 'app-homepage-system',
  templateUrl: './homepage-system.page.html',
  styleUrls: ['./homepage-system.page.scss'],
})
export class HomepageSystemPage implements OnInit {
  usuario: IUsuario = {
    cpf: 'a',
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
  tipo = '';
  listaTrabalho: Observable<ITrabalho[]>;
  constructor(
    private trabalhoService: TrabalhoService,
    private usuarioService: UsuarioService,
    private instituicaoService: InstituicaoService,
    private storage: Storage
  ) { 
    //this.listaTrabalho = this.trabalhoService.listar().pipe(delay(1000));
  }

  async ngOnInit() {
    await this.storage.create();
    //this.codigo = parseInt(await this.storage.get('codigo'));
    //this.senha = await this.storage.get('senha');
    this.tipo = await this.storage.get('tipo');
    if (this.tipo == 'cpf'){
      
      this.usuario.cpf = String(await this.storage.get('codigo'));
      this.usuario.senha = await this.storage.get('senha');
      console.log(this.usuario);
      this.usuarioService.consultar(this.usuario).subscribe(
        retorno => {
          console.log(retorno.nome);
        }
      );
    } else {
      
    }
    //console.log('Código: ', this.codigo, '. Senha: ', this.senha, this.tipo);
   
  }

  pesquisar(trab: any){
    
  }
  /*atualizar() {
    this.listaTrabalho = this.trabalhoService.listar().pipe(delay(500));
  }*/

}
