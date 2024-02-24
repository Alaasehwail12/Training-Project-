import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningCountComponent } from './warning-count.component';

describe('WarningCountComponent', () => {
  let component: WarningCountComponent;
  let fixture: ComponentFixture<WarningCountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WarningCountComponent]
    });
    fixture = TestBed.createComponent(WarningCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
