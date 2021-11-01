import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ITrabalho } from '../model/ITrabalho.model';
import { TrabalhoService } from '../services/trabalho.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {

  listaTrabalho: Observable<ITrabalho[]>;

  pesquisa = {
    pesquisa: ''
  };

  constructor(
    private trabalhoService: TrabalhoService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  pesquisar(){
    this.listaTrabalho = this.trabalhoService.pesquisar(this.pesquisa).pipe(delay(200));
    console.log(this.listaTrabalho);
  }
  
  visualizarTrabalho(trabalho){
    this.router.navigate(["/visualizartrabalho/" + trabalho]);
  }

}
