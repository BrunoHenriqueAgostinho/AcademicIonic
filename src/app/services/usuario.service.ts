import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { IUsuario } from '../model/IUsuario.model';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  URL = 'http://localhost/apiTCC/api_academic/tb_usuario/';
  constructor(
    private http: HttpClient,
    private toastController: ToastController
  ) { }

  inserir(usuario): Observable<any> {
    return this.http.post(this.URL + "inserir/", usuario).pipe(
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