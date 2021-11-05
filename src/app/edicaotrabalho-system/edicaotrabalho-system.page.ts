import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, PopoverController } from '@ionic/angular';
import { delay } from 'rxjs/operators';
import { ITrabalho } from '../model/ITrabalho.model';
import { TrabalhoService } from '../services/trabalho.service';
import { ModalController } from '@ionic/angular';
import { ParticipantesTrabalhoPage } from '../modals/participantes-trabalho/participantes-trabalho.page';
import { DesenvolveUsuarioTrabalhoService } from '../services/desenvolve-usuario-trabalho.service';
import { IDesenvolveusuariotrabalho } from '../model/IDesenvolveusuariotrabalho.model';
import { IUsuario } from '../model/IUsuario.model';
import { IInstituicao } from '../model/IInstituicao.model';
import { Storage } from '@ionic/storage-angular';
import { UsuarioService } from '../services/usuario.service';
import { InstituicaoService } from '../services/instituicao.service';
import { IModelo } from '../model/IModelo.model';
import { ModeloService } from '../services/modelo.service';

@Component({
  selector: 'app-edicaotrabalho-system',
  templateUrl: './edicaotrabalho-system.page.html',
  styleUrls: ['./edicaotrabalho-system.page.scss'],
})
export class EdicaotrabalhoSystemPage implements OnInit {
  
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

  arquivo: string = '';
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

  modelo: IModelo = {
    codigo: null,
    nome: 'novo trabalho',
    arquivo: '',
    margemDireita: '0cm',
    margemEsquerda: '0cm',
    margemTopo: '0cm',
    margemBaixo: '0cm',
    dtCriacao: null,
    descricao: '',
    cnpj: null
  }

  desenvolve: IDesenvolveusuariotrabalho = {
    cpf: '',
    codigo: null,
    cargo: null
  }

  dataReturned: any;

  tipo = '';
  booleanUsuario = false;
  booleanInstituicao = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storage: Storage,
    private usuarioService: UsuarioService,
    private instituicaoService: InstituicaoService,
    private trabalhoService: TrabalhoService,
    private desenvolveService: DesenvolveUsuarioTrabalhoService,
    private modeloService: ModeloService,
    public modalController: ModalController,
    private alertController: AlertController
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
      this.booleanUsuario = true;
      //Verificação de relacionamente entre usuário e trabalho
      this.desenvolve.cpf = this.usuario.cpf;
      this.desenvolve.codigo = Number(this.activatedRoute.snapshot.paramMap.get('codigoTrabalho'));
      this.desenvolveService.consultarUsuario(this.desenvolve).subscribe(
        retorno => {
          if(retorno.usuario == 0){
            this.router.navigate(['/homepage-system']);
          } else {
            //Busca por informações do trabalho
            this.trabalho.codigo = Number(this.activatedRoute.snapshot.paramMap.get('codigoTrabalho'));
            if(this.trabalho.codigo == 0){
              this.router.navigate(["/homepage-system/"]);
            } else {
              this.trabalhoService.consultar(this.trabalho).subscribe(
                retorno => {
                  this.trabalho.nome = retorno.nome;
                  this.trabalho.descricao = retorno.descricao;
                  this.trabalho.arquivo = retorno.arquivo;
                  this.trabalho.finalizado = retorno.finalizado;
                  this.trabalho.margemDireita = retorno.margemDireita;
                  this.trabalho.margemEsquerda = retorno.margemEsquerda;
                  this.trabalho.margemTopo = retorno.margemTopo;
                  this.trabalho.margemBaixo = retorno.margemBaixo;
                  this.trabalho.dtCriacao = retorno.dtCriacao;
                  this.trabalho.dtAlteracao = retorno.dtAlteracao;
                  this.trabalho.dtPublicacao = retorno.dtPublicacao;
                  this.trabalho.avaliacao = retorno.avaliacao;
                  this.trabalho.modelo = retorno.modelo;
                  this.trabalho.cnpj = retorno.cnpj;
                  this.mudarTrabalho();
                }
              );
            }
          }
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
      this.booleanInstituicao = true;
      //Verificação de relacionamente entre instituicao e modelo
      this.modelo.codigo = Number(this.activatedRoute.snapshot.paramMap.get('codigoModelo'));
      this.modelo.cnpj = this.instituicao.cnpj;
      this.modeloService.consultarInstituicao(this.modelo).subscribe(
        retorno => {
          if(retorno.instituicao == 0){
            this.router.navigate(['/homepage-system']);
          } else {
            //Busca por informações da instituicao
            this.modeloService.consultar(this.modelo).subscribe(
              retorno => {
                this.modelo.nome = retorno.nome;
                this.modelo.arquivo = retorno.arquivo;
                this.modelo.margemDireita = retorno.margemDireita;
                this.modelo.margemEsquerda = retorno.margemEsquerda;
                this.modelo.margemTopo = retorno.margemTopo;
                this.modelo.margemBaixo = retorno.margemBaixo;
                this.modelo.descricao = retorno.descricao;
                this.modelo.dtCriacao = retorno.dtCriacao;
                this.mudarModelo();
                console.log(this.modelo);
              }
            );
          }
        }
      );
    } else {
      this.router.navigate(['/folder']);
    }
  }

  salvarTrabalho() {
    this.trabalho.arquivo = window.frames['textField'].document.body.innerHTML;
    this.testeArquivoTrabalho();
    this.trabalhoService.alterar(this.trabalho).subscribe(
      retorno => {
        console.log(retorno);
      }
    );
  }

  salvarModelo() {
    this.modelo.arquivo = window.frames['textField'].document.body.innerHTML;
    this.testeArquivoModelo();
    this.modeloService.alterar(this.modelo).subscribe(
      retorno => {
        console.log(retorno);
      }
    );
  }

  async deletarTrabalho() {
    this.desenvolve.codigo = this.trabalho.codigo;
    const alerta = await this.alertController.create({
      cssClass: 'alerta',
      header: 'Você tem certeza que deseja deletar esse trabalho?',
      message: 'Ao deletar esse trabalho, todos os membros perdem acesso a ele.',
      buttons: [
        {
          text:'Cancelar',
          role: 'cancel'
        },
        {
          text:'Deletar',
          handler:() => {
            this.trabalhoService.excluir(this.trabalho).subscribe(
              retorno => {
                this.trabalhoService.exibirToast(retorno.mensagem, "success");
              }
            );
            this.router.navigate(["/meustrabalhos-system"]);
          }
        }
      ]
    });
    await alerta.present();
  }

  async deletarModelo() {
    this.desenvolve.codigo = this.trabalho.codigo;
    const alerta = await this.alertController.create({
      cssClass: 'alerta',
      header: 'Você tem certeza que deseja deletar esse modelo?',
      message: 'Ao deletar esse modelo, todos que já utilizaram o modelo continuaram com seus trabalhos.',
      buttons: [
        {
          text:'Cancelar',
          role: 'cancel'
        },
        {
          text:'Deletar',
          handler:() => {
            console.log(this.modelo.codigo);
            this.modeloService.excluir(this.modelo).subscribe(
              retorno => {
                this.modeloService.exibirToast(retorno.mensagem, "success");
              }
            );
            this.router.navigate(["/meusmodelos-system"]);
          }
        }
      ]
    });
    await alerta.present();
  }

  async publicar(){
    const alerta = await this.alertController.create({
      cssClass: 'alerta',
      header: 'Você tem certeza que deseja publicar esse trabalho?',
      message: 'Ao publicar seu trabalho, qualquer pessoa poderá pesquisar por ele.',
      buttons: [
        {
          text:'Cancelar',
          role: 'cancel'
        },
        {
          text:'Publicar',
          handler:() => {
            this.trabalho.finalizado = 1;
            this.trabalhoService.publicar(this.trabalho).subscribe(
              retorno => this.trabalhoService.exibirToast(retorno.mensagem, "success")
            );
          }
        }
      ]
    });
    await alerta.present();
    
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: ParticipantesTrabalhoPage,
      componentProps: {
        "paramID": this.trabalho.codigo,
        "paramTitle": "Participantes do Trabalho"
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

  testeArquivoTrabalho() {
    this.trabalho.arquivo = this.trabalho.arquivo.replace('align="center" style="text-align: right;"', 'align="right"');
    this.trabalho.arquivo = this.trabalho.arquivo.replace('align="center" style="text-align: left;"', 'align="left"');
    this.trabalho.arquivo = this.trabalho.arquivo.replace('align="center" style="text-align: center;"', 'align="center"');
    this.trabalho.arquivo = this.trabalho.arquivo.replace('align="center" style="text-align: justify;"', 'align="justify"');

    this.trabalho.arquivo = this.trabalho.arquivo.replace('align="right" style="text-align: right;"', 'align="right"');
    this.trabalho.arquivo = this.trabalho.arquivo.replace('align="right" style="text-align: left;"', 'align="left"');
    this.trabalho.arquivo = this.trabalho.arquivo.replace('align="right" style="text-align: center;"', 'align="center"');
    this.trabalho.arquivo = this.trabalho.arquivo.replace('align="right" style="text-align: justify;"', 'align="justify"');

    this.trabalho.arquivo = this.trabalho.arquivo.replace('align="left" style="text-align: right;"', 'align="right"');
    this.trabalho.arquivo = this.trabalho.arquivo.replace('align="left" style="text-align: left;"', 'align="left"');
    this.trabalho.arquivo = this.trabalho.arquivo.replace('align="left" style="text-align: center;"', 'align="center"');
    this.trabalho.arquivo = this.trabalho.arquivo.replace('align="left" style="text-align: justify;"', 'align="justify"');

    this.trabalho.arquivo = this.trabalho.arquivo.replace('align="justify" style="text-align: right;"', 'align="right"');
    this.trabalho.arquivo = this.trabalho.arquivo.replace('align="justify" style="text-align: left;"', 'align="left"');
    this.trabalho.arquivo = this.trabalho.arquivo.replace('align="justify" style="text-align: center;"', 'align="center"');
    this.trabalho.arquivo = this.trabalho.arquivo.replace('align="justify" style="text-align: justify;"', 'align="justify"');

    this.trabalho.arquivo = this.trabalho.arquivo.replace('style="text-align: center;"', 'align="center"');
    this.trabalho.arquivo = this.trabalho.arquivo.replace('style="text-align: left;"', 'align="left"');
    this.trabalho.arquivo = this.trabalho.arquivo.replace('style="text-align: right;"', 'align="right"');
    this.trabalho.arquivo = this.trabalho.arquivo.replace('style="text-align: justify;"', 'align="justify"');
  }

  testeArquivoModelo() {
    this.modelo.arquivo = this.modelo.arquivo.replace('align="center" style="text-align: right;"', 'align="right"');
    this.modelo.arquivo = this.modelo.arquivo.replace('align="center" style="text-align: left;"', 'align="left"');
    this.modelo.arquivo = this.modelo.arquivo.replace('align="center" style="text-align: center;"', 'align="center"');
    this.modelo.arquivo = this.modelo.arquivo.replace('align="center" style="text-align: justify;"', 'align="justify"');

    this.modelo.arquivo = this.modelo.arquivo.replace('align="right" style="text-align: right;"', 'align="right"');
    this.modelo.arquivo = this.modelo.arquivo.replace('align="right" style="text-align: left;"', 'align="left"');
    this.modelo.arquivo = this.modelo.arquivo.replace('align="right" style="text-align: center;"', 'align="center"');
    this.modelo.arquivo = this.modelo.arquivo.replace('align="right" style="text-align: justify;"', 'align="justify"');

    this.modelo.arquivo = this.modelo.arquivo.replace('align="left" style="text-align: right;"', 'align="right"');
    this.modelo.arquivo = this.modelo.arquivo.replace('align="left" style="text-align: left;"', 'align="left"');
    this.modelo.arquivo = this.modelo.arquivo.replace('align="left" style="text-align: center;"', 'align="center"');
    this.modelo.arquivo = this.modelo.arquivo.replace('align="left" style="text-align: justify;"', 'align="justify"');

    this.modelo.arquivo = this.modelo.arquivo.replace('align="justify" style="text-align: right;"', 'align="right"');
    this.modelo.arquivo = this.modelo.arquivo.replace('align="justify" style="text-align: left;"', 'align="left"');
    this.modelo.arquivo = this.modelo.arquivo.replace('align="justify" style="text-align: center;"', 'align="center"');
    this.modelo.arquivo = this.modelo.arquivo.replace('align="justify" style="text-align: justify;"', 'align="justify"');

    this.modelo.arquivo = this.modelo.arquivo.replace('style="text-align: center;"', 'align="center"');
    this.modelo.arquivo = this.modelo.arquivo.replace('style="text-align: left;"', 'align="left"');
    this.modelo.arquivo = this.modelo.arquivo.replace('style="text-align: right;"', 'align="right"');
    this.modelo.arquivo = this.modelo.arquivo.replace('style="text-align: justify;"', 'align="justify"');
  }

  mudarTrabalho() {
    document.getElementById("textField").style.paddingLeft = this.trabalho.margemEsquerda;
    document.getElementById("textField").style.paddingRight = this.trabalho.margemDireita;
    document.getElementById("textField").style.paddingTop = this.trabalho.margemTopo;
    document.getElementById("textField").style.paddingBottom = this.trabalho.margemBaixo;
  }

  mudarModelo() {
    document.getElementById("textField").style.paddingLeft = this.modelo.margemEsquerda;
    document.getElementById("textField").style.paddingRight = this.modelo.margemDireita;
    document.getElementById("textField").style.paddingTop = this.modelo.margemTopo;
    document.getElementById("textField").style.paddingBottom = this.modelo.margemBaixo;
  }
}
