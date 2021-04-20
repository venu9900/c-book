import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClgRegisterComponent } from './clg-register.component';

describe('ClgRegisterComponent', () => {
  let component: ClgRegisterComponent;
  let fixture: ComponentFixture<ClgRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClgRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClgRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
