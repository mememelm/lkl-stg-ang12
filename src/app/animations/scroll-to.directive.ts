import { AfterViewInit, Directive, ElementRef } from '@angular/core'

@Directive({
  selector: '[appScrollTo]'
})
export class ScrollToDirective implements AfterViewInit {

  constructor(private element: ElementRef) { }

  ngAfterViewInit() {
    this.element.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
  }

}
