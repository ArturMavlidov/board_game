export default function buildBlogContent(item) {
    return `
       <div class="blog-content">
            <div class="container--blog">
              <div class="blog-date">
                <img src="assets/img/icons/date.svg" alt="date icon">
                ${item.date}
              </div>
              <div class="blog-title">
                ${item.title}
              </div>
              <div class="blog-img">
                <img src=" ${item.image.src}" alt=" ${item.image.alt}">
              </div>
              <div class="blog-text">
                 ${item.text}
              </div>
              <div class="blog-footer">
                <div class="blog-link"><a href="${item.link}">Читать далее</a></div>
                <div class="blog-btns">
                    <svg width="30" height="30">
                     <use xlink:href="#like" data-role="blog-like" data-id=${item.id}></use>
                    </svg>
                  <span data-id=${item.id + 1}>${item.like}</span>
                  <svg width="30" height="30" data-role="blog-svg">
                    <use xlink:href="#favourites"></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>
    `;
  };