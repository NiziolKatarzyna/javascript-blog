'use strict';
const templates = {
  articleLink: Handlebars.compile(
    document.querySelector('#template-article-link').innerHTML
  ),
  articleTagsLink: Handlebars.compile(
    document.querySelector('#template-article-tags-link').innerHTML
  ),
  articleAuthorsLink: Handlebars.compile(
    document.querySelector('#template-article-authors-link').innerHTML
  ),
};

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorsSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
  optAuthorListSelector = '.authors.list';

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
    /*const linkHTML =
      '<li><a href="#' +
      articleId +
      '"><span>' +
      articleTitle +
      '</span></a></li>';
    console.log(linkHTML);*/
    const linkHTMLData = { id: articleId, title: articleTitle };
    const linkHTML = templates.articleLink(linkHTMLData);

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

/*calculate*/
function calculateTagsParams(tags) {
  const params = { max: 0, min: 999999 };
  for (let tag in tags) {
    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
    console.log(tag + ' is used ' + tags[tag] + ' times');
  }

  return params;
}

/* class to tags*/
function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  return optCloudClassPrefix + classNumber;
}

/*generate tags*/
function generateTags() {
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /*START LOOP: for every article: */
  for (let article of articles) {
    console.log(article);
    /* [DONE] find tags wrapper */
    const wraperList = article.querySelector(optArticleTagsSelector);
    console.log(optArticleTagsSelector);
    /* [DONE] make html variable with empty string */
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams: ', tagsParams);
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
      /*const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      console.log(linkHTML);*/
      const linkHTMLData = { id: articleTags, title: tag };
      const linkHTML = templates.articleTagsLink(linkHTMLData);
      /* [DONE]  add generated code to html variable */
      html = html + linkHTML;
      console.log(html);
      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags.hasOwnProperty(tag)) {
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* END LOOP: for each tag */
    }
    /* [DONE]insert HTML of all the links into the tags wrapper */
    wraperList.innerHTML = html;

    /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);
  /* [New] create variable for all links HTML code*/
  let allTagsHTML = '';
  /*[NEW]  START LOOP: for each tag in allTags*/
  const tagsParams = calculateTagsParams(allTags);
  for (let tag in allTags) {
    /*[NEW] generate code of link and add it to allTagsHTML*/
    allTagsHTML +=
      '<li>  <a class=" ' +
      calculateTagClass(allTags[tag], tagsParams) +
      ' " href="#tag-' +
      tag +
      '"> ' +
      tag +
      ' </a> </li>';
    /* [NEW] END LOOP: for each tag in allTags: */
  }
  /* [NEW] add html from allTags to tagList */
  tagList.innerHTML = allTagsHTML;
  console.log(allTags);
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
  /* [NEW] create a new variable allAuthors with an empty object */
  let allAuthors = {};

  /* [done]find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);
  /* [done] START LOOP: for every article: */
  for (let article of articles) {
    console.log(article);
    /* [done] find authors wrapper */
    const wrapperList = article.querySelector(optArticleAuthorsSelector);
    console.log(optArticleAuthorsSelector);

    /* [done] get author from data-author attribute */
    const author = article.getAttribute('data-author');
    console.log(author);

    /*[done] generate HTML of the link */
    /*const linkHTML =
      '<a href="#author-' + author + '">' + 'by ' + author + '</a>';
    console.log(linkHTML);*/
    const linkHTMLData = { id: author, title: author };
    const linkHTML = templates.articleAuthorsLink(linkHTMLData);

    /* [NEW] check if this link is NOT already in allAuthors */
    if (!allAuthors.hasOwnProperty(author)) {
      /* [NEW] add generated code to allAuthors object */
      allAuthors[author] = 1;
    } else {
      allAuthors[author]++;
    }
    /* [done] insert HTML of all the links into the authors wrapper */
    wrapperList.innerHTML = linkHTML;
    /* END LOOP: for every article: */
  }
  /*[NEW] find list of authors in right column */
  const authorList = document.querySelector(optAuthorListSelector);

  /* [New] create variable for all links HTML code*/
  let allAuthorsHTML = '';
  /*[NEW]  START LOOP: for each author in allAuthors*/
  for (let author in allAuthors) {
    /*[NEW] generate code of link and add it to allAuthorsHTML*/
    allAuthorsHTML +=
      '<li>  <a href="#author-' +
      author +
      '"> ' +
      author +
      ' (' +
      allAuthors[author] +
      ') </a> </li>';
  }
  /*[NEW] add html from allAuthors to authorList */
  authorList.innerHTML = allAuthorsHTML;
  console.log(allAuthors);
}
generateAuthors();

function authorClickHandler(event) {
  /*[DONE] prevent default action for this event */
  event.preventDefault();
  console.log('Link was clicked!');
  /*[DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('clickedElement:', clickedElement);
  /* [Done] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);
  /* [Done] make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#author-', '');
  console.log(author);
  /*[Done] find all authors links with class active */
  const activeAuthorsLinks = document.querySelectorAll(
    'a.active[href^="#author-"]'
  );
  console.log(activeAuthorsLinks);
  /* [Done] START LOOP: for each active author link */
  for (const activeAuthorLink of activeAuthorsLinks) {
    console.log(activeAuthorLink);
    /* [Done] remove class active */
    activeAuthorLink.classList.remove('active');
    /* [Done] END LOOP: for each active author link */
  }
  /* [Done] find all author links with "href" attribute equal to the "href" constant */
  const authorsLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log(authorsLinks);
  /* [Done] START LOOP: for each found author link */
  for (let authorsLink of authorsLinks) {
    console.log(authorsLink);
    /*[Done] add class active */
    authorsLink.classList.add('active');
    /*[Done] END LOOP: for each found author link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {
  /* find all links to authors */
  //const allLinksAuthors = document.querySelectorAll('a[href*="#author-"]');
  const allLinksAuthors = document.querySelectorAll('a[href*="#author-"]');
  console.log(allLinksAuthors);
  /* START LOOP: for each link */
  for (let allLinkAuthor of allLinksAuthors) {
    console.log(allLinkAuthor);
    /* add authorClickHandler as event listener for that link */
    allLinkAuthor.addEventListener('click', authorClickHandler);
    /* END LOOP: for each link */
  }
}

addClickListenersToAuthors();
