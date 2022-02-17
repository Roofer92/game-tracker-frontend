import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckFormDialogComponent } from './deck-form-dialog.component';

describe('DeckFormDialogComponent', () => {
  let component: DeckFormDialogComponent;
  let fixture: ComponentFixture<DeckFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeckFormDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
