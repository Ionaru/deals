import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DealsPaginatorComponent } from "./deals-paginator.component";

describe("DealsPaginatorComponent", () => {
  let component: DealsPaginatorComponent;
  let fixture: ComponentFixture<DealsPaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealsPaginatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DealsPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
