const NeuAxentix = (() => {
  let neuClickElements, neuFocusElements, neuClickedElements, neuHoverElements;
  const stateList = ['neu-bordered', 'neu-flat', 'neu-pressed', 'neu-concave', 'neu-convex'];

  /**
   * Toggle neu-clicked state
   */
  function _toggle(datasetName, e) {
    if (this.dataset[datasetName] && !stateList.includes(this.dataset[datasetName])) {
      console.error('Error: invalid classname in data-neu-...');
      return;
    }

    if (datasetName === 'neuClick') {
      if (this.neuActive) {
        if (e.type === 'mousedown' || e.type === 'touchstart') {
          return;
        }
        this.neuActive = false;
      } else {
        if (
          e.type === 'mouseup' ||
          e.type === 'mouseleave' ||
          e.type === 'touchend' ||
          e.type === 'touchmove'
        ) {
          return;
        }
        this.neuActive = true;
      }
    }

    if (datasetName === 'neuHover') {
      if (!this.neuActive && e.type === 'mouseenter') {
        this.neuActive = true;
      } else if (!this.neuActive && e.type === 'mouseleave') {
        return;
      } else if (this.neuActive && e.type === 'mouseleave') {
        this.neuActive = false;
      }
    }

    const nextClass = this.dataset[datasetName];
    if (this.neuCurrClass) {
      this.classList.remove(this.neuCurrClass);
      this.dataset[datasetName] = this.neuCurrClass;
    } else {
      this.dataset[datasetName] = '';
    }

    if (nextClass) {
      this.classList.add(nextClass);
      this.neuCurrClass = nextClass;
    } else {
      this.neuCurrClass = '';
    }
  }

  /**
   * Setup neumorph classes
   */
  function _setupClasses(el) {
    let classList = el.className.split(' ');

    const neumorphClasses = classList.filter((className) => stateList.includes(className));
    if (neumorphClasses.length >= 2) {
      const newClasses = classList.filter((className) => !neumorphClasses.includes(className));
      newClasses.push(neumorphClasses[0]);
      el.className = newClasses.join(' ');
    }

    el.neuCurrClass = neumorphClasses[0] || '';
  }

  /**
   * Setup neu-click elements
   */
  function setup() {
    neuClickElements = document.querySelectorAll('[data-neu-click]');
    neuFocusElements = document.querySelectorAll('[data-neu-focus]');
    neuClickedElements = document.querySelectorAll('[data-neu-clicked]');
    neuHoverElements = document.querySelectorAll('[data-neu-hover]');

    neuClickedElements.forEach((el) => {
      _setupClasses(el);
      el.toggleRef = _toggle.bind(el, 'neuClicked');

      el.addEventListener('click', el.toggleRef);
    });

    neuClickElements.forEach((el) => {
      _setupClasses(el);
      el.toggleRef = _toggle.bind(el, 'neuClick');

      el.addEventListener('mousedown', el.toggleRef);
      el.addEventListener('mouseleave', el.toggleRef);
      el.addEventListener('mouseup', el.toggleRef);

      if ('ontouchstart' in document.documentElement) {
        el.addEventListener('touchstart', el.toggleRef);
        el.addEventListener('touchend', el.toggleRef);
      }
    });

    neuFocusElements.forEach((el) => {
      _setupClasses(el);
      el.toggleRef = _toggle.bind(el, 'neuFocus');

      el.addEventListener('focus', el.toggleRef);
      el.addEventListener('blur', el.toggleRef);
    });

    neuHoverElements.forEach((el) => {
      _setupClasses(el);
      el.toggleRef = _toggle.bind(el, 'neuHover');

      el.addEventListener('mouseenter', el.toggleRef);
      el.addEventListener('mouseleave', el.toggleRef);
    });
  }

  /**
   * Reset all listeners & setup
   */
  function reset() {
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
  }

  return {
    setup,
    reset,
  };
})();

document.addEventListener('DOMContentLoaded', NeuAxentix.setup);
