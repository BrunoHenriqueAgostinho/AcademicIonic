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

  URL: string = 'http://localhost/apiTCC/api_academic/tb_trabalho/';
  constructor(
    private http: HttpClient,
    private toastController: ToastController
  ) { }

  listar(): Observable<ITrabalho[]> {
    return this.http.get<ITrabalho[]>(this.URL+ 'listar_trabalho.php').pipe(
      map(retorno => retorno),
      catchError(erro => this.exibeErro(erro))
    );
  }

  listar_meusTrabalhos(): Observable<ITrabalho[]> {
    return this.http.get<ITrabalho[]>(this.URL+ 'listar_meutrabalho.php').pipe(
      map(retorno => retorno),
      catchError(erro => this.exibeErro(erro))
    );
  }

  pesquisar(): Observable<ITrabalho[]> {
    return this.http.get<ITrabalho[]>(this.URL+ 'pesquisar_trabalho.php', ).pipe(
      map(retorno => retorno),
      catchError(erro => this.exibeErro(erro))
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
