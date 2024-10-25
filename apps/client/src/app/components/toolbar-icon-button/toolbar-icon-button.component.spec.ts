import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ToolbarIconButtonComponent } from "./toolbar-icon-button.component";
import { provideExperimentalZonelessChangeDetection } from "@angular/core";

describe("ToolbarIconButtonComponent", () => {
  let component: ToolbarIconButtonComponent;
  let fixture: ComponentFixture<ToolbarIconButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      providers: [provideExperimentalZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(ToolbarIconButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
