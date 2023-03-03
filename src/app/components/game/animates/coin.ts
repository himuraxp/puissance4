import { animate, animation, AnimationReferenceMetadata, keyframes, style, transition, trigger, useAnimation } from '@angular/animations';

export const coinAnimate = animation(
    [
        style([{ opacity: 0 }]),
        animate(
            '.8s ease-in-out',
            keyframes([
                style([{ opacity: 0, transform: 'translateY(-700px)' }]),
                style([{ opacity: 1, transform: 'translateY(0)' }]),
                style([{ transform: 'translateY(-62px)' }]),
                style([{ transform: 'translateY(0)' }]),
                style([{ transform: 'translateY(-18px)' }]),
                style([{ transform: 'translateY(0)' }]),
                style([{ transform: 'translateY(-6px)' }]),
                style([{ transform: 'translateY(0)' }]),
            ])
        ),
    ]
);

export function runAnimate(
): AnimationReferenceMetadata {
    return useAnimation(coinAnimate);
}

export const activeCoin = trigger('activeCoin', [
    transition(':enter', useAnimation(coinAnimate)),
]);
