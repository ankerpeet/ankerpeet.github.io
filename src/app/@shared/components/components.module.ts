import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { EducationComponent } from './education/education.component';
import { ExperienceComponent } from './experience/experience.component';
import { ProjectsComponent } from './projects/projects.component';
import { CodepenComponent } from './codepen/codepen.component';

const declarations = [
  HeaderComponent,
  HomeComponent,
  ContactComponent,
  EducationComponent,
  ExperienceComponent,
  ProjectsComponent,
  CodepenComponent
]

@NgModule({
  declarations: declarations,
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: declarations,
})
export class ComponentsModule { }
