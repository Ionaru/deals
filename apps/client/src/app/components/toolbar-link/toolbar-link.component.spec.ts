import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { setComponentInput } from "../../../testing/mocks";

import { ToolbarLinkComponent } from "./toolbar-link.component";

describe("ToolbarLinkComponent", () => {
  let component: ToolbarLinkComponent;
  let fixture: ComponentFixture<ToolbarLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ToolbarLinkComponent);

    setComponentInput(fixture.componentRef, "name", "Test name");
    setComponentInput(fixture.componentRef, "href", "https://example.com");

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
