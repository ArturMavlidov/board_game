import { getBlogItems } from "./fake-data";
import buildBlogContent from "./buildContent";
import sortItems from "../sorting";
import { selectRole, selectId, addHtml, selectRoles, closestRole } from "../../helpers";

export default function blog(context) {
  let newFirstBtn = selectRole("new-first");
  let oldFirstBtn = selectRole("old-first");
  let popularityFirstBtn = selectRole("popularity-first");
  let blogItems = getBlogItems();
  let blogSvg;

  const buildBlog = () => {
    blogItems.forEach(item => {
      addHtml({ component: context, html: buildBlogContent(item) });
    })
  }

  const setBlogSvg = () => {
    blogSvg = selectRoles('blog-svg');
  }

  const rebuildContent = (array, sorting) => {
    context.innerHTML = "";
    sortItems(array, sorting);
    buildBlog();
    setBlogSvg();
    bindEvents();
  }

  const clickSvg = ( {target} ) => {
    if (closestRole(target, 'blog-like')) {
      const span = selectId(target.dataset.id + 1);
      target.classList.toggle("active");
      target.classList.contains("active") ? span.innerHTML = Number(span.innerHTML) + 1 : span.innerHTML = Number(span.innerHTML) - 1;
    }
    if (closestRole(target, 'blog-svg')) {
      target.classList.toggle("active");
    }
  }

  const clickOldFirstBtn = () => rebuildContent(blogItems, 'old');
  const clickNewFirstBtn = () => rebuildContent(blogItems, "new");
  const clickPopularityFirstBtn = () => rebuildContent(blogItems, 'like');

  const bindEvents = () => {
    context.addEventListener('click', clickSvg);
    oldFirstBtn.addEventListener('click', clickOldFirstBtn);
    newFirstBtn.addEventListener('click', clickNewFirstBtn);
    popularityFirstBtn.addEventListener("click", clickPopularityFirstBtn);
  }

  const unbindEvents = () => {
    context.removeEventListener("click", clickSvg);
    oldFirstBtn.removeEventListener("click", clickOldFirstBtn);
    newFirstBtn.removeEventListener("click", clickNewFirstBtn);
    popularityFirstBtn.removeEventListener("click", clickPopularityFirstBtn);
  }

  const init = () => {
    rebuildContent("new");
  }

  const destroy = () => {
    unbindEvents();
  }

  init();

  return {
    init,
    destroy
  }
}
