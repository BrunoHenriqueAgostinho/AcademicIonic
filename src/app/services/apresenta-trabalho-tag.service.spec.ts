import { TestBed } from '@angular/core/testing';

import { ApresentaTrabalhoTagService } from './apresenta-trabalho-tag.service';

describe('ApresentaTrabalhoTagService', () => {
  let service: ApresentaTrabalhoTagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApresentaTrabalhoTagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
