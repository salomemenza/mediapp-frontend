import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSignoComponent } from './modal-signo.component';

describe('ModalSignoComponent', () => {
  let component: ModalSignoComponent;
  let fixture: ComponentFixture<ModalSignoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSignoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSignoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
