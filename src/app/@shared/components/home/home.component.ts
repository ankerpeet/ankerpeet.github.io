import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    years = 0;
    constructor() {}

    ngOnInit(): void {
        this.calculateYears()
    }
    calculateYears() {
        var currentDate = new Date(Date.now());
        var currentMonth = currentDate.getMonth();
        var currentYear = currentDate.getFullYear();

        if (currentMonth >= 9) this.years = currentYear - 2016;
        else this.years = currentYear - 2017;
    }
}
