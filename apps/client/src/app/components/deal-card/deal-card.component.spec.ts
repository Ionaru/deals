import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DealCardComponent } from "./deal-card.component";

describe("DealCardComponent", () => {
  let component: DealCardComponent;
  let fixture: ComponentFixture<DealCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
    }).compileComponents();

    fixture = TestBed.createComponent(DealCardComponent);
    component = fixture.componentInstance;
    component.shopName = "shopName";
    component.productName = "productName";
    component.productImageUrl = "productImageUrl";
    component.productUrl = "productUrl";
    component.productPrice = 1;
    component.dealPrice = 1;
    component.dealQuantity = 1;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
