// 
$(document).ready(function(){
    $("#appLoader").show().css({"display":"flex"});

    if (getSearch !=null) {
        setTimeout(() => {
            getSearchedList();

            $("#appLoader").hide()
        }, 1000);
    }
    
})

// 
$("#nav_search_form").on('submit', (e)=>{
    e.preventDefault();

    if ($("#nav_search_input").val() == "") {
        return
    }

    location = "./?page=search&desc="+$("#nav_search_input").val();
})

function searchPage() {
    let searchMovies = "";
    let searchNews = "";
    let searchEvents = "";

    for (let i = 0; i < fanMovies.length; i++) {
        let movieCover = "./cover/"+fanMovies[i].cover;

        if (fanMovies[i].cover == "") {
            movieCover = "./icons/pic1.jpeg";
        }

        searchMovies += `
            <li>
                <a href="${fanMovies[i].link}">
                    <h3>${fanMovies[i].title}</h3>
                    <img src="${movieCover}">
                </a>
            </li>
        `;   
    }

    for (let i = 0; i < fanNews.length; i++) {
        searchNews += `
            <li>
                <a href="#">
                    <h3>${fanNews[i].title}</h3>
                    <p>${fanNews[i].details}</p>
                </a>
            </li>
        `;
    }

    for (let i = 0; i < fanEvents.length; i++) {
        searchNews += `
            <li>
                <a href="#">
                    <h3>${fanEvents[i].title}</h3>
                    <p>${fanEvents[i].details}</p>
                </a>
            </li>
        `; 
    }
    
    let search = `
        <section id="search_results">
            <h1>Search Result(s)</h1>
            <ul id="search_content_list">
                ${searchMovies}
                ${searchNews}
                ${searchEvents}
            </ul>
        </section>
    `;

    $("#main_bar").html(search)  
}

function getSearchedList() {
    let mySearch = getSearch.toLowerCase();
    
    $("#search_content_list li").filter(function(){
      $(this).toggle($(this).text().toLowerCase().indexOf(mySearch) > -1)
    }) 

    $("#search_results").show().CSS({"display":"flex"})
}
