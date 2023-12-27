import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ApolloTestingModule } from "apollo-angular/testing";

import { UnknownDealsComponent } from "./unknown-deals.component";

describe("UnknownDealsComponent", () => {
  let component: UnknownDealsComponent;
  let fixture: ComponentFixture<UnknownDealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApolloTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(UnknownDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
