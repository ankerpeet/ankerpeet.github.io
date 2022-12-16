import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';


const routes: Routes = [
    {
        path: 'codepen',
        component: AppComponent
    },
    {
        path: 'contact',
        component: AppComponent
    },
    {
        path: 'education',
        component: AppComponent
    },
    {
        path: 'experience',
        component: AppComponent
    },
    {
        path: 'projects',
        component: AppComponent
    },
    {
        path: '',
        component: AppComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
