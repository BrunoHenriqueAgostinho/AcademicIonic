import { TestBed } from '@angular/core/testing';

import { AdicionaUsuarioUsuarioService } from './adiciona-usuario-usuario.service';

describe('AdicionaUsuarioUsuarioService', () => {
  let service: AdicionaUsuarioUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdicionaUsuarioUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
