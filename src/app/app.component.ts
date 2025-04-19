import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { NgbCalendar, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterOutlet, NgbDatepickerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'lecionario';
  dataUnica: Date = new Date();

  mudouData() {
    alert(new Date(this.dataUnica).toUTCString())
  }
}
