import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

import { TypedMockProvider } from "../../../testing/mocks";

import { DialogInformativeComponent } from "./dialog-informative.component";

describe("DialogInformativeComponent", () => {
  let component: DialogInformativeComponent;
  let fixture: ComponentFixture<DialogInformativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        TypedMockProvider(MAT_DIALOG_DATA, {
          message: "message",
          title: "title",
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogInformativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
