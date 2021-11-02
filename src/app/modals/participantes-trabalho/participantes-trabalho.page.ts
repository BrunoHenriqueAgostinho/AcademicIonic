import { Component, OnInit } from '@angular/core';
import { DesenvolveUsuarioTrabalhoService } from 'src/app/services/desenvolve-usuario-trabalho.service';
import { IDesenvolve } from 'src/app/model/IDesenvolve.model';
import { 
  AlertController,
  ModalController, 
  NavParams 
  } from '@ionic/angular';
import { IUsuario } from 'src/app/model/IUsuario.model';
import { Observable } from 'rxjs';
import { ITrabalho } from 'src/app/model/ITrabalho.model';
import { delay } from 'rxjs/operators';
import { IDesenvolveusuariotrabalho } from 'src/app/model/IDesenvolveusuariotrabalho.model';
import { IPesquisa } from 'src/app/model/IPesquisa.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-participantes-trabalho',
  templateUrl: './participantes-trabalho.page.html',
  styleUrls: ['./participantes-trabalho.page.scss'],
})
export class ParticipantesTrabalhoPage implements OnInit {

  tituloModal: string;
  codigoModal: number;
  dataReturned: any;

  listaMembros: Observable<IDesenvolve[]>;
  listaUsuarios: Observable<IUsuario[]>;

  pesquisa: IPesquisa = {
    pesquisa: ''
  }

  desenvolve : IDesenvolveusuariotrabalho = {
    cpf: '',
    codigo: null,
    cargo: null
  }

  trabalho: ITrabalho = {
    codigo: null,
    nome: 'novo trabalho',
    descricao: '',
    arquivo: '',
    margemDireita: '',
    margemEsquerda: '',
    margemTopo: '',
    margemBaixo: '',
    finalizado: 0,
    dtCriacao: null,
    dtAlteracao: null,
    dtPublicacao: null,
    avaliacao: null,
    modelo: null,
    cnpj: null
  }

  selectCargo = null;

  constructor(
    private desenvolveService: DesenvolveUsuarioTrabalhoService,
    private usuarioService: UsuarioService,
    private modalController: ModalController,
    private navParams: NavParams,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.codigoModal = this.navParams.data.paramID;
    this.tituloModal = this.navParams.data.paramTitle;
    this.trabalho.codigo = Number(this.codigoModal);
    this.listaMembros = this.desenvolveService.listarUsuariosTrabalho(this.trabalho).pipe(delay(200));
    console.log(this.listaMembros);
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

  async excluirUsuarioTrabalho(cpf) {
    this.desenvolve.codigo = this.trabalho.codigo;
    this.desenvolve.cpf = String(cpf);
    console.table(this.desenvolve);
    const alerta = await this.alertController.create({
      cssClass: 'alerta',
      header: 'Você tem certeza que deseja desvincular esse membro do trabalho?',
      message: 'Esse membro não poderá mais acessar as funções de edição desse trabalho.',
      buttons: [
        {
          text:'Cancelar',
          role: 'cancel'
        },
        {
          text:'Desvincular',
          handler:() => {
            this.desenvolveService.excluir(this.desenvolve).subscribe(
              (dados)=>{
                console.log(dados);
                this.listaMembros = this.desenvolveService.listarUsuariosTrabalho(this.trabalho).pipe(delay(200));
              }
            );
          }
        }
      ]
    });
    await alerta.present();
  }

  adicionarUsuarioTrabalho(cpf) {
    this.desenvolve.cpf = cpf;
    this.desenvolve.codigo = this.trabalho.codigo;
    this.desenvolveService.inserir(this.desenvolve).subscribe(
      retorno => {
        this.desenvolveService.exibirToast(retorno.mensagem, 'success');
      }
    );
  }

  alterar(cargo, cpf) {
    this.desenvolve.codigo = this.trabalho.codigo;
    this.desenvolve.cpf = cpf;
    this.desenvolve.cargo = cargo.detail.value;
    this.desenvolveService.alterar(this.desenvolve).subscribe(
      retorno => {
        this.desenvolveService.exibirToast(retorno.mensagem, 'success');
      }
    );
  }
  
  listarUsuarios() {
    this.listaUsuarios = this.usuarioService.listar(this.pesquisa).pipe(delay(200));
  }
}
