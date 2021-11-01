import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { IDesenvolve } from '../model/IDesenvolve.model';
import { ITrabalho } from '../model/ITrabalho.model';
import { DesenvolveUsuarioTrabalhoService } from '../services/desenvolve-usuario-trabalho.service';
import { TrabalhoService } from '../services/trabalho.service';

@Component({
  selector: 'app-visualizartrabalho',
  templateUrl: './visualizartrabalho.page.html',
  styleUrls: ['./visualizartrabalho.page.scss'],
})
export class VisualizartrabalhoPage implements OnInit {

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

  listaMembros: Observable<IDesenvolve[]>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private trabalhoService: TrabalhoService,
    private desenvolveService: DesenvolveUsuarioTrabalhoService
  ) { }

  ngOnInit() {
    this.trabalho.codigo = Number(this.activatedRoute.snapshot.paramMap.get('codigoTrabalho'));
    this.trabalhoService.consultar(this.trabalho).subscribe(
      retorno => {
        this.trabalho.nome = retorno.nome;
        this.trabalho.descricao = retorno.descricao;
        this.trabalho.arquivo = retorno.arquivo;
        this.trabalho.dtPublicacao = retorno.dtPublicacao;
        this.trabalho.margemDireita = retorno.margemDireita;
        this.trabalho.margemEsquerda = retorno.margemEsquerda;
        this.trabalho.margemTopo = retorno.margemTopo;
        this.trabalho.margemBaixo = retorno.margemBaixo;
        this.mudar();
      }
    );
    this.listaMembros = this.desenvolveService.listarUsuariosTrabalho(this.trabalho).pipe(delay(200));
  }

  mudar() {
    document.getElementById("textField").style.paddingLeft = this.trabalho.margemEsquerda;
    document.getElementById("textField").style.paddingRight = this.trabalho.margemDireita;
    document.getElementById("textField").style.paddingTop = this.trabalho.margemTopo;
    document.getElementById("textField").style.paddingBottom = this.trabalho.margemBaixo;
  }

}
