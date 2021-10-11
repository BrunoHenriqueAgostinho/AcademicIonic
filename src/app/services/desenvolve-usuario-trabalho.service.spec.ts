import { TestBed } from '@angular/core/testing';

import { DesenvolveUsuarioTrabalhoService } from './desenvolve-usuario-trabalho.service';

describe('DesenvolveUsuarioTrabalhoService', () => {
  let service: DesenvolveUsuarioTrabalhoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesenvolveUsuarioTrabalhoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
