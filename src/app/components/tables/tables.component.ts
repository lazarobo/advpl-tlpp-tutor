import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdvplDataService, AdvPLTable } from '../../services/advpl-data.service';
import { forkJoin } from 'rxjs';

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

    // Modal State
    selectedTable: AdvPLTable | null = null;
    selectedTableFields: any[] = [];
    selectedTableIndices: any[] = [];
    isModalOpen: boolean = false;

    paginatedTables: AdvPLTable[] = [];
    currentPage: number = 1;
    itemsPerPage: number = 24;

    constructor(private advplService: AdvplDataService) { }

    ngOnInit() {
        // Load both Tables (SX2) and Fields (SX3)
        forkJoin({
            tables: this.advplService.getAllTables(),
            fields: this.advplService.loadFields()
        }).subscribe(({ tables }) => {
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
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    closeModal() {
        this.isModalOpen = false;
        this.selectedTable = null;
        document.body.style.overflow = 'auto'; // Restore scrolling
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

        // Scroll to top of grid behavior (optional)
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

            // Scroll to top of page
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
