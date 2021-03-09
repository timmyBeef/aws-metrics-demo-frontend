// copy from ng-bootstrap/util/autoclose.ts and ng-bootstrap/util/focusTrap.ts
import { NgZone } from '@angular/core';
import { fromEvent, Observable, race } from 'rxjs';
import { delay, filter, map, takeUntil, withLatestFrom } from 'rxjs/operators';

const isContainedIn = (element: HTMLElement, array?: HTMLElement[]) =>
    array ? array.some(item => item.contains(element)) : false;

const matchesSelectorIfAny = (element: HTMLElement, selector?: string) =>
    !selector || closest(element, selector) != null;

// we'll have to use 'touch' events instead of 'mouse' events on iOS and add a more significant delay
// to avoid re-opening when handling (click) on a toggling element
// TODO: use proper Angular platform detection when NgbAutoClose becomes a service and we can inject PLATFORM_ID
let iOS = false;
if (typeof navigator !== 'undefined') {
    iOS = !!navigator.userAgent && /iPad|iPhone|iPod/.test(navigator.userAgent);
}

export function closest(element: HTMLElement, selector): HTMLElement {
    if (!selector) {
        return null;
    }

    return element.closest(selector);
}

export function ngbAutoClose(
    zone: NgZone, document: any, type: boolean | 'inside' | 'outside', close: () => void, closed$: Observable<any>,
    insideElements: HTMLElement[], ignoreElements?: HTMLElement[], insideSelector?: string) {
    // closing on ESC and outside clicks
    if (type) {
        zone.runOutsideAngular(() => {

            const shouldCloseOnClick = (event: MouseEvent | TouchEvent) => {
                const element = event.target as HTMLElement;
                if ((event instanceof MouseEvent && event.button === 2) || isContainedIn(element, ignoreElements)) {
                    return false;
                }
                if (type === 'inside') {
                    return isContainedIn(element, insideElements) && matchesSelectorIfAny(element, insideSelector);
                } else if (type === 'outside') {
                    return !isContainedIn(element, insideElements);
                } else /* if (type === true) */ {
                    return matchesSelectorIfAny(element, insideSelector) || !isContainedIn(element, insideElements);
                }
            };

            const escapes$ = fromEvent<KeyboardEvent>(document, 'keydown')
                .pipe(
                    takeUntil(closed$),
                    // tslint:disable-next-line:deprecation
                    filter(e => e.which === 27));


            // we have to pre-calculate 'shouldCloseOnClick' on 'mousedown/touchstart',
            // because on 'mouseup/touchend' DOM nodes might be detached
            const mouseDowns$ = fromEvent<MouseEvent>(document, iOS ? 'touchstart' : 'mousedown')
                .pipe(map(shouldCloseOnClick), takeUntil(closed$));

            const closeableClicks$ = fromEvent<MouseEvent>(document, iOS ? 'touchend' : 'mouseup')
                .pipe(
                    withLatestFrom(mouseDowns$), filter(([_, shouldClose]) => shouldClose),
                    delay(iOS ? 16 : 0), takeUntil(closed$));


            race<Event>([escapes$, closeableClicks$]).subscribe(() => zone.run(close));
        });
    }
}

const FOCUSABLE_ELEMENTS_SELECTOR = [
    'a[href]', 'button:not([disabled])', 'input:not([disabled]):not([type="hidden"])', 'select:not([disabled])',
    'textarea:not([disabled])', '[contenteditable]', '[tabindex]:not([tabindex="-1"])'
].join(', ');

/**
 * Returns first and last focusable elements inside of a given element based on specific CSS selector
 */
export function getFocusableBoundaryElements(element: HTMLElement): HTMLElement[] {
    const list: HTMLElement[] =
        Array.from(element.querySelectorAll(FOCUSABLE_ELEMENTS_SELECTOR) as NodeListOf<HTMLElement>)
            .filter(el => el.tabIndex !== -1);
    return [list[0], list[list.length - 1]];
}

/**
 * Function that enforces browser focus to be trapped inside a DOM element.
 *
 * Works only for clicks inside the element and navigation with 'Tab', ignoring clicks outside of the element
 *
 * @param element The element around which focus will be trapped inside
 * @param stopFocusTrap$ The observable stream. When completed the focus trap will clean up listeners
 * and free internal resources
 * @param refocusOnClick Put the focus back to the last focused element whenever a click occurs on element (default to
 * false)
 */
export const ngbFocusTrap = (element: HTMLElement, stopFocusTrap$: Observable<any>, refocusOnClick = false) => {
    // last focused element
    const lastFocusedElement$ =
        fromEvent<FocusEvent>(element, 'focusin').pipe(takeUntil(stopFocusTrap$), map(e => e.target));

    // 'tab' / 'shift+tab' stream
    fromEvent<KeyboardEvent>(element, 'keydown')
        .pipe(
            takeUntil(stopFocusTrap$),
            // tslint:disable:deprecation
            filter(e => e.which === 9),
            // tslint:enable:deprecation
            withLatestFrom(lastFocusedElement$))
        .subscribe(([tabEvent, focusedElement]) => {
            const[first, last] = getFocusableBoundaryElements(element);

            if ((focusedElement === first || focusedElement === element) && tabEvent.shiftKey) {
                last.focus();
                tabEvent.preventDefault();
            }

            if (focusedElement === last && !tabEvent.shiftKey) {
                first.focus();
                tabEvent.preventDefault();
            }
        });

    // inside click
    if (refocusOnClick) {
        fromEvent(element, 'click')
            .pipe(takeUntil(stopFocusTrap$), withLatestFrom(lastFocusedElement$), map(arr => arr[1] as HTMLElement))
            .subscribe(lastFocusedElement => lastFocusedElement.focus());
    }
};
