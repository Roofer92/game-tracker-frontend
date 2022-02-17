import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerFormDialogComponent } from './player-form-dialog.component';

describe('PlayerFormDialogComponent', () => {
  let component: PlayerFormDialogComponent;
  let fixture: ComponentFixture<PlayerFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerFormDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
