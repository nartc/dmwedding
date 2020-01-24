import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appDeferImage]',
})
export class DeferImageDirective implements AfterViewInit {
  @Input() appDeferImage = '';

  private intersectionObserver: IntersectionObserver;
  private loader: HTMLDivElement;

  constructor(
    private readonly elementRef: ElementRef<HTMLImageElement>,
    private readonly renderer: Renderer2,
  ) {}

  ngAfterViewInit(): void {
    this.createLoader();
    this.intersectionObserver = new IntersectionObserver(entries => {
      this.checkForIntersection(entries);
    }, {});
    this.intersectionObserver.observe(this.elementRef.nativeElement);
  }

  private checkForIntersection(entries: IntersectionObserverEntry[]) {
    for (const entry of entries) {
      const { isIntersecting, target } = entry;
      if (isIntersecting && target === this.elementRef.nativeElement) {
        this.removeLoader();
        this.elementRef.nativeElement.src = this.appDeferImage;
        this.intersectionObserver.unobserve(this.elementRef.nativeElement);
        this.intersectionObserver.disconnect();
      }
    }
  }

  private createLoader() {
    this.renderer.addClass(
      this.elementRef.nativeElement.parentElement,
      'loading',
    );
  }

  private removeLoader() {
    this.renderer.removeClass(
      this.elementRef.nativeElement.parentElement,
      'loading',
    );
  }
}
