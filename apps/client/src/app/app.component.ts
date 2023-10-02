import { Component, inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';

import { appName, appNameAlternate } from './app.config';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

@Component({
    imports: [RouterOutlet, ToolbarComponent],
    selector: 'deals-root',
    standalone: true,
    styleUrls: ['./app.component.scss'],
    templateUrl: './app.component.html',
})
export class AppComponent {
    title = appName;
    alternateTitle = appNameAlternate;

    readonly #iconRegistry = inject(MatIconRegistry);

    constructor() {
        this.#iconRegistry.setDefaultFontSetClass('material-symbols-outlined');
    }
}
