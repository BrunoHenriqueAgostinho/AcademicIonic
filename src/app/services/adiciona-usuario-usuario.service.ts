import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IAdicionausuariousuario } from '../model/IAdicionausuariousuario.model';

@Injectable({
  providedIn: 'root'
})
export class AdicionaUsuarioUsuarioService {

//Variáveis
//URL: string = 'http://localhost/apiTCC/api_academic/adiciona_usuario_usuario';
URL: string = 'https://academicapitcc.herokuapp.com/api_academic/adiciona_usuario_usuario';

constructor(
    private http: HttpClient,
    private toastController: ToastController,
    private alertController: AlertController
  ) { }

  contar_seguidores(usuario): Observable<any> {
    return this.http.post(this.URL + "/contar_seguidores.php", usuario).pipe(
      map(retorno => retorno),
      catchError(erro => this.exibirToast(erro.error.erro, "danger"))
    );
  }

  contar_seguidos(usuario): Observable<any> {
    return this.http.post(this.URL + "/contar_seguidos.php", usuario).pipe(
      map(retorno => retorno),
      catchError(erro => this.exibirToast(erro.error.erro, "danger"))
    );
  }

  listar_seguidos(usuario): Observable<IAdicionausuariousuario[]> {
    return this.http.post(this.URL + "/listar_seguidos.php", usuario).pipe(
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
