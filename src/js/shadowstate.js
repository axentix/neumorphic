let withStateElements = document.querySelectorAll('[data-on][data-off]');
// console.log(withStateElements);

setupClasses(withStateElements);
setupListeners(withStateElements);

// withStateElements.forEach(el => {
//   if (stateList.some(value => el.classList.contains('neu-' + value))) {
//     //find index

//     let classIndex = el.classList.indexOf(el.classList.contains('neu-' + state));
//     console.log(classIndex);
//     // el.classList.splice(classIndex, 0, el.dataset.off);
//   }
//   //   stateList.some(value => el.classList.contains('neu-' + value)) ? el.classList.splice(1,0,) : '';
// });

function setupClasses(withStateElements) {
  // foreach element
  withStateElements.forEach(el => {
    // console.log(el.classList);
    // console.log([...el.classList]);
    let hasClass = false;
    let classList = [...el.classList];

    const stateList = ['neu-bordered', 'neu-flat', 'neu-pressed', 'neu-concave', 'neu-convex'];
    // foreach class he got
    el.classList.forEach(className => {
      let index;

      //check if he has a neumorph class
      if (stateList.includes(className)) {
        index = classList.indexOf(className);
        hasClass = true;
      }

      index != null ? classList.splice(index, 1, 'neu-' + el.dataset.off) : '';
      // console.log('THE INDEX IS : ' + index);
      index = null;
    });

    // add the class if no neumorph class has been found
    hasClass ? '' : classList.push('neu-' + el.dataset.off);
    // console.log('CLASSLIST AFTER  :  ' + [...classList]);

    // set the new class list of the element
    el.className = '';
    classList.forEach(className => {
      el.classList.add(className);
    });
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
  if (el.classList.contains(el.dataset.off)) {
    let index = findIndex(el, el.dataset.off);
  } else if (el.classList.contains(el.dataset.on)) {
  }
}
