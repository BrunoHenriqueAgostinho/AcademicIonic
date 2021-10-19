import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ITrabalho } from '../model/ITrabalho.model';
import { IUsuario } from '../model/IUsuario.model';

@Injectable({
  providedIn: 'root'
})
export class DesenvolveUsuarioTrabalhoService {

  //Variáveis
  URL: string = 'http://localhost/apiTCC/api_academic/desenvolve_usuario_trabalho';

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

  listar(usuario): Observable<ITrabalho[]> {
    return this.http.post<ITrabalho[]>(this.URL + "/listar_desenvolve.php", usuario).pipe(
      map(retorno => retorno),
      catchError(erro => this.exibeErro(erro))
    );
  }

  listarUsuariosTrabalho(trabalho): Observable<IUsuario[]> {
    return this.http.post<IUsuario[]>(this.URL + "/listar_usuario.php", trabalho).pipe(
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
