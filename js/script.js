'use strict';

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorsSelector = 'post-author';

function titleClickHandler(event) {
  const clickedElement = this;
  event.preventDefault();
  console.log('Link was clicked!');

  /* [DONE]remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }
  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);

  /* [Done]remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
  console.log('clickedElement:', clickedElement);
}

/*generate titlelist*/

function generateTitleLinks(customSelector = '') {
  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* [DONE]for each article */
  const articles = document.querySelectorAll(
    optArticleSelector + customSelector
  );
  console.log(
    'optArticleSelector: ' +
      optArticleSelector +
      ' customSelector: ' +
      customSelector
  );

  let html = '';

  for (let article of articles) {
    console.log(article);

    /*[DONE] get the article id */
    const articleId = article.getAttribute('id');
    console.log(articleId);

    /* [DONE] find the title element */
    /*[DONE] get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log(articleTitle);

    /* [DONE] create HTML of the link */
    const linkHTML =
      '<li><a href="#' +
      articleId +
      '"><span>' +
      articleTitle +
      '</span></a></li>';
    console.log(linkHTML);

    /*[DONE] insert link into titleList */
    html = html + linkHTML;
    console.log(html);
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  console.log(links);

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

/*generate tags*/
function generateTags() {
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /*START LOOP: for every article: */
  for (let article of articles) {
    console.log(article);
    /* [DONE] find tags wrapper */
    const wraperList = article.querySelector(optArticleTagsSelector);
    console.log(optArticleTagsSelector);
    /* [DONE] make html variable with empty string */
    let html = '';
    /* [DONE]get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);

    /*[DONE] split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);
    /* [DONE] START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      console.log(tag);
      /* [DONE] generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      console.log(linkHTML);
      /* [DONE]  add generated code to html variable */
      html = html + linkHTML;
      console.log(html);
      /* END LOOP: for each tag */
    }
    /* [DONE]insert HTML of all the links into the tags wrapper */
    wraperList.innerHTML = html;

    /* END LOOP: for every article: */
  }
}

generateTags();

/*click tag*/

function tagClickHandler(event) {
  /*[DONE] prevent default action for this event */
  event.preventDefault();
  console.log('Link was clicked!');
  /*[DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('clickedElement:', clickedElement);
  /* [Done] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);

  /* [Done] make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log(tag);
  /* [DONE] find all tag links with class active */
  const activeTagsLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log(activeTagsLinks);
  /* [done]START LOOP: for each active tag link */
  for (let activeTagLink of activeTagsLinks) {
    /* remove class active */
    activeTagLink.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /* [Done] find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log(tagLinks);
  /* [Done]START LOOP: for each found tag link */
  for (let tagLink of tagLinks) {
    console.log(tagLink);
    /*[Done]add class active */
    tagLink.classList.add('active');
    console.log(tagLink);
    /*[Done] END LOOP: for each found tag link */
  }
  /* [Done]execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */
  const allTagsLinks = document.querySelectorAll('a[href*="#tag-"]');
  console.log(allTagsLinks);
  /* START LOOP: for each link */
  for (let allTagLink of allTagsLinks) {
    console.log(allTagLink);
    /* add tagClickHandler as event listener for that link */
    allTagLink.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }
}

addClickListenersToTags();

/*generate author*/

function generateAuthors() {
  /* find all articles */
  /* START LOOP: for every article: */
  /* find authors wrapper */
  /* make html variable with empty string */
  /* get autor from data-autor attribute */
  /* ?split tags into array */
  /*? START LOOP: for each tag */
  /* generate HTML of the link */
  /* add generated code to html variable */
  /* ?END LOOP: for each tag */
  /* insert HTML of all the links into the autors wrapper */
  /* END LOOP: for every article: */
}

generateAuthors();

function authorClickHandler(event) {
  /* prevent default action for this event */
  /* make new constant named "clickedElement" and give it the value of "this" */
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  /* make a new constant "author" and extract autor from the "href" constant */
  /* find all authors links with class active */
  /* START LOOP: for each active author link */
  /* remove class active */
  /* END LOOP: for each active author link */
  /* find all author links with "href" attribute equal to the "href" constant */
  /* START LOOP: for each found author link */
  /* add class active */
  /* END LOOP: for each found author link */
  /* execute function "generateTitleLinks" with article selector as argument */
}

function addClickListenersToAutors() {
  /* find all links to authors */
  /* START LOOP: for each link */
  /* add tagClickHandler as event listener for that link */
  /* END LOOP: for each link */
}

addClickListenersToAutors();
