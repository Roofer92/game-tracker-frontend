import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinconFormDialogComponent } from './wincon-form-dialog.component';

describe('WinconFormDialogComponent', () => {
  let component: WinconFormDialogComponent;
  let fixture: ComponentFixture<WinconFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WinconFormDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WinconFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
