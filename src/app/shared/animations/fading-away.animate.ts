import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';

export const transformPanel = trigger('transformPanel', [
    state('void', style({
        transform: 'scaleY(0)',
        minWidth: '100%',
        opacity: 1,
    })),
    state('showing', style({
        opacity: 1,
        minWidth: 'calc(100% + 32px)',
        transform: 'scaleY(1)',
    })),
    state('showing-multiple', style({
        opacity: 1,
        minWidth: 'calc(100% + 64px)',
        transform: 'scaleY(1)',
    })),
    transition('void => *', animate('220ms cubic-bezier(0.1, 0, 0.2, 1)')),
    transition('* => void', animate('100ms 25ms linear', style({opacity: 1})))
]);


export const showAnimate = trigger('showAnimate', [
    transition(':enter', [
        animate('1s', keyframes([
            style({
                offset: 0,
                opacity: 0
            }),
            style({
                offset: 1,
                opacity: 1
            })
        ]))
    ])
]);

