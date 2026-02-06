import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdvplDataService, AdvPLTable } from '../../services/advpl-data.service';
import { forkJoin, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { switchMap, map, catchError } from 'rxjs/operators';

interface DbTable {
    ID: number;
    AMBIENTE_ID: number;
    NOME: string;
    DESCRICAO: string;
    MODULO: string;
    TIPO: string;
    CHAVE: string;
}

@Component({
    selector: 'app-tables',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './tables.component.html',
    styleUrl: './tables.component.css'
})
export class TablesComponent implements OnInit {
    tables: AdvPLTable[] = [];
    filteredTables: AdvPLTable[] = [];
    filterType: string = 'Todos';
    searchQuery: string = '';
    envName: string | null = null;
    envId: string | null = null;
    isCustomEnv: boolean = false;
    private apiUrl = 'http://localhost:3000/api';

    // Modal State
    selectedTable: AdvPLTable | null = null;
    selectedTableFields: any[] = [];
    selectedTableIndices: any[] = [];
    isModalOpen: boolean = false;

    paginatedTables: AdvPLTable[] = [];
    currentPage: number = 1;
    itemsPerPage: number = 24;

    constructor(
        private advplService: AdvplDataService,
        private route: ActivatedRoute,
        private http: HttpClient,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.envName = params['env'] || null;
            this.envId = params['envId'] || null;
            this.isCustomEnv = !!this.envName;
            this.loadTables();
        });
    }

    loadTables() {
        if (this.isCustomEnv && this.envName) {
            // Load tables from database for custom environment
            this.loadTablesFromDatabase();
        } else {
            // Load default tables from service
            this.loadDefaultTables();
        }
    }

    loadDefaultTables() {
        forkJoin({
            tables: this.advplService.getAllTables(),
            fields: this.advplService.loadFields()
        }).subscribe(({ tables }) => {
            this.tables = tables;
            this.applyFilters();
        });
    }

    loadTablesFromDatabase() {
        const user = this.authService.getUser();
        if (!user) return;

        const userId = user.USER || user.user;

        // First, get the environment ID by name
        this.http.get<any>(`${this.apiUrl}/environments/${userId}`).pipe(
            map(response => {
                if (response.success && response.environments) {
                    const env = response.environments.find((e: any) => e.NOME === this.envName);
                    return env ? env.ID : null;
                }
                return null;
            }),
            switchMap(envId => {
                if (!envId) {
                    console.warn('Environment not found in database:', this.envName);
                    // Fallback to in-memory tables
                    return this.advplService.getAllTables(this.envName || undefined);
                }
                // Load tables from database
                return this.http.get<any>(`${this.apiUrl}/environments/${envId}/tables`).pipe(
                    map(response => {
                        if (response.success && response.tables) {
                            return response.tables.map((t: DbTable) => ({
                                name: t.NOME,
                                description: t.DESCRICAO || 'Sem descrição',
                                module: t.MODULO || 'Custom',
                                type: t.TIPO || 'Dados',
                                key: t.CHAVE || '',
                                environment: this.envName
                            } as AdvPLTable));
                        }
                        return [];
                    }),
                    catchError(err => {
                        console.error('Error loading tables from DB:', err);
                        return this.advplService.getAllTables(this.envName || undefined);
                    })
                );
            })
        ).subscribe(tables => {
            this.tables = tables;
            this.applyFilters();
        });
    }

    openTableDetail(table: AdvPLTable) {
        this.selectedTable = table;
        const details = this.advplService.getTableDetails(table.name);
        this.selectedTableFields = details.fields;
        this.selectedTableIndices = details.indices;
        this.isModalOpen = true;
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.isModalOpen = false;
        this.selectedTable = null;
        document.body.style.overflow = 'auto';
    }

    applyFilters() {
        let result = this.tables;

        // Filter by type
        if (this.filterType !== 'Todos') {
            result = result.filter(t => t.type === this.filterType);
        }

        // Filter by search
        if (this.searchQuery.trim()) {
            const q = this.searchQuery.toLowerCase();
            result = result.filter(t =>
                t.name.toLowerCase().includes(q) ||
                t.description.toLowerCase().includes(q) ||
                t.module.toLowerCase().includes(q)
            );
        }

        this.filteredTables = result;
        this.currentPage = 1;
        this.updatePaginatedTables();
    }

    updatePaginatedTables() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        this.paginatedTables = this.filteredTables.slice(startIndex, endIndex);

        const grid = document.querySelector('.tables-grid');
        if (grid) {
            grid.scrollTop = 0;
        }
    }

    changePage(delta: number) {
        const newPage = this.currentPage + delta;
        if (newPage >= 1 && newPage <= this.totalPages) {
            this.currentPage = newPage;
            this.updatePaginatedTables();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    get totalPages(): number {
        return Math.ceil(this.filteredTables.length / this.itemsPerPage);
    }

    setFilter(type: string) {
        this.filterType = type;
        this.applyFilters();
    }
}
