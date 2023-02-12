import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';

describe('appComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AppComponent, NxWelcomeComponent],
            imports: [RouterTestingModule],
        }).compileComponents();
    });

    it('should create the app', () => {
        expect.assertions(1);
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it(`should have as title 'client'`, () => {
        expect.assertions(1);
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app.title).toBe('client');
    });

    it('should render title', () => {
        expect.assertions(1);
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('h1')?.textContent).toContain(
            'Welcome client',
        );
    });
});
