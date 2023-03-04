import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';

import { HealthService } from '../../services/health.service';

@Component({
    imports: [CommonModule, MatButtonModule],
    selector: 'deals-admin',
    standalone: true,
    styleUrls: ['./admin.component.scss'],
    templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {
    readonly #healthService = inject(HealthService);

    public health?: Observable<any>;

    public ngOnInit() {
        this.health = this.#getHealth();
    }

    #getHealth() {
        return this.#healthService.getHealth();
    }
}
