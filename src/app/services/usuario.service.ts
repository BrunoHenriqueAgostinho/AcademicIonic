import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IUsuario } from '../model/IUsuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  //Variáveis
  //URL: string = 'http://localhost/apiTCC/api_academic/tb_usuario';
  URL: string = 'https://academicapitcc.herokuapp.com/api_academic/tb_usuario';

  constructor(
    private http: HttpClient,
    private toastController: ToastController,
    private alertController: AlertController
  ) { }

  //CRUD e outros métodos
  consultar(usuario): Observable<IUsuario> {
    return this.http.post<IUsuario>(this.URL + "/consultar_usuario.php", usuario).pipe(
      map(retorno => retorno),
      catchError(erro => this.exibeErro(erro))
    );
  }

  inserir(usuario): Observable<any> {
    return this.http.post(this.URL + "/inserirCad_usuario.php", usuario).pipe(
      map(retorno => retorno),
      catchError(erro => this.exibirToast(erro.error.erro, "danger"))
    );
  }

  listar(pesquisa): Observable<IUsuario[]> {
    return this.http.post<IUsuario[]>( this.URL + "/listar_usuario.php", pesquisa).pipe(
      map(retorno => retorno),
      catchError(erro => this.exibeErro(erro))
    );
  }

  alterar(usuario): Observable<any> {
    return this.http.put(this.URL + "/alterar_usuario.php", usuario).pipe(
      map(retorno => retorno),
      catchError(erro => this.exibirToast(erro.error.erro, "danger"))
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
