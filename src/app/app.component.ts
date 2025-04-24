import { CommonModule } from '@angular/common';
import { Component, Renderer2 } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterOutlet } from '@angular/router';
import { NgbCalendar, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterOutlet, MatCardModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'lecionario';
  dataUnica: Date = new Date();
  isDarkMode = false;

  constructor(private router: Router, private renderer: Renderer2){}

  mudouData() {
    this.router.navigateByUrl("/lecionario")
  }

  goToHome() {
    this.router.navigateByUrl("/home")
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;

    const themeClass = 'dark-mode';
    const body = document.body;

    if (this.isDarkMode) {
      this.renderer.addClass(body, themeClass);
    } else {
      this.renderer.removeClass(body, themeClass);
    }
  }
}
