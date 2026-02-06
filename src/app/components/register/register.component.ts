import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    username = '';
    password = '';
    confirmPassword = '';
    errorMessage = '';
    successMessage = '';
    isLoading = false;

    constructor(private http: HttpClient, private router: Router) { }

    onRegister() {
        // Validation
        if (!this.username || !this.password || !this.confirmPassword) {
            this.errorMessage = 'Por favor, preencha todos os campos.';
            return;
        }

        if (this.password !== this.confirmPassword) {
            this.errorMessage = 'As senhas não coincidem.';
            return;
        }

        if (this.password.length < 3) {
            this.errorMessage = 'A senha deve ter pelo menos 3 caracteres.';
            return;
        }

        this.isLoading = true;
        this.errorMessage = '';
        this.successMessage = '';

        this.http.post<any>('http://localhost:3000/api/register', {
            username: this.username,
            password: this.password
        }).subscribe({
            next: (response) => {
                this.isLoading = false;
                if (response.success) {
                    this.successMessage = 'Conta criada com sucesso! Redirecionando...';
                    setTimeout(() => {
                        this.router.navigate(['/login']);
                    }, 2000);
                }
            },
            error: (err) => {
                this.isLoading = false;
                this.errorMessage = err.error?.message || 'Erro ao criar conta. Tente novamente.';
            }
        });
    }
}
