import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApresentaTrabalhoTagService {

  //URL: string = 'http://localhost/apiTCC/api_academic/apresenta_trabalho_tag';
  URL: string = 'https://academicapitcc.herokuapp.com/api_academic/apresenta_trabalho_tag';


  constructor(
    private http: HttpClient,
    private toastController: ToastController
  ) { }


  inserirExcluir(apresentatrabalhotag): Observable<any> {
    return this.http.post(this.URL + "/inserirDeletar_trabalhotag.php", apresentatrabalhotag).pipe(
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
