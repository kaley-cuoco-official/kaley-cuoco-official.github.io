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

//   
  let fanGallery;
  $.ajax({
    url: "./json/fans.json",
    async: false, 
    dataType: 'json',
    success: function (json) {
        fanGallery = json;
    }
  });

// let tempDate = new Date("2021-03-25");
// tempDate.getFullYear();

const permDate = new Date();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let sliceNum = 60;
let moreBtn = `<button onclick="toggleFlexMore(this)">... more</button>`;
let lessBtn = `<button onclick="toggleFlexMore(this)">... less</button>`;

function landAppPage() {
    const landingCount = Math.floor(Math.random() * 4);

    let landingEvents = "";
    let landingMovies = "";
    let landingNews = "";
    let landingAwards = "";
    let landingUser = "";
    let landingGallery = "";

    landingUser = `
        <h1>Fans Comments</h1>
        <p>
            <b><strong>From: </strong> ${fanGallery.users[landingCount].id}</b>
            <span><strong>Comments: </strong> ${fanGallery.users[landingCount].msg}</span>
            <i><strong>Date: </strong> ${fanGallery.users[landingCount].time}</i>
        </p>
    
    `;

// reduce to max of 10
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

// reduce to max of 10
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
                            <br>
                            <i><span>${fanMovies[i].note}</span> <span><strong>Year: </strong>${fanMovies[i].year}</span></i>
                        </div> 
                    </aside>
                </a>   
            </section>
            `
        } 
    }

    for (let i = 0; i < fanMovies.length; i++) {
        if (fanMovies[i].cover !="" && fanMovies[i].category == "award") {
            landingAwards += `
            <section>
                
                <a href="${fanMovies[i].link}">
                    <h2>${fanMovies[i].title}</h2>
                    <aside>
                    <img src="./cover/${fanMovies[i].cover}" alt="photos">
                        <div>
                            <p><b>Host: </b> <span>${fanMovies[i].role}<span></p>
                            <br>
                            <i><strong>Year: </strong>${fanMovies[i].year}</span></i>
                        </div> 
                    </aside>
                </a>   
            </section>
            `
        } 
    }

    // 

    console.log(fanGallery)

    for (let i = 0; i < fanGallery.slides.length; i++) {

        landingGallery += `
            <li data-thumb="./gallery/${fanGallery.slides[i].photo}">
                <img src="./gallery/${fanGallery.slides[i].photo}" />
            </li>
        `
    }

    let landingPage = `
            <div id="app_landing">
            <h4>${permDate}</h4>

                <ul>

                    <li>
                        <h3>Gallery</h3>
                        <section id="gallery_slide">
                            <div class="demo">
                                <div class="item">
                                    <div class="clearfix">
                                        <ul id="image-gallery" class="gallery list-unstyled cS-hidden">
                                           ${landingGallery}
                                        </ul>
                                    </div>
                                </div>   
                            </div>

                            <div id="gallery_users">${landingUser}</div>
                        </section>
                    <li>

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

                    <li>
                        <h3>Awards</h3>
                        <div class="landing_grid_view">
                            ${landingAwards}
                        </div>
                    </li>
                </ul>
            </div> 
        `;

            $("#main_bar").html(landingPage);
}

// event page
function getEventsPage() {
    let eventPage = "";

    for (let i = 0; i < fanEvents.length; i++) {
        eventPage += `
        <section>
            <h2>${fanEvents[i].title}</h2>
            <div class="flex_more_show">${fanEvents[i].details.slice(0, sliceNum)}${moreBtn}</div>
            <div style="display:none" class="flex_more_hide">${fanEvents[i].details}${lessBtn}</div>
            <i>${fanEvents[i].date}</i>
        </section>        
        `    
    }
    
    $("#main_bar").html(`
        <section id="app_landing">
            <div class="subPageNavs">
            <h1>Events</h1>
            <span>
            <button>Charity</button>
            <button>Competitions</button>
            </span>
        </div>

            <div class="landing_flex_view">
                ${eventPage}
            </div>
        </section>        
     `)
}

// movies page
function getMoviesPage() {
    let moviesPage = "";

    for (let i = 0; i < fanMovies.length; i++) {
        if (fanMovies[i].cover !="" && fanMovies[i].category != "award") {
            moviesPage += `
            <section> 
                <a href="${fanMovies[i].link}">
                    <h2>${fanMovies[i].title}</h2>
                    <aside>
                        <img src="./cover/${fanMovies[i].cover}" alt="photos">
                        <div>
                            <p><b>Role: </b> <span>${fanMovies[i].role}<span></p>
                            <i>
                            <span>${fanMovies[i].note}</span>
                           
                            <span><strong>Year: </strong>${fanMovies[i].year}</span>
                            </i>
                        </div> 
                    </aside>

                     <p class="flaot_bottom" style=""><strong>Category: </strong> ${fanMovies[i].category.toUpperCase()}</p>
                </a>   
            </section>
            `
        } 
    }
    
    
    $("#main_bar").html(`
         <section id="app_landing">
            <div class="subPageNavs">
                <h1>Movies</h1>
                <span>
                <button>Films </button>
                <button>TV Series</button>
                </span>
            </div>

            <div class="landing_grid_view">
                ${moviesPage}
            </div>
         </section>
        
        `)
}

// news page
function getNewsPage() {

    let newsPage = "";

    for (let i = 0; i < fanNews.length; i++) {
        newsPage += `
            <section>
                <h2>${fanNews[i].title}</h2>
                <div class="flex_more_show">${fanNews[i].details.slice(0, sliceNum)}${moreBtn}</div>
                <div style="display:none" class="flex_more_hide">${fanNews[i].details}${lessBtn}</div>
                <i>${fanNews[i].date}</i>
            </section>
        ` 
    }
    
    $("#main_bar").html(
        `
        <section id="app_landing">
            <div class="subPageNavs">
                <h1>News</h1>
                <span>
                <button>Breaking </button>
                <button>Celebrity</button>
                </span>
            </div>
            
            <div class="landing_flex_view">
                ${newsPage}
            </div>
        </section>
        
        `
        )
}


// toggle read more
function toggleFlexMore(x) {
    let page = x.parentElement.parentElement.parentElement
    let more = page.getElementsByClassName("flex_more_show")[0]
    let less = page.getElementsByClassName("flex_more_hide")[0]

    $(more).toggle()
    $(less).toggle()
}
