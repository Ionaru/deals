import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    imports: [CommonModule],
    selector: 'deals-home',
    standalone: true,
    styleUrls: ['./home.component.scss'],
    templateUrl: './home.component.html',
})
export class HomeComponent {}
