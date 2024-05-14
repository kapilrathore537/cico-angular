import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './components/task/task.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { TaskAndAssignmentSubmissionComponent } from './components/task-and-assignment-submission/task-and-assignment-submission.component';
import { UnlockedLockedAssignmentComponent } from './components/unlocked-locked-assignment/unlocked-locked-assignment.component';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
import { DropDownDeleteAddUpdateComponent } from './components/drop-down-delete-add-update/drop-down-delete-add-update.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { DropDownComponent } from './components/drop-down/drop-down.component';
import { authInterceptorProvider } from './Interceptor/auth.interceptor';


const importsList: any[] = [
  TaskComponent, TaskAndAssignmentSubmissionComponent, UnlockedLockedAssignmentComponent, DeleteModalComponent, DropDownDeleteAddUpdateComponent, PaginationComponent, DropDownComponent
]

@NgModule({
  declarations: [
    importsList,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    RouterModule,
  ],
  exports: [
    importsList
  ],
  providers: [ authInterceptorProvider],
}

)

export class SharedModule {

}
