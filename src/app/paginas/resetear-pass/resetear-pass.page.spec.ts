import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResetearPassPage } from './resetear-pass.page';

describe('ResetearPassPage', () => {
  let component: ResetearPassPage;
  let fixture: ComponentFixture<ResetearPassPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetearPassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
