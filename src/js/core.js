const NeuAxentix = (() => {
  const withStateElements = document.querySelectorAll('[data-neu-click]');
  const stateList = ['neu-bordered', 'neu-flat', 'neu-pressed', 'neu-concave', 'neu-convex'];

  /**
   * Toggle neu-click state
   */
  function _toggle() {
    if (this.dataset.neuClick && !stateList.includes(this.dataset.neuClick)) {
      console.error('Error: invalid classname in data-neu-click.');
      return;
    }

    const nextClass = this.dataset.neuClick;
    if (this.neuClickCurrClass) {
      this.classList.remove(this.neuClickCurrClass);
      this.dataset.neuClick = this.neuClickCurrClass;
    } else {
      this.dataset.neuClick = '';
    }

    if (nextClass) {
      this.classList.add(nextClass);
      this.neuClickCurrClass = nextClass;
    } else {
      this.neuClickCurrClass = '';
    }
  }

  /**
   * Setup neu-click elements
   */
  function setup() {
    withStateElements.forEach(el => {
      let classList = el.className.split(' ');

      const neumorphClasses = classList.filter(className => stateList.includes(className));
      if (neumorphClasses.length >= 2) {
        const newClasses = classList.filter(className => !neumorphClasses.includes(className));
        newClasses.push(neumorphClasses[0]);
        el.className = newClasses.join(' ');
      }

      el.neuClickCurrClass = neumorphClasses[0] || '';
      el.toggleRef = _toggle.bind(el);

      el.addEventListener('click', el.toggleRef);
    });
  }

  return {
    setup
  };
})();

NeuAxentix.setup();
