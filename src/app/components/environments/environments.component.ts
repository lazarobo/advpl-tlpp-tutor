import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdvplDataService } from '../../services/advpl-data.service';
import { AuthService } from '../../services/auth.service';

interface Environment {
  id?: number;
  name: string;
  url: string;
  description: string;
  tableCount: number;
  isActive: boolean;
  timestamp: Date;
}

interface DbEnvironment {
  ID: number;
  USER_ID: string;
  NOME: string;
  URL: string;
  DESCRICAO: string;
  TOKEN: string;
  TENANT_ID: string;
  CRIADO_EM: string;
}

@Component({
  selector: 'app-environments',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './environments.component.html',
  styleUrl: './environments.component.css'
})
export class EnvironmentsComponent implements OnInit {
  showAddModal = false;
  isLoading = false;
  environments: Environment[] = [];
  private apiUrl = 'http://localhost:3000/api';

  newEnvironment = {
    name: '',
    ip: '',
    description: '',
    token: '',
    tenantId: ''
  };

  constructor(
    private http: HttpClient,
    private advplService: AdvplDataService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loadEnvironments();
  }

  loadEnvironments() {
    const user = this.authService.getUser();
    if (!user) return;

    const userId = user.USER || user.user;
    this.http.get<any>(`${this.apiUrl}/environments/${userId}`).subscribe({
      next: (response) => {
        if (response.success && response.environments) {
          this.environments = response.environments.map((env: DbEnvironment) => ({
            id: env.ID,
            name: env.NOME,
            url: env.URL,
            description: env.DESCRICAO,
            tableCount: 0, // Will be loaded separately if needed
            isActive: true,
            timestamp: new Date(env.CRIADO_EM)
          }));

          // Load table count for each environment
          this.environments.forEach((env, index) => {
            if (env.id) {
              this.http.get<any>(`${this.apiUrl}/environments/${env.id}/tables`).subscribe({
                next: (tablesResponse) => {
                  if (tablesResponse.success) {
                    this.environments[index].tableCount = tablesResponse.tables.length;
                  }
                }
              });
            }
          });
        }
      },
      error: (err) => {
        console.error('Error loading environments:', err);
      }
    });
  }

  addEnvironment() {
    this.showAddModal = true;
  }

  closeModal() {
    this.showAddModal = false;
    this.resetForm();
  }

  saveEnvironment() {
    const user = this.authService.getUser();
    if (!user) {
      alert('Você precisa estar logado para adicionar ambientes.');
      return;
    }

    if (!this.newEnvironment.name || !this.newEnvironment.ip) {
      alert('Por favor, preencha os campos obrigatórios (Nome e URL).');
      return;
    }

    let baseUrl = this.newEnvironment.ip.trim();
    if (baseUrl.endsWith('/')) baseUrl = baseUrl.slice(0, -1);

    const suffix = '/api/framework/v1/genericQuery?tables=SX2&fields=X2_CHAVE,X2_NOME,X2_ARQUIVO&DeletedFilter=false&FilialFilter=false&pageSize=15000&page=1';
    const fullUrl = baseUrl + suffix;

    let headers = new HttpHeaders();
    if (this.newEnvironment.token && this.newEnvironment.token.trim()) {
      headers = headers.set('Authorization', 'Bearer ' + this.newEnvironment.token.trim());
    }

    this.isLoading = true;
    const userId = user.USER || user.user;

    // First, fetch tables from Protheus API
    this.http.get<any>(fullUrl, { headers }).subscribe({
      next: (response) => {
        if (response && response.items) {
          // Create environment in database
          this.http.post<any>(`${this.apiUrl}/environments`, {
            userId: userId,
            nome: this.newEnvironment.name,
            url: baseUrl,
            descricao: this.newEnvironment.description,
            token: this.newEnvironment.token,
            tenantId: this.newEnvironment.tenantId
          }).subscribe({
            next: (envResponse) => {
              if (envResponse.success && envResponse.environmentId) {
                const envId = envResponse.environmentId;

                // Save tables to database
                const tablesToSave = response.items.map((item: any) => ({
                  nome: item.x2_chave,
                  descricao: item.x2_nome || '',
                  modulo: '',
                  tipo: 'Dados',
                  chave: ''
                }));

                this.http.post<any>(`${this.apiUrl}/environments/${envId}/tables`, {
                  tables: tablesToSave
                }).subscribe({
                  next: (tablesResponse) => {
                    // Add to local list
                    const env: Environment = {
                      id: envId,
                      name: this.newEnvironment.name,
                      url: baseUrl,
                      description: this.newEnvironment.description,
                      tableCount: response.items.length,
                      isActive: true,
                      timestamp: new Date()
                    };

                    this.environments.push(env);
                    this.advplService.addDynamicTables(response.items, this.newEnvironment.name);

                    alert(`Conexão bem sucedida! ${response.items.length} tabelas salvas no banco.`);
                    this.closeModal();
                    this.isLoading = false;
                  },
                  error: (err) => {
                    console.error('Error saving tables:', err);
                    alert('Ambiente criado, mas erro ao salvar tabelas.');
                    this.isLoading = false;
                  }
                });
              }
            },
            error: (err) => {
              console.error('Error creating environment:', err);
              alert('Erro ao criar ambiente no banco de dados.');
              this.isLoading = false;
            }
          });
        } else {
          alert('Resposta inválida do servidor. Verifique se o endpoint GenericQuery está ativo.');
          this.isLoading = false;
        }
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
      if (env.id) {
        // Delete from database (cascades to tables and fields)
        this.http.delete<any>(`${this.apiUrl}/environments/${env.id}`).subscribe({
          next: (response) => {
            if (response.success) {
              this.advplService.removeTablesForEnvironment(env.name);
              this.environments = this.environments.filter(e => e !== env);
            }
          },
          error: (err) => {
            console.error('Error deleting environment:', err);
            alert('Erro ao excluir ambiente.');
          }
        });
      } else {
        // Fallback: remove locally only
        this.advplService.removeTablesForEnvironment(env.name);
        this.environments = this.environments.filter(e => e !== env);
      }
    }
  }
}
