import { TestBed } from '@angular/core/testing';

import { ServicioBusquedaService } from './servicio-busqueda.service';

describe('ServicioBusquedaService', () => {
  let service: ServicioBusquedaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioBusquedaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
