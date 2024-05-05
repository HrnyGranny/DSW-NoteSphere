import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesAdmComponent } from './notes-adm.component';

describe('NotesAdmComponent', () => {
  let component: NotesAdmComponent;
  let fixture: ComponentFixture<NotesAdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotesAdmComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotesAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
