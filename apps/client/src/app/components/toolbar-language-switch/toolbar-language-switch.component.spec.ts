import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ToolbarLanguageSwitchComponent } from "./toolbar-language-switch.component.js";

describe("ToolbarLanguageSwitchComponent", () => {
  let component: ToolbarLanguageSwitchComponent;
  let fixture: ComponentFixture<ToolbarLanguageSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
    }).compileComponents();

    fixture = TestBed.createComponent(ToolbarLanguageSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
