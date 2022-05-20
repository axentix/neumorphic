interface NeuHTMLElement extends HTMLElement {
  toggleRef: any;
  neuCurrentClass: string;
  neuActive: boolean;
}

let neuClickElements: NodeListOf<NeuHTMLElement>,
  neuFocusElements: NodeListOf<NeuHTMLElement>,
  neuClickedElements: NodeListOf<NeuHTMLElement>,
  neuHoverElements: NodeListOf<NeuHTMLElement>;

const stateList = ['neu-bordered', 'neu-flat', 'neu-pressed', 'neu-concave', 'neu-convex'];

const toggle = (el: NeuHTMLElement, datasetName: string, e: Event) => {
  if (el.dataset[datasetName] && !stateList.includes(el.dataset[datasetName])) {
    console.error('[Neu-Axentix] Error: invalid classname on', el);
    return;
  }

  if (datasetName === 'neuClick') {
    if (el.neuActive) {
      if (e.type === 'mousedown' || e.type === 'touchstart') return;

      el.neuActive = false;
    } else {
      if (
        e.type === 'mouseup' ||
        e.type === 'mouseleave' ||
        e.type === 'touchend' ||
        e.type === 'touchmove'
      ) {
        return;
      }
      el.neuActive = true;
    }
  }

  if (datasetName === 'neuHover') {
    if (!el.neuActive && e.type === 'mouseenter') {
      el.neuActive = true;
    } else if (!el.neuActive && e.type === 'mouseleave') {
      return;
    } else if (el.neuActive && e.type === 'mouseleave') {
      el.neuActive = false;
    }
  }

  const nextClass = el.dataset[datasetName];
  if (el.neuCurrentClass) {
    el.classList.remove(el.neuCurrentClass);
    el.dataset[datasetName] = el.neuCurrentClass;
  } else {
    el.dataset[datasetName] = '';
  }

  if (nextClass) {
    el.classList.add(nextClass);
    el.neuCurrentClass = nextClass;
  } else {
    el.neuCurrentClass = '';
  }
};

const setupClasses = (el: NeuHTMLElement) => {
  const classList = el.className.split(' ');

  const neumorphClasses = classList.filter((className) => stateList.includes(className));
  if (neumorphClasses.length >= 2) {
    const newClasses = classList.filter((className) => !neumorphClasses.includes(className));
    newClasses.push(neumorphClasses[0]);
    el.className = newClasses.join(' ');
  }

  el.neuCurrentClass = neumorphClasses[0] || '';
};

const setup = () => {
  neuClickElements = document.querySelectorAll('[data-neu-click]');
  neuFocusElements = document.querySelectorAll('[data-neu-focus]');
  neuClickedElements = document.querySelectorAll('[data-neu-clicked]');
  neuHoverElements = document.querySelectorAll('[data-neu-hover]');

  neuClickedElements.forEach((el) => {
    setupClasses(el);
    el.toggleRef = toggle.bind(null, el, 'neuClicked');

    el.addEventListener('click', el.toggleRef);
  });

  neuClickElements.forEach((el) => {
    setupClasses(el);
    el.toggleRef = toggle.bind(null, el, 'neuClick');

    el.addEventListener('mousedown', el.toggleRef);
    el.addEventListener('mouseleave', el.toggleRef);
    el.addEventListener('mouseup', el.toggleRef);

    if ('ontouchstart' in document.documentElement) {
      el.addEventListener('touchstart', el.toggleRef);
      el.addEventListener('touchend', el.toggleRef);
    }
  });

  neuFocusElements.forEach((el) => {
    setupClasses(el);
    el.toggleRef = toggle.bind(null, el, 'neuFocus');

    el.addEventListener('focus', el.toggleRef);
    el.addEventListener('blur', el.toggleRef);
  });

  neuHoverElements.forEach((el) => {
    setupClasses(el);
    el.toggleRef = toggle.bind(null, el, 'neuHover');

    el.addEventListener('mouseenter', el.toggleRef);
    el.addEventListener('mouseleave', el.toggleRef);
  });
};

export const reset = () => {
  if (neuClickedElements) {
    neuClickedElements.forEach((el) => {
      el.removeEventListener('click', el.toggleRef);
      el.toggleRef = undefined;
    });
  }

  if (neuClickElements) {
    neuClickElements.forEach((el) => {
      el.removeEventListener('mousedown', el.toggleRef);
      el.removeEventListener('mouseleave', el.toggleRef);
      el.removeEventListener('mouseup', el.toggleRef);

      if ('ontouchstart' in document.documentElement) {
        el.removeEventListener('touchstart', el.toggleRef);
        el.removeEventListener('touchend', el.toggleRef);
      }
      el.toggleRef = undefined;
    });
  }

  if (neuFocusElements) {
    neuFocusElements.forEach((el) => {
      el.removeEventListener('focus', el.toggleRef);
      el.removeEventListener('blur', el.toggleRef);
      el.toggleRef = undefined;
    });
  }

  if (neuHoverElements) {
    neuHoverElements.forEach((el) => {
      el.removeEventListener('mouseenter', el.toggleRef);
      el.removeEventListener('mouseleave', el.toggleRef);
      el.toggleRef = undefined;
    });
  }

  setup();
};

document.addEventListener('DOMContentLoaded', setup);
