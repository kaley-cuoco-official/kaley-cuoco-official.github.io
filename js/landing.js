// https://www.w3schools.com/js/js_date_methods.asp
// https://www.w3schools.com/js/js_date_methods_set.asp

// 
let fanMovies;
  $.ajax({
    url: "./json/movies.json",
    async: false, 
    dataType: 'json',
    success: function (json) {
        fanMovies = json;
    }
  });

//   
  let fanNews;
  $.ajax({
    url: "./json/news.json",
    async: false, 
    dataType: 'json',
    success: function (json) {
        fanNews = json;
    }
  });

// 
let fanEvents;
  $.ajax({
    url: "./json/events.json",
    async: false, 
    dataType: 'json',
    success: function (json) {
        fanEvents = json;
    }
  });

// let tempDate = new Date("2021-03-25");
// tempDate.getFullYear();

const permDate = new Date();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function landAppPage() {
    // const landingCount = Math.floor(Math.random() * 6);
    let landingEvents = "";
    let landingMovies = "";
    let landingNews = "";

    let sliceNum = 60;
    let moreBtn = `<button onclick="toggleFlexMore(this)">... more</button>`;
    let lessBtn = `<button onclick="toggleFlexMore(this)">... less</button>`;

    for (let i = 0; i < fanEvents.length; i++) {
        landingEvents += `
        <section>
            <h2>${fanEvents[i].title}</h2>
            <div class="flex_more_show">${fanEvents[i].details.slice(0, sliceNum)}${moreBtn}</div>
            <div style="display:none" class="flex_more_hide">${fanEvents[i].details}${lessBtn}</div>
            <i>${fanEvents[i].date}</i>
        </section>        
        `    
    }

    for (let i = 0; i < fanNews.length; i++) {
        landingNews += `
            <section>
                <h2>${fanNews[i].title}</h2>
                <div class="flex_more_show">${fanNews[i].details.slice(0, sliceNum)}${moreBtn}</div>
                <div style="display:none" class="flex_more_hide">${fanNews[i].details}${lessBtn}</div>
                <i>${fanNews[i].date}</i>
            </section>
        ` 
    }

// 
    for (let i = 0; i < 11; i++) {
        if (fanMovies[i].cover !="" && fanMovies[i].category == "film") {
            landingMovies += `
            <section>
                <a href="${fanMovies[i].link}">
                    <h2>${fanMovies[i].title}</h2>
                    <aside>
                        <img src="./cover/${fanMovies[i].cover}" alt="photos">
                        <div>
                            <p><b>Role: </b> <span>${fanMovies[i].role}<span></p>
                            <i><span>${fanMovies[i].note}</span> <span><strong>Year: </strong>${fanMovies[i].year}</span></i>
                        </div> 
                    </aside>
                </a>   
            </section>
            `

            
        } 
    }

    let landingPage = `
            <div id="app_landing">
            <h4>${permDate}</h4>
                <ul>
                    <li>
                        <h3>Top Movies</h3>
                        <div class="landing_grid_view">
                            ${landingMovies}
                        </div>
                    </li>

                    <li>
                        <h3>News</h3>
                        <div class="landing_flex_view">
                            ${landingNews}
                        </div>
                    </li>

                    <li>
                        <h3>Events</h3>
                        <div class="landing_flex_view">
                            ${landingEvents}
                        </div>
                    </li>
                </ul>
            </div> 
        `;

            $("#main_bar").html(landingPage)
}

// 
function toggleFlexMore(x) {
    let page = x.parentElement.parentElement.parentElement
    let more = page.getElementsByClassName("flex_more_show")[0]
    let less = page.getElementsByClassName("flex_more_hide")[0]

    $(more).toggle()
    $(less).toggle()
}
