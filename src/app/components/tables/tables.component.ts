import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdvplDataService, AdvPLTable } from '../../services/advpl-data.service';

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

    constructor(private advplService: AdvplDataService) { }

    ngOnInit() {
        this.tables = this.advplService.getAllTables();
        this.applyFilters();
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
    }

    setFilter(type: string) {
        this.filterType = type;
        this.applyFilters();
    }
}
