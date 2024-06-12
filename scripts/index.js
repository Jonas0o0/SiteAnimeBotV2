const form = document.getElementById("form");
const search = document.getElementById("search");

form.onsubmit = (event) =>{
  SearchAnimeByName(search.value);
  return false;
};

function SearchAnimeByName(name){
  let url = "https://api.jikan.moe/v4/anime?q="+name;
  const Arequest = new Request(url, {
    method: "GET"
  });
  fetch(Arequest)
  .then((response) => {
    if (response.status === 200) {
        return response.json();
    } else {
      throw new Error("Something went wrong on api server!");
    }
  })
  .then(function(data) {
    build(AnimeInfo(data['data'][0]));
  })
  .catch((error) => {
    console.error(error);
  });

};

function build(data){
  let image = document.getElementsByClassName("ImgSearch")[0];
  image.setAttribute("src", data.img);
  let genre = document.getElementsByClassName("GenreSearch")[0];
  genre.innerHTML = data.genres;
  let theme = document.getElementsByClassName("ThemeSearch")[0];
  theme.innerHTML = data.theme;
  let demographics = document.getElementsByClassName("DemographicsSearch")[0];
  demographics.innerHTML = data.demographics;
  let duration = document.getElementsByClassName("DurationsSearch")[0];
  duration.innerHTML = data.duration;

  let tittle = document.getElementsByClassName("TitleSearch")[0];
  tittle.innerHTML = data.title;

  let score = document.getElementsByClassName("ScoreSearch")[0];
  score.innerHTML = data.score;
  let rank = document.getElementsByClassName("RankSearch")[0];
  rank.innerHTML = data.rank;
  let popularity = document.getElementsByClassName("PopularitySearch")[0];
  popularity.innerHTML = data.popularity;
  let member = document.getElementsByClassName("MembersSearch")[0];
  member.innerHTML = data.membre;
  let date = document.getElementsByClassName("DateSearch")[0];
  date.innerHTML = data.date;
  let type = document.getElementsByClassName("TypeSearch")[0];
  type.innerHTML = data.type
  let status = document.getElementsByClassName("StatusSearch")[0];
  status.innerHTML = data.status;

  let synopsis = document.getElementsByClassName("SynopsisSearch")[0];
  synopsis.innerHTML = data.synopsis;

  let produceurs = document.getElementsByClassName("ProduceursSearch")[0];
  produceurs.innerHTML = data.producers;
  let studios = document.getElementsByClassName("StudiosSearch")[0];
  studios.innerHTML = data.studios
  let licensors = document.getElementsByClassName("LicensorsSearch")[0];
  licensors.innerHTML = data.licensors;
}

function AnimeInfo(data){
  let tittle = data['title']
  let url = data["url"]
  let img = data['images']['jpg']['large_image_url']
  let episode = data['episodes']
  let status = data['status']
  let diffuse = data['aired']['string']
  let synopsis = data['synopsis']
  let rank = data['rank']
  let score = data.score
  let score_by = data.score_by
  let popularity = data.popularity
  let membre = data.members
  let duration = data.duration
  let type = data.type
  let demographics = ""
  if (data["demographics"]){
    if (data["demographics"].length != 0){
      for (let o of data["demographics"]){
        demographics += o.name + ", "
    }
      demographics = demographics.substring(0, demographics.length -2)
    }else{
      demographics = "Unknow"
    }
  }else{
  theme = "Unknow"
  }
  let theme = ""
  if (data["themes"]){
    if (data["themes"].length != 0){
      for (let o of data["themes"]){
        theme += o.name + ", "
    }
      theme = theme.substring(0, theme.length -2)
    }else{
      theme = "Unknow"
    }
  }else{
  theme = "Unknow"
  }
  let producers = ""
  if (data["producers"]){
      if (data["producers"].length != 0){
        for (let o of data["producers"]){
          producers += o.name + ", "
    }
      producers = producers.substring(0, producers.length -2)
    }else{
      producers = "Unknow"
    }
  }else{
    producers = "Unknow"
  }
  let licensors = ""
  if (data["licensors"] ){
    if (data["licensors"].length != 0){
      for (let o of data["licensors"]){
        licensors += o.name + ", "
    }
      licensors = licensors.substring(0, licensors.length -2)
    }else{
      licensors = "Unknow"
    }
  }
  let studios = ""
  if (data["studios"]){
     if (data["studios"].length != 0){
      for (let o of data["studios"]){
        studios += o.name + ", "
    }
    studios = studios.substring(0, studios.length -2)
    }else{
      studios = "Unknow"
    }
  }else{
    studios = "Unknow"
  }
  let genres = data['genres']
  let str_genre = ""
  for (let o of genres){
    str_genre += o['name'] + ", "
  }
  let all_genre = str_genre.substring(0, str_genre.length -2)

  let new_synopsis = ""
  for (let ph of synopsis.split('\n')){
    new_synopsis += ph + "<br>"
  }

  let dico = {'img': img, 'url': url, "title": tittle, "episodes": episode,
         "status": status, "diffuse": diffuse,
         "synopsis": new_synopsis, "producers": producers, "licensors": licensors,
         "studios": studios, "genres": all_genre, "rank": rank, "score": score, "score_by": score_by,
         "popularity": popularity, "membre": membre, "duration": duration, "demographics": demographics, "theme":theme, "type": type, "date": data.aired.string }
  return dico
};

const request = new Request("https://api.jikan.moe/v4/top/anime?type=tv", {
  method: "GET"
});

function DataTreatment(data){
    let rang = 1
    let liste_anime_info = []
    for (let i of data){
        let dico = {};
        dico.rank = rang;
        dico.image = i.images.jpg.large_image_url;
        dico.name = i.title;
        dico.id = i.mal_id;
        rang += 1;
        liste_anime_info.push(dico);
    }
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
