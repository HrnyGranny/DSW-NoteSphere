import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendManageComponent } from './friend-manage.component';

describe('FriendManageComponent', () => {
  let component: FriendManageComponent;
  let fixture: ComponentFixture<FriendManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FriendManageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FriendManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
