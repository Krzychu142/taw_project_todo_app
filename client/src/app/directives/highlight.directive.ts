import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
    selector: '[appHighlight]'
})
export class HighlightDirective {
    private originalColor: string | null = null;

    constructor(private el: ElementRef, private renderer: Renderer2) { }

    @HostListener('mouseenter') onMouseEnter() {
        this.originalColor = this.el.nativeElement.style.color;
        this.highlight('blue');
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.highlight(this.originalColor);
    }

    private highlight(color: string | null) {
        this.renderer.setStyle(this.el.nativeElement, 'color', color);
    }
}
