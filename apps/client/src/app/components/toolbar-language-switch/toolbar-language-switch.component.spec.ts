import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ToolbarLanguageSwitchComponent } from "./toolbar-language-switch.component";
import { provideExperimentalZonelessChangeDetection } from "@angular/core";

describe("ToolbarLanguageSwitchComponent", () => {
  let component: ToolbarLanguageSwitchComponent;
  let fixture: ComponentFixture<ToolbarLanguageSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      providers: [provideExperimentalZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(ToolbarLanguageSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
