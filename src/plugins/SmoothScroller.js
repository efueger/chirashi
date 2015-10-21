import { forEach, forElements, getElement } from '../core';
import { closest, append, remove } from '../dom';
import { style, height, width, size, transform, offset, screenPosition, hide, show } from '../styles';
import { drag, undrag } from '../events';
import { defaultify, between } from '../utils';
import { VirtualScroll } from './VirtualScroll';
import './scroll60fps';

let defaults = {
  ease: 0.2,
  autoEase: 0.08,
  fixed: []
};

export class SmoothScroller {
  constructor(config) {
    if (typeof config == 'string')
      config = {
        wrapper: config
      };

    this.config = defaultify(config, defaults);

    this.wrapper = getElement(this.config.wrapper);

    this.ease = this.config.ease;
    this.autoEase = this.config.autoEase;
    this.scrollDisabled = false;

    style('html, body', {
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      position: 'fixed'
    });

    this.scrollable = [];
    this.addScrollable(this.wrapper, this.config.scrollbar);

    this.scrollCallbacks = [];

    this.localCallback = this.scrolling.bind(this);
    VirtualScroll.on(this.localCallback);

    this.fixed = [];
    this.fixElements(this.config.fixed);

    this.normalScroll();
    this.update();
  }

  get scroll() {
    return this.scrollable[0].scroll;
  }

  set scroll(value) {
    this.scrollable[0].scroll = value;
  }

  get scrollTarget() {
    return this.scrollable[0].scrollTarget;
  }

  set scrollTarget(value) {
    this.scrollable[0].scrollTarget = value;
  }

  get delta() {
    return this.scrollable[0].delta;
  }

  scrolling(event) {
    if (this.scrollDisabled) return;

    let scrollable;
    if (event.originalEvent.pageX) {
      let element = document.elementFromPoint(event.originalEvent.pageX, event.originalEvent.pageY);
      scrollable = this.scrollable.slice();
      scrollable.sort((a, b) => {
        let levelA = { value: 0 },
            levelB = { value: 0 };

        let foundA = !!closest(element, a.element, levelA),
            foundB = !!closest(element, b.element, levelB);

        if (!foundA) return 1;
        if (!foundB) return -1;

        return levelA.value - levelB.value;
      });

      scrollable = scrollable[0];
    }
    else {
      scrollable = this.scrollable[0];
    }

    scrollable.delta = {
        x: event.deltaX,
        y: event.deltaY
    };

    const wrapperSize = size(scrollable.element),
          parentSize  = size(scrollable.parent);

    scrollable.scrollTarget = {
        x: Math.min(Math.max(scrollable.scroll.x - scrollable.delta.x, 0), wrapperSize.width > parentSize.width ? wrapperSize.width - parentSize.width : 0),
        y: Math.min(Math.max(scrollable.scroll.y - scrollable.delta.y, 0), wrapperSize.height > parentSize.height ? wrapperSize.height - parentSize.height : 0)
    };
  }

  updateScroll(ease) {
    forEach(this.scrollable, (scrollable) => {
      scrollable.scroll = {
        x: scrollable.scroll.x + (scrollable.scrollTarget.x - scrollable.scroll.x) * ease,
        y: scrollable.scroll.y + (scrollable.scrollTarget.y - scrollable.scroll.y) * ease
      };
    });
  }

  normalScroll() {
    if (this.scrollDisabled) return;

    this.updateScroll(this.ease);

    this.normalRequest = requestAnimationFrame(this.normalScroll.bind(this));
  }

  autoScroll() {
    this.updateScroll(this.autoEase);

    if (Math.abs(this.scrollTarget.y - this.scroll.y) > 1 || Math.abs(this.scrollTarget.x - this.scroll.x) > 1)
        this.autoScrollRequest = requestAnimationFrame(this.autoScroll.bind(this));
    else
        this.enableScroll();
  }

  triggerCallbacks() {
    let i = this.scrollCallbacks.length;
    while(i--) this.scrollCallbacks[i](this.scrollTarget);
  }

  update() {
    if (this.scrollTarget.y - this.scroll.y) this.triggerCallbacks();

    forEach(this.scrollable, (scrollable) => {
      transform(scrollable.element, {
        x: -scrollable.scroll.x,
        y: -scrollable.scroll.y
      });

      scrollable.xRatio = scrollable.scroll.x / (width(scrollable.element) - width(scrollable.parent));
      scrollable.yRatio = scrollable.scroll.y / (height(scrollable.element) - height(scrollable.parent));

      if (scrollable.scrollbar && scrollable.scrollbar.horizontal) {
        transform(scrollable.scrollbar.horizontal.cursor, {
          x: scrollable.xRatio * (width(scrollable.scrollbar.horizontal.bar) - width(scrollable.scrollbar.horizontal.cursor))
        });
      }

      if (scrollable.scrollbar && scrollable.scrollbar.vertical) {
        transform(scrollable.scrollbar.vertical.cursor, {
          y: scrollable.yRatio * (height(scrollable.scrollbar.vertical.bar) - height(scrollable.scrollbar.vertical.cursor))
        });
      }
    });

    forEach(this.fixed, (fixed) => {
        transform(fixed.element, {
            x: this.scroll.x - fixed.initial.x,
            y: this.scroll.y - fixed.initial.y
        });
    });

    this.updateRequest = requestAnimationFrame(this.update.bind(this));
  }

  on(callback) {
    this.scrollCallbacks.push(callback);
  }

  off(callback) {
    this.scrollCallbacks.splice(this.scrollCallbacks.indexOf(callback));
  }

  scrollTo(target) {
    this.disableScroll();

    const wrapperWidth  = width(this.wrapper),
          windowWidth   = window.innerWidth,
          wrapperHeight = height(this.wrapper),
          windowHeight  = window.innerHeight;

    this.scrollTarget = {
        x: Math.min(Math.max(target.x, 0), wrapperWidth > windowWidth ? wrapperWidth - windowWidth : 0),
        y: Math.min(Math.max(target.y, 0), wrapperHeight > windowHeight ? wrapperHeight - windowHeight : 0)
    };

    this.autoScroll();
  }

  disableScroll() {
    this.scrollDisabled = true;
  }

  enableScroll() {
    this.scrollDisabled = false;
    this.normalScroll();
  }

  addScrollable(elements, scrollbar=false) {
    forElements(elements, (element) => {
      style(element.parentNode, {
        overflow: 'hidden'
      });

      let index = this.scrollable.push({
        element: element,
        parent: element.parentNode,
        scroll: {
          x: 0,
          y: 0
        },
        scrollTarget: {
          x: 0,
          y: 0
        }
      }) - 1;

      let scrollable = this.scrollable[index];
      if (scrollbar == 'auto' || scrollbar == 'vertical') {
        let scrollbarElement = append(element.parentNode, '<div class="scrollbar vertical"></div>'),
            cursorElement = append(scrollbarElement, '<div class="cursor"></div>');

        if (!scrollable.scrollbar) scrollable.scrollbar = {};
        scrollable.scrollbar.vertical = {
          bar: scrollbarElement,
          cursor: cursorElement
        };

        height(scrollable.scrollbar.vertical.cursor, height(scrollable.parent)/height(scrollable.element)*100+'%');

        let handleScrollCursor = (position) => {
          let ratio = between((position.y - screenPosition(scrollbarElement).top - height(scrollable.scrollbar.vertical.cursor)/2) / (height(scrollable.scrollbar.vertical.bar) - height(scrollable.scrollbar.vertical.cursor)));
          scrollable.scrollTarget.y = ratio * (height(scrollable.element) - height(scrollable.parent));
        };

        scrollable.dragVCallbacks = drag(scrollbarElement, handleScrollCursor, handleScrollCursor);
      }

      if (scrollbar == 'auto' || scrollbar == 'horizontal') {
        let scrollbarElement = append(element.parentNode, '<div class="scrollbar horizontal"></div>'),
            cursorElement = append(scrollbarElement, '<div class="cursor"></div>');

        if (!scrollable.scrollbar) scrollable.scrollbar = {};
        scrollable.scrollbar.horizontal = {
          bar: scrollbarElement,
          cursor: cursorElement
        };

        width(scrollable.scrollbar.horizontal.cursor, width(scrollable.parent)/width(scrollable.element)*100+'%');

        let handleScrollCursor = (position) => {
          let ratio = between((position.x - screenPosition(scrollbarElement).left - width(scrollable.scrollbar.horizontal.cursor)/2) / (width(scrollable.scrollbar.horizontal.bar) - width(scrollable.scrollbar.horizontal.cursor)));
          scrollable.scrollTarget.x = ratio * (width(scrollable.element) - width(scrollable.parent));
        };

        scrollable.dragHCallbacks = drag(scrollbarElement, handleScrollCursor, handleScrollCursor);
      }
    });
  }

  refreshScrollbars() {
    forEach(this.scrollable, (scrollable) => {
      if (!scrollable.scrollbar) return;

      if (scrollable.scrollbar.vertical) {
        let ratio = between(height(scrollable.parent)/height(scrollable.element));
        height(scrollable.scrollbar.vertical.cursor, ratio*100+'%');

        if (ratio == 1 || ratio == 0) hide(scrollable.scrollbar.vertical.bar);
        else show(scrollable.scrollbar.vertical.bar);
      }

      if (scrollable.scrollbar.horizontal) {
        let ratio = between(width(scrollable.parent)/width(scrollable.element));
        width(scrollable.scrollbar.horizontal.cursor, ratio*100+'%');

        if (ratio == 1 || ratio == 0) hide(scrollable.scrollbar.horizontal.bar);
        else show(scrollable.scrollbar.horizontal.bar);
      }
    });
  }

  removeScrollable(elements) {
    forElements(elements, (element) => {
      style(element.parentNode, {
        overflow: ''
      });

      let i = this.scrollable.length, done = false;

      while(!done && i--) {
        if (done = this.scrollable[i].element == element) {
          let scrollable = this.scrollable[i];

          undrag(scrollable.dragVCallbacks);
          undrag(scrollable.dragHCallbacks);

          if(scrollable.scrollbar.horizontal) remove(scrollable.scrollbar.horizontal.bar);
          if(scrollable.scrollbar.vertical) remove(scrollable.scrollbar.vertical.bar);

          this.scrollable.splice(i, 1);
        }
      }
    });
  }

  fixElements(elements) {
    style(elements, {
        position: 'absolute'
    });

    forElements(elements, (element) => {
      let elOffset = offset(element);
      this.fixed.push({
        element: element,
        initial: this.scroll
      });
    });
  }

  unfixElements(elements) {
    style(elements, {
        position: '',
        transform: ''
    });

    forElements(elements, (element) => {
      let i = this.fixed.length, done = false;

      while(!done && i--) {
        if (done = this.fixed[i].element == element) {
          this.fixed.splice(i, 1);
          style(element, {
            transform: ''
          });
        }
      }
    });
  }

  kill() {
      cancelAnimationFrame(this.normalRequest);
      cancelAnimationFrame(this.autoScrollRequest);
      cancelAnimationFrame(this.updateRequest);
      VirtualScroll.off(this.localCallback);

      style('html, body', {
        width: '',
        height: '',
        overflow: '',
        position: ''
      });

      forEach(this.scrollable, (scrollable) => {
        style(scrollable.parent, {
          overflow: ''
        });

        remove(scrollable.parent, '.scrollbar');

        undrag(scrollable.dragVCallbacks);
        undrag(scrollable.dragHCallbacks);
      });
      this.scrollable = null;

      forEach(this.fixed, fixed => {
        style(fixed.element, {
          transform: ''
        });
      });
      this.fixed = null;

      style(this.wrapper, {
        transform: '',
        'will-change': ''
      });
  }
};
