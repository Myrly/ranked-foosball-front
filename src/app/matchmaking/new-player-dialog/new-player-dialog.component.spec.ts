import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPlayerDialogComponent } from './new-player-dialog.component';

describe('NewPlayerDialogComponent', () => {
  let component: NewPlayerDialogComponent;
  let fixture: ComponentFixture<NewPlayerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewPlayerDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPlayerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
