import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { ApolloTestingModule } from "apollo-angular/testing";
import { of } from "rxjs";

import { TypedMockProvider } from "../../../testing/mocks.js";
import { ProductsService } from "../../services/products.service.js";

import { ProductsComponent } from "./products.component.js";

describe("productsComponent", () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async () => {
    const getProductsMock = vi.fn();
    getProductsMock.mockReturnValue({ valueChanges: of() });

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ApolloTestingModule, NoopAnimationsModule],
      providers: [
        TypedMockProvider(ProductsService, {
          getProducts: getProductsMock,
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect.assertions(1);
    expect(component).toBeTruthy();
  });
});
