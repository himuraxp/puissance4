import { animate, animation, AnimationReferenceMetadata, keyframes, style, transition, trigger, useAnimation } from '@angular/animations';

// Animation block score of player 1
export const player1Animate = animation(
    [
        style([{ opacity: 0 }]),
        animate(
            '.8s ease-in-out',
            keyframes([
                style([{ opacity: 0, left: '-90vw' }]),
                style([{ opacity: 1, left: '0' }])
            ])
        ),
    ]
);

export function runPlayer1Animate(
): AnimationReferenceMetadata {
    return useAnimation(player1Animate);
}

export const activePlayer1 = trigger('activePlayer1', [
    transition(':enter', useAnimation(player1Animate)),
]);

// Animation block score of player 2
export const player2Animate = animation(
    [
        style([{ opacity: 0 }]),
        animate(
            '.8s ease-in-out',
            keyframes([
                style([{ opacity: 0, right: '-90vw' }]),
                style([{ opacity: 1, right: '0' }])
            ])
        ),
    ]
);

export function runPlayer2Animate(
): AnimationReferenceMetadata {
    return useAnimation(player2Animate);
}

export const activePlayer2 = trigger('activePlayer2', [
    transition(':enter', useAnimation(player2Animate)),
]);
