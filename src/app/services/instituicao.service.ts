import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IInstituicao } from '../model/IInstituicao.model';

@Injectable({
  providedIn: 'root'
})
export class InstituicaoService {
  //Variáveis
  URL: string = 'http://localhost/apiTCC/api_academic/tb_instituicao';

  constructor(
    private http: HttpClient,
    private toastController: ToastController,
    private alertController: AlertController
  ) { }
  
  //CRUD e outros métodos
  consultar(id): Observable<any> {
    return this.http.get<any>(this.URL + '/consultar_instituicao', id).pipe(
      map(retorno => retorno),
      catchError(erro => erro)
    );
  }

  inserir(instituicao): Observable<any> {
    return this.http.post(this.URL + "/inserirCad_instituicao.php", instituicao).pipe(
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
