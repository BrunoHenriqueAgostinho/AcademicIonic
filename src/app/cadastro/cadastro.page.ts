import { Component, OnInit } from '@angular/core';
import { IUsuario } from './../model/IUsuario.model'; 
import { UsuarioService } from './../services/usuario.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  usuario: IUsuario = {
    cpf: null,
    nome: null,
    senha: null,
    email: null
  } 

  constructor(
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
  }

  cadastrar() { 
    console.log(this.usuario);
    this.inserir();
  }

  inserir(){
    this.usuarioService.inserir(this.usuario).subscribe( 
      retorno => { 
        this.usuarioService.exibirToast(retorno.mensagem,'medium');
      } 
    ); 
  }
}
