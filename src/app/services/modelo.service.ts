import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IModelo } from '../model/IModelo.model';

@Injectable({
  providedIn: 'root'
})
export class ModeloService {

  //Variáveis
  //URL: string = 'http://localhost/apiTCC/api_academic/tb_modelo';
  URL: string = 'https://academicapitcc.herokuapp.com/api_academic/tb_modelo';


  constructor(
    private http: HttpClient,
    private toastController: ToastController,
    private alertController: AlertController
  ) { }

  consultar(modelo): Observable<any> {
    return this.http.post(this.URL + '/consultar_modelo.php', modelo).pipe(
      map(retorno => retorno),
      catchError(erro => this.exibirToast(erro.error.erro, 'danger'))
    );
  }

  consultarInstituicao(modelo): Observable<any> {
    return this.http.post(this.URL + "/consultarInstituicao_modelo.php", modelo).pipe(
      map(retorno => retorno),
      catchError(erro => this.exibirToast(erro.error.erro, "danger"))
    );
  }

  listar(pesquisa): Observable<any[]> {
    return this.http.post<any[]>(this.URL+ '/listar_modelo.php', pesquisa).pipe(
      map(retorno => retorno),
      catchError(erro => this.exibeErro(erro))
    );
  }

  listarPorCnpj(instituicao): Observable<any[]> {
    return this.http.post<any[]>(this.URL+ '/listarPorCnpj_modelo.php', instituicao).pipe(
      map(retorno => retorno),
      catchError(erro => this.exibeErro(erro))
    );
  }

  inserir(modelo): Observable<any> {
    return this.http.post(this.URL + "/inserir_modelo.php", modelo).pipe(
      map(retorno => retorno),
      catchError(erro => this.exibirToast(erro.error.erro, "danger"))
    );
  }

  //alterar_modelo.php
  alterar(modelo): Observable<any> {
    return this.http.put(this.URL + "/alterar_modelo.php", modelo).pipe(
      map(retorno => retorno),
      catchError(erro => this.exibirToast(erro.error.erro, "danger"))
    );
  }

  excluir(modelo): Observable<any> {
    return this.http.post(this.URL + "/deletar_modelo.php", modelo).pipe(
      map(retorno => retorno),
      catchError(erro =>  this.exibirToast(erro.error.erro, "danger"))
    );
  }

  async exibirToast(mensagem, cor) {
    const toast = await this.toastController.create(
      {
        message: mensagem,
        duration: 2000,
        color: cor,
        position: 'bottom'
      }
    );
    toast.present();
  }

  exibeErro(erro): Observable<any> {
    console.log(erro);
    return null;
  }
}
