import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProdutos } from './form-produtos';

describe('FormProdutos', () => {
  let component: FormProdutos;
  let fixture: ComponentFixture<FormProdutos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormProdutos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormProdutos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
