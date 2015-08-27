import { forEach } from '../core';
import { off } from './off';

export function unhover (elements, enter, leave) {
  forEach(elements, (element) => {
    if (enter) off(element, 'mouseenter', enter);
    if (leave) off(element, 'mouseleave', leave);
  });
}