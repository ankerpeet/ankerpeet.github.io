import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    currentTab = 'home';
    isStraight = true;
    constructor(private router: Router) {}

    ngOnInit(): void {
        this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event) => {
            const newEvent = event as NavigationEnd;
            this.setCurrentTab(newEvent.url);
        });
    }

    setCurrentTab(url: string) {
        switch (url) {
            case '/':
                this.currentTab = 'home';
                this.isStraight = true;
                break;
            case '/contact':
                this.currentTab = 'contact';
                this.isStraight = true;
                break;
            case '/education':
                this.currentTab = 'education';
                this.isStraight = true;
                break;
            case '/projects':
                this.currentTab = 'apps';
                this.isStraight = true;
                break;
            case '/experience':
                this.currentTab = 'experience';
                this.isStraight = false;
                break;
            case '/codepen':
                this.currentTab = 'portfolio';
                this.isStraight = false;
                break;
        }
    }
}
