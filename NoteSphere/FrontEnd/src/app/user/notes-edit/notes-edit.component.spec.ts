import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesEditComponent } from './notes-edit.component';

describe('NotesEditComponent', () => {
  let component: NotesEditComponent;
  let fixture: ComponentFixture<NotesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotesEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
