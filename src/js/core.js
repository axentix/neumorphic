const NeuAxentix = (() => {
  const neuClickElements = document.querySelectorAll('[data-neu-click]');
  const neuFocusElements = document.querySelectorAll('[data-neu-focus]');
  const neuClickedElements = document.querySelectorAll('[data-neu-clicked]');
  const stateList = ['neu-bordered', 'neu-flat', 'neu-pressed', 'neu-concave', 'neu-convex'];

  /**
   * Toggle neu-clicked state
   */
  function _toggle(datasetName) {
    if (this.dataset[datasetName] && !stateList.includes(this.dataset[datasetName])) {
      console.error('Error: invalid classname in data-neu-...');
      return;
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

    const neumorphClasses = classList.filter(className => stateList.includes(className));
    if (neumorphClasses.length >= 2) {
      const newClasses = classList.filter(className => !neumorphClasses.includes(className));
      newClasses.push(neumorphClasses[0]);
      el.className = newClasses.join(' ');
    }

    el.neuCurrClass = neumorphClasses[0] || '';
  }

  /**
   * Setup neu-click elements
   */
  function setup() {
    neuClickedElements.forEach(el => {
      _setupClasses(el);
      el.toggleRef = _toggle.bind(el, 'neuClicked');

      el.addEventListener('click', el.toggleRef);
    });

    neuClickElements.forEach(el => {
      _setupClasses(el);
      el.toggleRef = _toggle.bind(el, 'neuClick');

      el.addEventListener('mousedown', el.toggleRef);
      el.addEventListener('mouseup', el.toggleRef);
    });

    neuFocusElements.forEach(el => {
      _setupClasses(el);
      el.toggleRef = _toggle.bind(el, 'neuFocus');

      el.addEventListener('focus', el.toggleRef);
      el.addEventListener('blur', el.toggleRef);
    });
  }

  return {
    setup
  };
})();

NeuAxentix.setup();
