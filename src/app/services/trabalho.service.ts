import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ITrabalho } from '../model/ITrabalho.model';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class TrabalhoService {

  //URL: string = 'http://localhost/apiTCC/api_academic/tb_trabalho/';
  URL: string = 'https://academicapitcc.herokuapp.com/api_academic/tb_trabalho';
  constructor(
    private http: HttpClient,
    private toastController: ToastController
  ) { }

  consultar(trabalho): Observable<any> {
    return this.http.post<any>(this.URL + "/consultar_trabalho.php", trabalho).pipe(
      map(retorno => retorno),
      catchError(erro => this.exibirToast(erro.error.erro, "danger"))
    );
  }

  inserir(trabalho): Observable<any> {
    return this.http.post(this.URL + "/inserir_trabalho.php", trabalho).pipe(
      map(retorno => retorno),
      catchError(erro =>  this.exibirToast(erro.error.erro, "danger"))
    );
  }

  alterar(trabalho): Observable<any> {
    return this.http.put(this.URL + "/alterar_trabalho.php", trabalho).pipe(
      map(retorno => retorno),
      catchError(erro =>  this.exibirToast(erro.error.erro, "danger"))
    );
  }

  publicar(trabalho): Observable<any> {
    return this.http.put(this.URL + "/publicar_trabalho.php", trabalho).pipe(
      map(retorno => retorno),
      catchError(erro => this.exibirToast(erro.error.erro, "danger"))
    );
  }

  listar(): Observable<ITrabalho[]> {
    return this.http.get<ITrabalho[]>(this.URL+ '/listar_trabalho.php').pipe(
      map(retorno => retorno),
      catchError(erro =>  this.exibirToast(erro.error.erro, "danger"))
    );
  }

  listar_meusTrabalhos(): Observable<ITrabalho[]> {
    return this.http.get<ITrabalho[]>(this.URL+ '/listar_meutrabalho.php').pipe(
      map(retorno => retorno),
      catchError(erro =>  this.exibirToast(erro.error.erro, "danger"))
    );
  }

  pesquisar(pesquisa): Observable<ITrabalho[]> {
    return this.http.post<ITrabalho[]>(this.URL+ '/pesquisar_trabalho.php', pesquisa).pipe(
      map(retorno => retorno),
      catchError(erro =>  this.exibirToast(erro.error.erro, "danger"))
    );
  }

  excluir(trabalho): Observable<any> {
    return this.http.post(this.URL + "/deletar_trabalho.php", trabalho).pipe(
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
    return null;
  }

  exibeErro(erro): Observable<any> {
    console.log(erro);
    return null;
  }
}
