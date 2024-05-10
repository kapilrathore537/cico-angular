import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderServiceService } from 'src/app/service/loader-service.service';

@Component({
  selector: 'app-loader-component',
  templateUrl: './loader-component.component.html',
  styleUrls: ['./loader-component.component.scss']
})
export class LoaderComponentComponent {
  isLoading: Subject<boolean> = this.loaderService.isLoading;

  constructor(private loaderService: LoaderServiceService) {

  }
}
