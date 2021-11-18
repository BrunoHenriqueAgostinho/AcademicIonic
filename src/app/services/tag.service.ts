import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ITag } from '../model/ITag.model';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  //Variáveis
  //URL: string = 'http://localhost/apiTCC/api_academic/tb_tag';
  URL: string = 'https://academicapitcc.herokuapp.com/api_academic/tb_tag';


  constructor(
    private http: HttpClient,
    private toastController: ToastController
  ) { }

    listar(): Observable<ITag[]> {
      return this.http.get<ITag[]>(this.URL + "/listar_tag.php").pipe(
        map(retorno => retorno),
        catchError(erro =>  this.exibirToast(erro.error.erro, "danger"))
      );
    }

    consultar(trabalho): Observable<any> {
      return this.http.post(this.URL + "/consultar_tag.php", trabalho).pipe(
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
    console.log("Erro",erro);
    return null;
  }
}
