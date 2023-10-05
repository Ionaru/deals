import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HomeComponent } from "./home.component";

describe("homeComponent", () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect.assertions(1);
    expect(component).toBeTruthy();
  });
});
