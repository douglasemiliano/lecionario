import { Component, inject } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from '../../../services/loading.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [NgIf, AsyncPipe, MatProgressSpinnerModule],
  templateUrl: './loading.component.html',  // Agora o template está no HTML
  styleUrls: ['./loading.component.scss']   // Agora os estilos estão no SCSS
})
export class LoadingComponent {
  private loadingService: LoadingService = inject(LoadingService);
  isLoading = this.loadingService.loading$;
}
