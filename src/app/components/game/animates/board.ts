import { animate, animation, AnimationReferenceMetadata, keyframes, style, transition, trigger, useAnimation } from '@angular/animations';

// Animation appearance of the board
export const boardAnimate = animation(
    [
        style([{ opacity: 0 }]),
        animate(
            '.8s ease-in-out',
            keyframes([
                style([{ opacity: 1, transform: 'translateY(90vw)' }]),
                style([{ opacity: 1, transform: 'translateY(0)' }])
            ])
        ),
    ]
);

export function runBoardAnimate(
): AnimationReferenceMetadata {
    return useAnimation(boardAnimate);
}

export const activeBoard = trigger('activeBoard', [
    transition(':enter', useAnimation(boardAnimate)),
]);
