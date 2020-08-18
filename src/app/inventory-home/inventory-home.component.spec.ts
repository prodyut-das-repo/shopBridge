import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryHomeComponent } from './inventory-home.component';
import { UserService } from '../service/user-service';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('InventoryHomeComponent', () => {
  let component: InventoryHomeComponent;
  let fixture: ComponentFixture<InventoryHomeComponent>;

  beforeEach(async(() => {
    const userServiceStub = {
      toArray: () => ({}),
      getInventoryDetails: () => ({ subscribe: f => f({}) }),
    }
    TestBed.configureTestingModule({
      declarations: [InventoryHomeComponent],
      imports: [RouterTestingModule, ReactiveFormsModule],
      providers: [{ provide: UserService, useValue: userServiceStub }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
