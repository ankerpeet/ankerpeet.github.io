import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ComponentsModule } from './@shared/components/components.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TabComponent } from './tab/tab.component';

@NgModule({
    declarations: [AppComponent, TabComponent],
    imports: [BrowserModule, AppRoutingModule, ComponentsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
