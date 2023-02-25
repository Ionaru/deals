import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    imports: [CommonModule],
    selector: 'deals-settings',
    standalone: true,
    styleUrls: ['./settings.component.scss'],
    templateUrl: './settings.component.html',
})
export class SettingsComponent {}
