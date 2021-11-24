import { Component, OnInit } from '@angular/core';
import { ITrabalho } from './../model/ITrabalho.model';
import { TrabalhoService } from './../services/trabalho.service';

import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';
import { InstituicaoService } from '../services/instituicao.service';
import { IUsuario } from '../model/IUsuario.model';
import { CompileShallowModuleMetadata } from '@angular/compiler';
import { Router } from '@angular/router';
import { IInstituicao } from '../model/IInstituicao.model';
import { ModalController } from '@ionic/angular';
import { VisualizartrabalhoPage } from '../visualizartrabalho/visualizartrabalho.page';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-homepage-system',
  templateUrl: './homepage-system.page.html',
  styleUrls: ['./homepage-system.page.scss'],
})
export class HomepageSystemPage implements OnInit {
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

  instituicao : IInstituicao = {
    cnpj: '',
    nome: '',
    logotipo: '',
    dtCadastro: null,
    senha: '',
    contaStatus: null,
    email: '',
    telefoneFixo: '',
    telefoneCelular: '',
    cidade: ''
  }

  tipo = '';
  pesquisa = {
    pesquisa: ''
  };
  
  listaTrabalho: Observable<ITrabalho[]>;

  booleanUsuario = false;
  booleanInstituicao = false;
  dataReturned: any;

  constructor(
    private trabalhoService: TrabalhoService,
    private usuarioService: UsuarioService,
    private instituicaoService: InstituicaoService,
    private router: Router,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    //Autenticação de acesso à página
    this.tipo = environment.tipo;
    if (this.tipo == 'cpf'){
      this.usuario.cpf = String(environment.codigo);
      this.usuario.senha = environment.senha;
      this.usuarioService.consultar(this.usuario).subscribe(
        retorno => {
          this.usuario = retorno;
        }
      );
      this.booleanUsuario = true;
    } else if (this.tipo == 'cnpj') {
      this.instituicao.cnpj = String(environment.codigo);
      this.instituicao.senha = environment.senha;
      this.instituicaoService.consultar(this.instituicao).subscribe(
        retorno => {
          this.instituicao = retorno;
        }
      );
      this.booleanInstituicao = true;
    } else {
      this.router.navigate(['/folder']);
    }
  }

  pesquisar(){
    this.listaTrabalho = this.trabalhoService.pesquisar(this.pesquisa).pipe(delay(200));
  }

  atualizar() {
    this.listaTrabalho = this.trabalhoService.listar().pipe(delay(200));
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
