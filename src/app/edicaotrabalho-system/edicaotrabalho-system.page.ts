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

  desenvolve: IDesenvolveusuariotrabalho = {
    cpf: '',
    codigo: null,
    cargo: null
  }

  dataReturned: any;

  tipo = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storage: Storage,
    private usuarioService: UsuarioService,
    private instituicaoService: InstituicaoService,
    private trabalhoService: TrabalhoService,
    private desenvolveService: DesenvolveUsuarioTrabalhoService,
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
                  this.mudar();
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
    } else {
      this.router.navigate(['/folder']);
    }


    //somente deve ser executado caso seja um membro do trabalho
    
  }

  salvar() {
    this.trabalho.arquivo = window.frames['textField'].document.body.innerHTML;
    this.testeArquivo();
    this.trabalhoService.alterar(this.trabalho).subscribe(
      retorno => {
        console.log(retorno);
      }
    );
  }

  async deletar() {
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

  testeArquivo() {
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

  mudar() {
    document.getElementById("textField").style.paddingLeft = this.trabalho.margemEsquerda;
    document.getElementById("textField").style.paddingRight = this.trabalho.margemDireita;
    document.getElementById("textField").style.paddingTop = this.trabalho.margemTopo;
    document.getElementById("textField").style.paddingBottom = this.trabalho.margemBaixo;
  }
}
