const vidList = document.querySelector(".vidList");
const key = "AIzaSyB-6xV4QXok9PwwPhxxeP3c4JzN_KmmKKY";
const playlistId = "PLfYNuKPjo-c-_IvgCMUV4AhGDTrFFI8Qu";
const num = 5;
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}&maxResults=${num}`;

fetch(url)
  .then((data) => {
    return data.json();
  })
  .then((json) => {
    let items = json.items;
    console.log(items);
    let result = '';

    items.map((el) => {

      let title = el.snippet.title;
      //조건문으로 만약 타이틀의 길이가 30글자보다 크면
      //타이틀 = 타이틀.문자열자르는매서드 +"...";
      if (title.length > 30) {
        title = title.substr(0, 20) + "...";
      }
      //문자열.substr(start, length) : 특정 문자인덱스에서 부터 특정 갯수만큼 문자열을 자름
      let con = el.snippet.description;
      if (con.length > 100) {
        con = con.substr(0, 40) + "...";
      }
      let date = el.snippet.publishedAt;
      //문자열을 T를 기준으로 분리해서 배열로 반환한뒤
      //배열의 0인텍스만 취해서 date에 대입한다
      date = date.split("T")[0];

      result += `
        <article>
          <a href="${el.snippet.resourceId.videoId}" class="pic">
            <img src="${el.snippet.thumbnails.medium.url}">
          </a>
          <div class="con">
            <h2>${title}</h2>
            <p>${con}</p>
            <span>${date}</span>
          </div>
        </article>
      `;
    })

    vidList.innerHTML = result;
  });

vidList.addEventListener("click", (e) => {
  e.preventDefault();

  const vidId = e.target.closest("a").getAttribute("href");

  let pop = document.createElement("figure");
  pop.classList.add("pop");
  pop.innerHTML = `
      <iframe src="https://www.youtube.com/embed/${vidId}" frameborder="0" width="100%" height="100%" allowfullscreen></iframe>
      <span class="btnClose">close</span>
    `;
  vidList.append(pop);
})

//이벤트위임을 해서 vidList에 클릭이벤트를 걸어준다

//이안에서 pop을 찾아서
//조건문으로 pop을 찾았다면 pop안의 span를 찾아서
//클릭한 대상이 close라면 pop이라는 클래스를 remove함