import { ComponentFixture, TestBed } from "@angular/core/testing";

import { setComponentInput } from "../../../testing/mocks";

import { PriceComponent } from "./price.component";

describe("PriceComponent", () => {
  let component: PriceComponent;
  let fixture: ComponentFixture<PriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
    }).compileComponents();

    fixture = TestBed.createComponent(PriceComponent);

    setComponentInput(fixture.componentRef, "amount", 100);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
