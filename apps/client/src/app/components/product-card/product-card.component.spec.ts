import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { setComponentInput } from "../../../testing/mocks";

import { ProductCardComponent } from "./product-card.component";

describe("DealCardComponent", () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    setComponentInput(fixture.componentRef, "productId", "productId");
    setComponentInput(
      fixture.componentRef,
      "productImageUrl",
      "productImageUrl",
    );
    setComponentInput(fixture.componentRef, "productName", "productName");
    setComponentInput(fixture.componentRef, "productPrice", 1);
    setComponentInput(fixture.componentRef, "productUrl", "productUrl");
    setComponentInput(fixture.componentRef, "shopName", "shopName");
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
