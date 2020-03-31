let withStateElements = document.querySelectorAll('[data-neu-clicked]');

setupClasses(withStateElements);
setupListeners(withStateElements);

function setupClasses(withStateElements) {
  withStateElements.forEach(el => {
    let classList = el.className.split(' ');

    const stateList = ['neu-bordered', 'neu-flat', 'neu-pressed', 'neu-concave', 'neu-convex'];

    const neumorphClasses = classList.filter(className => stateList.includes(className));
    if (neumorphClasses.length >= 2) {
      const newClasses = classList.filter(className => !neumorphClasses.includes(className));
      newClasses.push(neumorphClasses[0]);
      el.className = newClasses.join(' ');
    }
  });
}

/**
 *
 * @param {NodeList} withStateElements
 */
function setupListeners(withStateElements) {
  withStateElements.forEach(el => {
    el.addEventListener('click', () => {
      toggleType(el);
    });
  });
}

/**
 *
 * @param {Element} el
 */
function toggleType(el) {
  console.log(el);
  let classList = [...el.classList];

  if (el.classList.contains(el.dataset.neuClicked)) {
    let index = classList.indexOf(el.dataset.off);
    classList.splice(index, 1, el.dataset.neuClicked);
    console.log('11111');
  } else if (el.classList.contains('neu-' + el.dataset.on)) {
  }
  console.log(classList);
  el.className = '';
  classList.forEach(className => {
    el.classList.add(className);
  });
}
