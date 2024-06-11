const request = new Request("https://api.jikan.moe/v4/top/anime?type=tv", {
  method: "GET"
});

function DataTreatment(data){
    let rang = 1
    let liste_anime_info = []
    for (let i of data){
        console.log(i);
        let dico = {};
        dico.rank = rang;
        dico.image = i.images.jpg.large_image_url;
        dico.name = i.title;
        dico.id = i.mal_id;
        rang += 1;
        liste_anime_info.push(dico);
    }
    console.log(liste_anime_info);
    Paginations(liste_anime_info);
};

function Paginations(liste){
    const section = document.getElementsByClassName("anime-container")[0];
    for (let i of liste){
        /**let htmlContent = '<div class="anime"><img src='+i.image+'><span class="title">'+i.name+'</span><span class="rank">'+i.rank+'</span><span class="id">'+i.id+'</span></div>';
        section.insertAdjacentHTML('beforeend', htmlContent);**/

        let div = document.createElement("div");
        div.setAttribute("class", "anime");
        let image = document.createElement("img");
        image.setAttribute("src", i.image);
        let span1 = document.createElement("span");
        span1.setAttribute("class", "title");
        span1.textContent = i.name;
        let span2 = document.createElement("span");
        span2.setAttribute("class", "rank");
        let span4 = document.createElement("span");
        span4.setAttribute("class", "value");
        span4.textContent = i.rank;
        let span3 = document.createElement("span");
        span3.setAttribute("class", "id");
        span3.textContent = i.id;
        section.appendChild(div);
        div.appendChild(image);
        div.appendChild(span1);
        div.appendChild(span2);
        span2.appendChild(span4)
        div.appendChild(span3);
    };
}

fetch(request)
  .then((response) => {
    if (response.status === 200) {
        return response.json();
    } else {
      throw new Error("Something went wrong on api server!");
    }
  })
  .then(function(data) {
    DataTreatment(data['data']);
  })
  .catch((error) => {
    console.error(error);
  });