import { ComponentFixture, TestBed } from "@angular/core/testing";

import { setComponentInput } from "../../../testing/mocks";

import { DealsPaginatorComponent } from "./deals-paginator.component";
import { provideExperimentalZonelessChangeDetection } from "@angular/core";

describe("DealsPaginatorComponent", () => {
  let component: DealsPaginatorComponent;
  let fixture: ComponentFixture<DealsPaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      providers: [provideExperimentalZonelessChangeDetection()]
    }).compileComponents();
    fixture = TestBed.createComponent(DealsPaginatorComponent);

    setComponentInput(fixture.componentRef, "totalItems", 100);
    setComponentInput(fixture.componentRef, "itemsPerPage", 10);
    setComponentInput(fixture.componentRef, "currentPage", 1);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
