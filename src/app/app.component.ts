import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { ThemeService } from './services/theme.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, SidebarComponent, CommonModule, FormsModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'AdvPL & TLPP Tutor';
    showNavbar = true;
    searchQuery = '';
    @ViewChild('searchInput') searchInput!: ElementRef;

    @HostListener('window:keydown.control.k', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        event.preventDefault();
        this.searchInput.nativeElement.focus();
    }

    constructor(private router: Router, public themeService: ThemeService) {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe((event: any) => {
            this.showNavbar = !event.url.includes('/login');
        });
    }

    setTheme(theme: 'light' | 'dark' | 'default') {
        this.themeService.setTheme(theme);
    }

    onGlobalSearch() {
        if (this.searchQuery.trim()) {
            this.router.navigate(['/functions'], { queryParams: { search: this.searchQuery } });
        }
    }
}


