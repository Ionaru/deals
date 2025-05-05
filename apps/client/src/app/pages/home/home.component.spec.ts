import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { ApolloTestingModule } from "apollo-angular/testing";

import { TypedMockProvider } from "../../../testing/mocks.js";
import { DealsService } from "../../services/deals.service.js";

import { HomeComponent } from "./home.component.js";

describe("homeComponent", () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ApolloTestingModule, NoopAnimationsModule],
      providers: [TypedMockProvider(DealsService, { getDeals: vi.fn() })],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect.assertions(1);
    expect(component).toBeTruthy();
  });
});
