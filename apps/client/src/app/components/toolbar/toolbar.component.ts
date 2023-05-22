import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { DarkModeService } from '../../services/dark-mode.service';

@Component({
    imports: [
        CommonModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        RouterLink,
        RouterLinkActive,
        MatBadgeModule,
    ],
    selector: 'deals-toolbar',
    standalone: true,
    styleUrls: ['./toolbar.component.scss'],
    templateUrl: './toolbar.component.html',
})
export class ToolbarComponent {
    @Input() public title?: string;

    readonly #darkModeService = inject(DarkModeService);

    public get isDarkMode(): boolean {
        return this.#darkModeService.isDarkModeActive();
    }

    public toggleDarkMode(): void {
        this.#darkModeService.toggleDarkMode();
    }
}
