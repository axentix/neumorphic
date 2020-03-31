let withStateElements = document.querySelectorAll('[data-neu-click]');

setup(withStateElements);

/**
 *
 * @param {NodeListOf<Element>} withStateElements
 */
function setup(withStateElements) {
  withStateElements.forEach(el => {
    let classList = el.className.split(' ');

    const stateList = ['neu-bordered', 'neu-flat', 'neu-pressed', 'neu-concave', 'neu-convex'];

    const neumorphClasses = classList.filter(className => stateList.includes(className));
    if (neumorphClasses.length >= 2) {
      const newClasses = classList.filter(className => !neumorphClasses.includes(className));
      newClasses.push(neumorphClasses[0]);
      el.className = newClasses.join(' ');
    }

    el.neuClickCurrClass = neumorphClasses[0] || '';
    el.toggleRef = toggleType.bind(el);

    el.addEventListener('click', el.toggleRef);
  });
}

function toggleType() {
  const stateList = ['neu-bordered', 'neu-flat', 'neu-pressed', 'neu-concave', 'neu-convex'];
  if (this.dataset.neuClick && !stateList.includes(this.dataset.neuClick)) {
    console.error('Error: invalid classname in data-neu-click.');
    return;
  }

  const nextClass = this.dataset.neuClick;
  if (this.neuClickCurrClass) {
    this.classList.remove(this.neuClickCurrClass);

    this.dataset.neuClick = this.neuClickCurrClass;

    if (nextClass) {
      this.classList.add(nextClass);
      this.neuClickCurrClass = nextClass;
    } else {
      this.neuClickCurrClass = '';
    }
  } else {
    this.classList.add(nextClass);
    this.dataset.neuClick = '';
    this.neuClickCurrClass = nextClass;
  }
}
