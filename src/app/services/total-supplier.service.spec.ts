import { TestBed } from '@angular/core/testing';

import { TotalSupplierService } from './total-supplier.service';

describe('TotalSupplierService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TotalSupplierService = TestBed.get(TotalSupplierService);
    expect(service).toBeTruthy();
  });
});
