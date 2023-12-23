import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ToolbarLinkComponent } from "./toolbar-link.component";

describe("ToolbarLinkComponent", () => {
  let component: ToolbarLinkComponent;
  let fixture: ComponentFixture<ToolbarLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolbarLinkComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ToolbarLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
