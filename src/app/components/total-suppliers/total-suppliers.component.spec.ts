import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalSuppliersComponent } from './total-suppliers.component';

describe('TotalSuppliersComponent', () => {
  let component: TotalSuppliersComponent;
  let fixture: ComponentFixture<TotalSuppliersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalSuppliersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalSuppliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
