import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdvplDataService } from '../../services/advpl-data.service';

interface Environment {
  name: string;
  url: string;
  description: string;
  tableCount: number;
  isActive: boolean;
  timestamp: Date;
}

@Component({
  selector: 'app-environments',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './environments.component.html',
  styleUrl: './environments.component.css'
})
export class EnvironmentsComponent {
  showAddModal = false;
  isLoading = false;
  environments: Environment[] = [];

  newEnvironment = {
    name: '',
    ip: '', // This acts as URL now
    description: '',
    token: '',
    tenantId: ''
  };

  constructor(private http: HttpClient, private advplService: AdvplDataService) {
    // Load from local storage
    const saved = localStorage.getItem('custom_environments');
    if (saved) {
      try {
        this.environments = JSON.parse(saved);
      } catch (e) {
        console.error('Error loading environments', e);
      }
    }
  }

  addEnvironment() {
    this.showAddModal = true;
  }

  closeModal() {
    this.showAddModal = false;
    this.resetForm();
  }

  saveEnvironment() {
    // Basic validation
    if (!this.newEnvironment.name || !this.newEnvironment.ip) {
      alert('Por favor, preencha os campos obrigatórios (Nome e URL).');
      return;
    }

    // Prepare URL
    let baseUrl = this.newEnvironment.ip.trim();
    if (baseUrl.endsWith('/')) baseUrl = baseUrl.slice(0, -1);

    // API Suffix
    const suffix = '/api/framework/v1/genericQuery?tables=SX2&fields=X2_CHAVE,X2_NOME,X2_ARQUIVO&DeletedFilter=false&FilialFilter=false&pageSize=15000&page=1';
    const fullUrl = baseUrl + suffix;

    let headers = new HttpHeaders();
    if (this.newEnvironment.token && this.newEnvironment.token.trim()) {
      headers = headers.set('Authorization', 'Bearer ' + this.newEnvironment.token.trim());
    }

    this.isLoading = true;

    this.http.get<any>(fullUrl, { headers }).subscribe({
      next: (response) => {
        if (response && response.items) {
          this.advplService.addDynamicTables(response.items, this.newEnvironment.name);

          // Add to local list
          const env: Environment = {
            name: this.newEnvironment.name,
            url: baseUrl,
            description: this.newEnvironment.description,
            tableCount: response.items.length,
            isActive: true,
            timestamp: new Date()
          };

          this.environments.push(env);
          localStorage.setItem('custom_environments', JSON.stringify(this.environments));

          alert(`Conexão bem sucedida! ${response.items.length} tabelas carregadas.`);
          this.closeModal();
        } else {
          alert('Resposta inválida do servidor. Verifique se o endpoint GenericQuery está ativo.');
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('API Error:', err);
        let msg = 'Erro ao conectar ao servidor.';
        if (err.status === 404) msg += ' Endpoint não encontrado.';
        if (err.status === 0) msg += ' Erro de conexão (CORS ou servidor offline).';
        alert(msg + '\nDetalhes: ' + (err.message || 'Desconhecido'));
        this.isLoading = false;
      }
    });
  }

  resetForm() {
    this.newEnvironment = {
      name: '',
      ip: '',
      description: '',
      token: '',
      tenantId: ''
    };
  }
  deleteEnvironment(env: Environment, event: Event) {
    event.stopPropagation();
    event.preventDefault();

    if (confirm(`Tem certeza que deseja excluir o ambiente "${env.name}"?`)) {
      this.advplService.removeTablesForEnvironment(env.name);
      this.environments = this.environments.filter(e => e !== env);
      localStorage.setItem('custom_environments', JSON.stringify(this.environments));
    }
  }
}
