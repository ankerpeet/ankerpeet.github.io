import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    currentRoute = '';
    constructor(private router: Router) {}

    ngOnInit(): void {
        this.router.events.subscribe((routeEvent) => {
            if (routeEvent instanceof NavigationEnd) {
                this.currentRoute = routeEvent.url;
            }
        });
    }
}
