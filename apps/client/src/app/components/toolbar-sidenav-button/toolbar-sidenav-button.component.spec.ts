import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { ToolbarSidenavButtonComponent } from "./toolbar-sidenav-button.component";

describe("ToolbarSidenavButtonComponent", () => {
  let component: ToolbarSidenavButtonComponent;
  let fixture: ComponentFixture<ToolbarSidenavButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ToolbarSidenavButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
