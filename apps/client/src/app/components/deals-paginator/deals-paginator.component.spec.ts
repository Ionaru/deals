import { ComponentFixture, TestBed } from "@angular/core/testing";

import { setComponentInput } from "../../../testing/mocks.js";

import { DealsPaginatorComponent } from "./deals-paginator.component.js";

describe("DealsPaginatorComponent", () => {
  let component: DealsPaginatorComponent;
  let fixture: ComponentFixture<DealsPaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
    }).compileComponents();
    fixture = TestBed.createComponent(DealsPaginatorComponent);

    setComponentInput(fixture.componentRef, "totalItems", 100);
    setComponentInput(fixture.componentRef, "itemsPerPage", 10);
    setComponentInput(fixture.componentRef, "currentPage", 1);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
