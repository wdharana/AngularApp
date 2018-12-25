import { AddStudentComponent } from './add-student/add-student.component';
import { SearchStudentComponent } from './search-student/search-student.component'
import { ShowStudentComponent } from './show-student/show-student.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'add', pathMatch: 'full' },
    { path: 'add', component: AddStudentComponent },
    { path: 'student', component: ShowStudentComponent },
    { path: 'search', component: SearchStudentComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
