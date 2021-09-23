import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ILogin } from '../model/ILogin.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //Variáveis
  URL: string = 'http://localhost/apiTCC/api_academic/login/login.php';
  
  constructor(
    private http: HttpClient,
    private toastController: ToastController,
    private alertController: AlertController
  ) { }

  //Login
  consultar(login): Observable<any> {
    return this.http.post(this.URL, login).pipe(
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
