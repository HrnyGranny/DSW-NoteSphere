import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendNotesComponent } from './friend-notes.component';

describe('FriendNotesComponent', () => {
  let component: FriendNotesComponent;
  let fixture: ComponentFixture<FriendNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FriendNotesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FriendNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
