import { Component, OnInit } from '@angular/core';
import { ITrabalho } from './../model/ITrabalho.model';
import { Storage } from '@ionic/storage-angular';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { DesenvolveUsuarioTrabalhoService } from '../services/desenvolve-usuario-trabalho.service';
import { IUsuario } from '../model/IUsuario.model';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { InstituicaoService } from '../services/instituicao.service';
import { IInstituicao } from '../model/IInstituicao.model';

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

  listaTrabalho: Observable<ITrabalho[]>;

  tipo = '';

  constructor(
    private usuarioService: UsuarioService,
    private instituicaoService: InstituicaoService,
    private desenvolveService: DesenvolveUsuarioTrabalhoService,
    private storage: Storage,
    private router: Router
  ) { }

  async ngOnInit() {
    //Autenticação de acesso à página
    await this.storage.create();
    this.tipo = await this.storage.get('tipo');
    if (this.tipo == 'cpf'){
      this.usuario.cpf = String(await this.storage.get('codigo'));
      this.usuario.senha = await this.storage.get('senha');
      this.usuarioService.consultar(this.usuario).subscribe(
        retorno => {
          this.usuario = retorno;
        }
      );
    } else if (this.tipo == 'cnpj') {
      this.instituicao.cnpj = String(await this.storage.get('codigo'));
      this.instituicao.senha = await this.storage.get('senha');
      this.instituicaoService.consultar(this.instituicao).subscribe(
        retorno => {
          this.instituicao = retorno;
        }
      );
    } else {
      this.router.navigate(['/folder']);
    }


    //await this.storage.create();
    //this.usuario.cpf = String(await this.storage.get('codigo'));
    this.atualizar();
  }
  
  ionViewDidEnter(){
    this.atualizar();
  }

  abrirTrabalho(codigoTrabalho) {
    this.router.navigate(["/edicaotrabalho-system/" + codigoTrabalho]);
  }

  atualizar(){
    this.listaTrabalho = this.desenvolveService.listar(this.usuario).pipe(delay(1000));
  }

}
