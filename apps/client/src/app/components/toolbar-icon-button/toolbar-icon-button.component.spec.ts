import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ToolbarIconButtonComponent } from "./toolbar-icon-button.component";

describe("ToolbarIconButtonComponent", () => {
  let component: ToolbarIconButtonComponent;
  let fixture: ComponentFixture<ToolbarIconButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
    }).compileComponents();

    fixture = TestBed.createComponent(ToolbarIconButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
