import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-environments',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './environments.component.html',
  styleUrl: './environments.component.css'
})
export class EnvironmentsComponent {
  showAddModal = false;

  newEnvironment = {
    name: '',
    ip: '',
    port: '',
    description: '',
    token: '',
    tenantId: ''
  };

  addEnvironment() {
    this.showAddModal = true;
  }

  closeModal() {
    this.showAddModal = false;
    this.resetForm();
  }

  saveEnvironment() {
    // Basic validation
    if (!this.newEnvironment.name || !this.newEnvironment.ip || !this.newEnvironment.port) {
      alert('Por favor, preencha os campos obrigatórios (Nome, URL e Porta).');
      return;
    }

    console.log('Salvando ambiente:', this.newEnvironment);
    alert('Ambiente salvo com sucesso! (Simulação)');
    this.closeModal();
  }

  resetForm() {
    this.newEnvironment = {
      name: '',
      ip: '',
      port: '',
      description: '',
      token: '',
      tenantId: ''
    };
  }
}
