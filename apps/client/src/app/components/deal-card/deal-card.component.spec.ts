import { ComponentFixture, TestBed } from "@angular/core/testing";

import { setComponentInput } from "../../../testing/mocks.js";

import { DealCardComponent } from "./deal-card.component.js";

describe("DealCardComponent", () => {
  let component: DealCardComponent;
  let fixture: ComponentFixture<DealCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
    }).compileComponents();

    fixture = TestBed.createComponent(DealCardComponent);
    setComponentInput(fixture.componentRef, "dealId", "dealId");
    setComponentInput(fixture.componentRef, "dealPrice", 1);
    setComponentInput(fixture.componentRef, "dealQuantity", 1);
    setComponentInput(
      fixture.componentRef,
      "productImageUrl",
      "productImageUrl",
    );
    setComponentInput(fixture.componentRef, "productName", "productName");
    setComponentInput(fixture.componentRef, "productPrice", 1);
    setComponentInput(fixture.componentRef, "productUrl", "productUrl");
    setComponentInput(fixture.componentRef, "shopName", "shopName");
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
