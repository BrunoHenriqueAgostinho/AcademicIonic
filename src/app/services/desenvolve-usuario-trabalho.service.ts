import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IDesenvolve } from '../model/IDesenvolve.model';
import { IDesenvolveusuariotrabalho } from '../model/IDesenvolveusuariotrabalho.model';
import { ITrabalho } from '../model/ITrabalho.model';
import { IUsuario } from '../model/IUsuario.model';

@Injectable({
  providedIn: 'root'
})
export class DesenvolveUsuarioTrabalhoService {

  //Variáveis
  //URL: string = 'http://localhost/apiTCC/api_academic/desenvolve_usuario_trabalho';
  URL: string = 'https://academicapitcc.herokuapp.com/api_academic/desenvolve_usuario_trabalho';


  constructor(
    private http: HttpClient,
    private toastController: ToastController,
    private alertController: AlertController
  ) { }

  inserir(desenvolve): Observable<any> {
    return this.http.post(this.URL + "/inserir_desenvolve.php", desenvolve).pipe(
      map(retorno => retorno),
      catchError(erro => this.exibirToast(erro.error.erro, "danger"))
    );
  }

  consultarUsuario(desenvolve): Observable<any> {
    return this.http.post(this.URL + "/consultarUsuario_desenvolve.php", desenvolve).pipe(
      map(retorno => retorno),
      catchError(erro => this.exibirToast(erro.error.erro, "danger"))
    );
  }

  listar(usuario): Observable<ITrabalho[]> {
    return this.http.post<ITrabalho[]>(this.URL + "/listar_desenvolve.php", usuario).pipe(
      map(retorno => retorno),
      catchError(erro => this.exibeErro(erro))
    );
  }

  listarUsuariosTrabalho(trabalho): Observable<IDesenvolve[]> {
    return this.http.post<IDesenvolve[]>(this.URL + "/listar_usuario.php", trabalho).pipe(
      map(retorno => retorno),
      catchError(erro => this.exibeErro(erro))
    );
  }
  alterar(desenvolve): Observable<any> {
    return this.http.put(this.URL + "/alterar_desenvolve.php", desenvolve).pipe(
      map(retorno => retorno),
      catchError(erro => this.exibirToast(erro.error.erro, "danger"))
    );
  }

  excluir(desenvolve): Observable<IDesenvolveusuariotrabalho> {
    return this.http.post<IDesenvolveusuariotrabalho>(this.URL + "/deletar_desenvolve.php", desenvolve).pipe(
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
