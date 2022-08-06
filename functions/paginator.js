import { qtyItemsDisplayed } from "./qtyItemsDisplayed.js";

const maxPositionsToRender = 5;

export function establishQtyPages(data) {
  let qtyItems = qtyItemsDisplayed(window.innerWidth);

  return Math.ceil(data.length / qtyItems);
}

export function renderPositions(value = 1, visiblePages = null) {
  let positionBtns = undefined;

  // Generación de template inicial
  if (!visiblePages) {
    positionBtns = Array(value <= maxPositionsToRender ?
      value : maxPositionsToRender);
    positionBtns.fill(1);

    return positionBtns.map((_, i) => (
      `<li class="footer__pager__item footer__pager__position${i === 0 ? " footer__pager__position--selected" : ""}">${i + 1}</li>`
    )).join("");

    // Generación de template dinámico
  } else {
    positionBtns = [...visiblePages];
    return positionBtns.map(position => (
      `<li class="footer__pager__item footer__pager__position${value === position ? " footer__pager__position--selected" : ""}">${position}</li>`
    )).join("");
  }
}

export function prevPage(currPage, availablePages, visiblePages) {
  let followingPage = currPage - 1,
    newVisiblePages = [...visiblePages],
    firstAvPage = availablePages[0],
    firstVisPage = visiblePages[0];

  // Si la página que sigue no existe en las disponibles
  if (!availablePages.includes(followingPage)) {
    return { followingPage: currPage, newVisiblePages: visiblePages };
  }

  // Si la página que sigue es la primera que se ve en el DOM,
  // pero no la primera disponible
  if (firstAvPage !== followingPage && firstVisPage === followingPage) {
    let indexFollowing = availablePages.indexOf(followingPage),
      firstIndexSlice = (indexFollowing - 3) < 0 ? 0 : (indexFollowing - 3);

    newVisiblePages = availablePages.slice(firstIndexSlice, indexFollowing + 2);

    // Adición de valores en caso de que la longitud del array sea menor a 5
    let indexAux = availablePages.indexOf(newVisiblePages[newVisiblePages.length - 1]);

    newVisiblePages.length === (maxPositionsToRender - 1) ?
      newVisiblePages.push(availablePages[indexAux + 1]) :
      newVisiblePages.length === (maxPositionsToRender - 2) ?
        newVisiblePages.push(availablePages[indexAux + 1], availablePages[indexAux + 2]) : newVisiblePages;
  }

  return { followingPage, newVisiblePages };
}

export function nextPage(currPage, availablePages, visiblePages) {
  let followingPage = currPage + 1,
    newVisiblePages = [...visiblePages],
    lastAvPage = availablePages[availablePages.length - 1],
    lastVisPage = visiblePages[visiblePages.length - 1];

  // Si la página que sigue no existe en las disponibles
  if (!availablePages.includes(followingPage)) {
    return { followingPage: currPage, newVisiblePages: visiblePages };
  }

  // Si la página que sigue es la última que se ve en el DOM,
  // pero no la última disponible
  if (lastAvPage !== followingPage && lastVisPage === followingPage) {
    let indexFollowing = availablePages.indexOf(followingPage);

    newVisiblePages = availablePages.slice(indexFollowing - 1, indexFollowing + 4);

    // Adición de valores en caso de que la longitud del array sea menor a 5
    let indexAux = availablePages.indexOf(newVisiblePages[0]);

    newVisiblePages.length === (maxPositionsToRender - 1) ?
      newVisiblePages.unshift(availablePages[indexAux - 1]) :
      newVisiblePages.length === (maxPositionsToRender - 2) ?
        newVisiblePages.unshift(availablePages[indexAux - 2], availablePages[indexAux - 1]) : newVisiblePages;
  }

  return { followingPage, newVisiblePages };
}

export function paginateProjects(filteredData, currPage) {
  let qtyItems = qtyItemsDisplayed(window.innerWidth),
    minIndex = (currPage * qtyItems) - qtyItems,
    maxIndex = currPage * qtyItems;

  return filteredData.reduce((prev, curr, i) => {
    if (i >= minIndex && i < maxIndex) {
      prev.push(curr);
    }

    return prev;
  }, []);
}