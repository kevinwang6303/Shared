import {
  trigger,
  AnimationTriggerMetadata,
  state,
  style,
  transition,
  animate,
  keyframes
} from '@angular/animations';

import { fade } from './animation/fade';
import { bounce } from './animation/bounce';
import { rotate } from './animation/rotate';
import { slide } from './animation/slide';
import { zoom } from './animation/zoom';

// inspired by https://github.com/yuyang041060120/ng2-animate  https://yuyang041060120.github.io/ng2-animate/
export function animateFactory
  (timing: string = `150ms 0ms linear`): AnimationTriggerMetadata {
  return trigger('animate', [
    ...fade(timing),
    ...bounce(timing),
    ...rotate(timing),
    ...slide(timing),
    ...zoom(timing)
  ]);
}

export function fadeInOut(inTime: number = 300, outTime: number = 150): AnimationTriggerMetadata {
  return trigger('fadeInOut', [
    state('hidden', style({ opacity: 0, display: 'none' })),
    state('show', style({})),
    transition('hidden => show', [ // void <=> *
      animate(`${inTime}ms ease-in-out`)
    ]),
    transition('show => hidden', [ // void <=> *
      animate(`${outTime}ms ease-in-out`)
    ]),
  ]);
}

export let pulse = trigger('pulse', [
  transition('void => *', [ // void <=> *
    animate(`5s ease-in-out`, keyframes([
      style({
        offset: .5
        , transform: 'scale3d(1.05, 1.05, 1.05)'
      })
    ]))
  ])
]);

export function slideToLeft() {
  return trigger('routerTransition', [
    state('void', style({ position: 'fixed', width: '100%' })),
    state('*', style({ position: 'fixed', width: '100%' })),
    transition(':enter', [  // before 2.1: transition('void => *', [
      style({ transform: 'translateX(100%)' }),
      animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
    ]),
    transition(':leave', [  // before 2.1: transition('* => void', [
      style({ transform: 'translateX(0%)' }),
      animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
    ])
  ]);
}

export function flyInOut() {
  return trigger('flyInOut', [
    state('in', style({ opacity: 1, transform: 'translateX(0)' })),
    transition('void => *', [
      style({
        opacity: 0,
        transform: 'translateX(-100%)'
      }),
      animate('0.2s ease-in')
    ]),
    transition('* => void', [
      animate('0.2s 10 ease-out', style({
        opacity: 0,
        transform: 'translateX(100%)'
      }))
    ])
  ]);
}

export function popup(inTime: number = 300, outTime: number = 150): AnimationTriggerMetadata {
  return trigger('popup', [
    state('in', style({
      opacity: 1
    })),
    transition('void => *', [
      style({
        opacity: 0,
      }),
      animate(inTime)
    ]),
    transition('* => void', [
      animate(outTime, style({
        opacity: 0
      }))
    ])
  ]);
}

export const slideInDownAnimation: AnimationTriggerMetadata =
  trigger('routeAnimation', [
    state('*',
      style({
        opacity: 1,
        transform: 'translateX(0)'
      })
    ),
    transition(':enter', [
      style({
        opacity: 0,
        transform: 'translateX(-100%)'
      }),
      animate('0.2s ease-in')
    ]),
    transition(':leave', [
      animate('0.5s ease-out', style({
        opacity: 0,
        transform: 'translateY(100%)'
      }))
    ])
  ]);

export function menuSlideToBottom() {
  return trigger('menuSlide', [
    state('0', style({})),
    state('1', style({ height: '400px' })),
    transition('0 => 1', [  // before 2.1: transition('void => *', [
      style({ height: '0' }),
      animate('.8s ease-in-out', style({ height: '400px' }))
    ]),
    transition('1 => 0', [  // before 2.1: transition('* => void', [
      style({ height: '400px' }),
      animate('.8s ease-in-out', style({ height: '0' }))
    ])
  ]);
}
