import { TestBed } from '@angular/core/testing';

import { SignoService } from './signo.service';

describe('SignoService', () => {
  let service: SignoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
