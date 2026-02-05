import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
    username = '';
    password = '';
    isLoading = false;
    errorMsg = '';

    constructor(private router: Router) { }

    onLogin() {
        if (!this.username || !this.password) {
            this.errorMsg = 'Por favor, preencha usuário e senha.';
            return;
        }

        this.isLoading = true;
        this.errorMsg = '';

        // Simula delay de rede para experiência UX
        setTimeout(() => {
            // Login "fake" bem sucedido
            localStorage.setItem('advpl-user', this.username);
            this.router.navigate(['/dashboard']);
            this.isLoading = false;
        }, 1000);
    }
}
