import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

export type Theme = 'light' | 'dark' | 'default';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private renderer: Renderer2;
    private currentTheme: Theme = 'default';

    constructor(rendererFactory: RendererFactory2) {
        this.renderer = rendererFactory.createRenderer(null, null);
        const savedTheme = localStorage.getItem('user-theme') as Theme;
        if (savedTheme) {
            this.setTheme(savedTheme);
        }
    }

    setTheme(theme: Theme) {
        this.currentTheme = theme;
        localStorage.setItem('user-theme', theme);

        // Remove all theme classes
        this.renderer.removeClass(document.body, 'light-theme');
        this.renderer.removeClass(document.body, 'dark-theme');
        this.renderer.removeClass(document.body, 'default-theme');

        // Add selected theme class
        if (theme !== 'default') {
            this.renderer.addClass(document.body, `${theme}-theme`);
        } else {
            this.renderer.addClass(document.body, 'default-theme');
        }
    }

    getTheme(): Theme {
        return this.currentTheme;
    }
}
