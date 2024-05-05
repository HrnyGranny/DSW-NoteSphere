import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendshipAdmComponent } from './friendship-adm.component';

describe('FriendshipAdmComponent', () => {
  let component: FriendshipAdmComponent;
  let fixture: ComponentFixture<FriendshipAdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FriendshipAdmComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FriendshipAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
