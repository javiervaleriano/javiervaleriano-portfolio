import projects from "./db/db.json" assert { type: "json" };
import filterProjects from "./functions/filterProjects.js";
import { establishQtyPages, nextPage, paginateProjects, prevPage, renderPositions } from "./functions/paginator.js";
import tagsToButtons from "./functions/tagsToButtons.js";
import templateProjects from "./functions/templateProjects.js";

// DOM
const d = document,
  $qtyProjects = d.querySelector(".projects__header__qty"),
  $tagsCntnr = d.querySelector(".projects__header__btns__cntnr"),
  tagsBtns = tagsToButtons(projects),
  $projectsCntnr = d.querySelector(".projects__cntnr"),
  $positionsPagerCntnr = d.querySelector(".footer__pager__positions__cntnr");

// VARIABLES CAMBIANTES (paginador y proyectos)
let loadViewportWidth = window.innerWidth,
  currPager = 1,
  maxPager = establishQtyPages(projects),
  availablePages = Array.from({ length: maxPager }, (_, i) => i + 1),
  visiblePagesDom = availablePages.slice(0, 5),
  filterProjectsValue = "",
  filteredProjects = projects,
  paidProjects = paginateProjects(filteredProjects, currPager);


$qtyProjects.textContent = projects.length;
$tagsCntnr.innerHTML = tagsBtns.join("");
$projectsCntnr.innerHTML = templateProjects(paidProjects).join("");

$positionsPagerCntnr.innerHTML = renderPositions(maxPager);


window.addEventListener("resize", ({ target }) => {
  let currViewportWidth = target.innerWidth;

  if (loadViewportWidth < 650 && currViewportWidth > 650) {
    loadViewportWidth = currViewportWidth;
    resetProjectsView();

  } else if (loadViewportWidth > 650 && currViewportWidth < 650) {
    loadViewportWidth = currViewportWidth;
    resetProjectsView();

  } else if (loadViewportWidth < 970 && currViewportWidth > 970) {
    loadViewportWidth = currViewportWidth;
    resetProjectsView();

  } else if (loadViewportWidth > 970 && currViewportWidth < 970) {
    loadViewportWidth = currViewportWidth;
    resetProjectsView();
  }
});

d.addEventListener("click", (e) => {
  const obj = e.target.classList.contains("fa-solid") ? e.target.parentElement : e.target;

  // Filtrado de proyectos por etiquetas
  if (obj.matches(".projects__header__btn")) {
    filterProjectsValue = obj.textContent;

    let classNameSelected = "projects__header__btn--selected",
      $projectsFilterBtns = d.querySelectorAll(".projects__header__btn");

    if (obj.classList.contains(classNameSelected)) {
      filterProjectsValue = "";
      obj.classList.remove(classNameSelected);

    } else {
      $projectsFilterBtns.forEach(btn => btn.classList.remove(classNameSelected));
      obj.classList.add(classNameSelected);
    }

    resetProjectsView();
  }


  // Paginador de proyectos
  if (obj.matches(".footer__pager__item")) {
    let followingPageDef, newVisiblePagesDef;

    // Control directo a la posición //
    if (obj.className.includes("position")) {
      const selectedPosition = +obj.textContent;

      let { followingPage, newVisiblePages } = selectedPosition < currPager ?
        prevPage(selectedPosition + 1, availablePages, visiblePagesDom) :
        nextPage(selectedPosition - 1, availablePages, visiblePagesDom);

      followingPageDef = followingPage;
      newVisiblePagesDef = newVisiblePages;
    }

    // Control de flechas //
    if (obj.className.includes("left")) {
      var { followingPage, newVisiblePages } = prevPage(currPager, availablePages, visiblePagesDom);

      followingPageDef = followingPage;
      newVisiblePagesDef = newVisiblePages;

    } else if (obj.className.includes("right")) {
      var { followingPage, newVisiblePages } = nextPage(currPager, availablePages, visiblePagesDom);

      followingPageDef = followingPage;
      newVisiblePagesDef = newVisiblePages;
    }

    currPager = followingPageDef;
    visiblePagesDom = newVisiblePagesDef;

    $positionsPagerCntnr.innerHTML = renderPositions(currPager, visiblePagesDom);

    let pagingMade = paginateProjects(filteredProjects, currPager);
    $projectsCntnr.innerHTML = templateProjects(pagingMade).join("");
  }
});


function resetProjectsView() {
  filteredProjects = filterProjects(projects, filterProjectsValue);
  currPager = 1;
  maxPager = establishQtyPages(filteredProjects);
  availablePages = Array.from({ length: maxPager }, (_, i) => i + 1);
  visiblePagesDom = availablePages.slice(0, 5);
  paidProjects = paginateProjects(filteredProjects, currPager);

  $qtyProjects.textContent = filteredProjects.length;
  $projectsCntnr.innerHTML = templateProjects(paidProjects).join("");

  $positionsPagerCntnr.innerHTML = renderPositions(maxPager);
}