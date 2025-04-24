import { CommonModule } from '@angular/common';
import { Component, Renderer2 } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterOutlet } from '@angular/router';
import { NgbCalendar, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../environments/environments.development';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { SupabaseService } from './services/supabase.service';


@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterOutlet, MatCardModule, MatIconModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'lecionario';
  dataUnica: Date = new Date();
  isDarkMode = false;
  isLoggedIn: boolean;

  constructor(private router: Router, private renderer: Renderer2, private supabase: SupabaseService){
  }

  async ngOnInit() {
    const { data } = await this.supabase.getSession();
    this.isLoggedIn = !!data?.session;

    this.supabase.onAuthChange((_event, session) => {
      this.isLoggedIn = !!session;
    });
  }




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
