import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../../services/theme.service';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
    isCollapsed = false;

    constructor(public themeService: ThemeService, private router: Router) { }

    setTheme(theme: 'light' | 'dark' | 'default') {
        this.themeService.setTheme(theme);
    }

    logout() {
        localStorage.removeItem('advpl-user');
        this.router.navigate(['/login']);
    }

    toggleCollapse() {
        this.isCollapsed = !this.isCollapsed;
    }
}
