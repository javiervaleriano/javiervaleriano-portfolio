export default function tagsToButtons(data) {
  let allTags = [];

  data.forEach(({ tags }) => {
    allTags = [...allTags, ...tags];
  });

  allTags = allTags.sort((tagA, tagB) => tagA < tagB ? -1 : 1)
    .reduce((prev, curr) => {
      if (!prev.includes(curr)) prev.push(curr);

      return prev;
    }, []);

  return allTags.map((tagBtn) => (
    `<button type="button" class="projects__header__btn">${tagBtn}</button>`
  ));
}