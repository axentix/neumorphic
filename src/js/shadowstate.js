let withStateElements = document.querySelectorAll('[data-neu-clicked]');

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

    el.toggleRef = toggleType.bind(el);

    el.addEventListener('click', el.toggleRef);
  });
}

function toggleType() {
  console.log(this);
  let classList = [...this.classList];

  if (this.classList.contains(this.dataset.neuClicked)) {
    let index = classList.indexOf(this.dataset.off);
    classList.splice(index, 1, this.dataset.neuClicked);
    console.log('11111');
  }

  console.log(classList);
  // this.className = '';
  // classList.forEach(className => {
  //   this.classList.add(className);
  // });
}
