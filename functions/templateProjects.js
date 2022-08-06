export default function templateProjects(data) {
  return data.map(({ imageURL, title, tags, description, demoURL, codeURL }) => {
    const templateTags = tags.map((tag) => `<span class="project__tag">#${tag}</span>`).join(" ");

    return `<article class="project">
    <figure class="project__img__cntnr">
      <img src=${imageURL} alt="Imagen del proyecto" class="project__img">
      <ficaption class="project__tags">
        ${templateTags}
      </ficaption>
    </figure>
    <h3 class="project__title">${title}</h3>
    <p class="project__desc">${description}</p>
    <div class="project__links__cntnr">
      <a href=${demoURL} target="_blank" class="project__link project__link__demo">Demo</a>
      <a href=${codeURL} target="_blank" class="project__link project__link__code">Código</a>
    </div>
  </article>`
  });
}