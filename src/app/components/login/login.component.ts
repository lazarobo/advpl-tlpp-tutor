import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    username = '';
    password = '';
    errorMessage = '';
    isLoading = false;

    constructor(private authService: AuthService, private router: Router) { }

    onLogin() {
        if (!this.username || !this.password) {
            this.errorMessage = 'Por favor, preencha todos os campos.';
            return;
        }

        this.isLoading = true;
        this.errorMessage = '';

        this.authService.login(this.username, this.password).subscribe(success => {
            this.isLoading = false;
            if (success) {
                this.router.navigate(['/dashboard']);
            } else {
                this.errorMessage = 'Usuário ou senha inválidos.';
            }
        });
    }
}
