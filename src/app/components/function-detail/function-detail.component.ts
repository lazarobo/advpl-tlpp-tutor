import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { AdvplDataService, AdvPLFunction } from '../../services/advpl-data.service';

@Component({
    selector: 'app-function-detail',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './function-detail.component.html',
    styleUrl: './function-detail.component.css'
})
export class FunctionDetailComponent implements OnInit {
    functionData: AdvPLFunction | undefined;
    relatedFunctions: AdvPLFunction[] = [];
    functionName: string = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private advplService: AdvplDataService
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.functionName = params['name'];
            this.loadFunctionData();
        });
    }

    loadFunctionData() {
        this.functionData = this.advplService.getFunctionByName(this.functionName);

        if (!this.functionData) {
            // Redirect to list if not found
            this.router.navigate(['/functions']);
            return;
        }

        // Load related functions
        this.relatedFunctions = [];
        if (this.functionData.related) {
            this.functionData.related.forEach(name => {
                const related = this.advplService.getFunctionByName(name);
                if (related) {
                    this.relatedFunctions.push(related);
                }
            });
        }
    }

    copyCode(code: string) {
        navigator.clipboard.writeText(code).then(() => {
            // Could show a toast notification here
            console.log('Code copied!');
        });
    }
}
