import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdvplDataService, AdvPLFunction } from '../../services/advpl-data.service';

@Component({
    selector: 'app-functions',
    standalone: true,
    imports: [CommonModule, RouterLink, FormsModule],
    templateUrl: './functions.component.html',
    styleUrl: './functions.component.css'
})
export class FunctionsComponent implements OnInit {
    functions: AdvPLFunction[] = [];
    categories: string[] = [];
    selectedCategory: string = 'Todos';
    searchQuery: string = '';

    constructor(
        private advplService: AdvplDataService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.categories = ['Todos', ...this.advplService.getCategories()];

        this.route.queryParams.subscribe(params => {
            if (params['category']) {
                this.selectedCategory = params['category'];
            }
            this.filterFunctions();
        });
    }

    filterFunctions() {
        let filtered = this.selectedCategory === 'Todos'
            ? this.advplService.getAllFunctions()
            : this.advplService.getFunctionsByCategory(this.selectedCategory);

        if (this.searchQuery.trim()) {
            const query = this.searchQuery.toLowerCase();
            filtered = filtered.filter(f =>
                f.name.toLowerCase().includes(query) ||
                f.description.toLowerCase().includes(query)
            );
        }

        this.functions = filtered;
    }

    selectCategory(category: string) {
        this.selectedCategory = category;
        this.filterFunctions();
    }
}
