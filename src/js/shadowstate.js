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

    el.toggleRef = toggleType.bind(el);

    el.addEventListener('click', el.toggleRef);
  });
}

function toggleType() {
  console.log(this);
  const stateList = ['neu-bordered', 'neu-flat', 'neu-pressed', 'neu-concave', 'neu-convex'];
  let classList = [...this.classList];

  // if he doesn't contain the "dataset" class in his classList, but contains another neumorph class
  // 2dn = undefined so falsy if "find()" doesn't find corresponding value
  if (
    !this.classList.contains(this.dataset.neuClick) &&
    this.classList.contains(stateList.find(any => classList.some(className => any == className)))
  ) {
    let newClassName = classList.filter(className => stateList.includes(className)); // future dataset class

    let index = classList.indexOf(newClassName);
    classList.splice(index, 1, this.dataset.neuClick);
    this.className = classList.join(' ');
    this.dataset.neuClick = newClassName;
    // else if there is no neumorph class on the element
  } else if (!this.classList.contains(stateList.find(any => classList.some(className => any == className)))) {
    let newClassName = 'no-basic-value'; // future dataset class

    classList.push(this.dataset.neuClick);
    this.className = classList.join(' ');
    this.dataset.neuClick = newClassName;
  }

  // console.log(classList);
}
