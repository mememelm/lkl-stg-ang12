import { animate, style, transition, trigger } from '@angular/animations'

export const ngIfAnimation = trigger('ngIfAnimation', [
  transition(':enter', [
    style({ transform: 'translateY(50px)', opacity: 0 }),
    animate('.7s ease-out', style({ transform: 'translateY(0px)', opacity: 1 }))
  ]),
  transition(':leave', [
    style({ transform: 'translateY(0px)', opacity: 1 }),
    animate('.7s ease-in', style({ transform: 'translateY(50px)', opacity: 0 }))
  ])
])
