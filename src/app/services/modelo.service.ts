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
  URL: string = 'http://localhost/apiTCC/api_academic/tb_modelo';

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
