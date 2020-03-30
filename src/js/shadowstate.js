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
  let classList = [...el.classList];

  if (el.classList.contains('neu-' + el.dataset.off)) {
    let index = classList.indexOf('neu-' + el.dataset.off);
    classList.splice(index, 1, 'neu-' + el.dataset.on);
    console.log('11111');
  } else if (el.classList.contains('neu-' + el.dataset.on)) {
    let index = classList.indexOf('neu-' + el.dataset.on);
    classList.splice(index, 1, 'neu-' + el.dataset.off);
    console.log('22222');
  }
  console.log(classList);
  el.className = '';
  classList.forEach(className => {
    el.classList.add(className);
  });
}

// IL MANQUE LA VERIF, SI LE MEC MET 2 CLASS NEUMORPH, IL FAUT LUI EN SUPPRIMER UNE POUR QUE UNE SEULE SE METTE,
// sinon ca va faire que quand on get la class dans le toggleType, ca change pas la bonne
