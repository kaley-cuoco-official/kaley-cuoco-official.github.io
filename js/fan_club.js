// 
function fanClubPage() {
// console.log(userOnline)

// 
$(document).ready(()=>{
    let members_active_btn = document.querySelectorAll(".members_active_btn");
    members_active_btn[0].style.backgroundColor = "yellow";

    randonOnlineViews();
})

let activeUser = "";
let nonActiveUser = "";
let userIcon = "";

// 
for (let i = 0; i < userOnline.length; i++) {
    activeUser += `
    <li class="random_flex_online">
        <img src="./${userOnline[i].picture}" alt="${userOnline[i].picture}" loading="lazy">
        <div>
            <p><b>user :</b> <span>${userOnline[i].first_name}, ${userOnline[i].last_name}</span></p>
            <p><b>username :</b> <span>${userOnline[i].username}</span></p>
            <p><b>gender :</b> <span>${userOnline[i].gender}</span></p>
        </div>
    </li>

`   
}


// 
for (let i = 0; i < userOffline.users.length; i++) {

    if (userOffline.users[i].gender == "female") {
        userIcon = "./icons/female_offline.png"
    } 
    else {
        userIcon = "./icons/male_offline.png"
    }

    nonActiveUser += `
        <li class="random_flex_offline">
            <img src="${userIcon}" alt="${userOffline.users[i].maidenName}" loading="lazy">
            <div>
                <p><b>user :</b> <span>${userOffline.users[i].firstName}, ${userOffline.users[i].lastName}</span></p>
                <p><b>username :</b> <span>${userOffline.users[i].username}</span></p>
                <p><b>gender :</b> <span>${userOffline.users[i].gender}</span></p>
            </div>
        </li>
    
    `
    
}


// 
let fanClub = `
        <section id="fan_page_nav">
           <button class="members_active_btn" onclick="toggleMembersList(this)">Active Members</button>
           <button class="members_active_btn" onclick="toggleMembersList(this)">Non-Active Members</button>
        </section>

        <section id="fan_page_body">
            <ol class="fan_page_list" id="online_members">
                <h2>Active <span style="background-color:green"></span> </h2>
                <aside>
                    ${activeUser}
                </aside>
            </ol>

            <ol style="display:none" class="fan_page_list" id="offline_members">
                <h2>Non-Active <span style="background-color:gray"></span></h2>
                <aside>
                    ${nonActiveUser}
                </aside>
            </ol>
        </section>
    `;

    $("#main_bar").html(fanClub);

}

// 
function toggleMembersList(x) {
    $("#appLoader").show().css({"display":"flex"});

    let members_active_btn = document.querySelectorAll(".members_active_btn");

    members_active_btn.forEach(active_btn => {
        active_btn.style.backgroundColor = "white"
    });

    $(x).css({"background-color":"yellow"})

    if (x.innerText.toLowerCase() == "active members") {
       $("#online_members").show();
       $("#offline_members").hide();

       delayReload();
       randonOnlineViews();
    }

    if (x.innerText.toLowerCase() == "non-active members") {
        $("#online_members").hide();
        $("#offline_members").show();

        delayReload();
        randonOfflineViews();
     }
}

// 
function delayReload() {
setTimeout(() => {
    $("#appLoader").hide(); 
}, 1000);
}

// 
// randon flex
function randonOnlineViews() {
   let view_online  = $(".random_flex_online");

   for(var i = 0; i < view_online.length; i++){
       var target = Math.floor(Math.random() * view_online.length -1) + 1;
       var target2 = Math.floor(Math.random() * view_online.length -1) +1;
       view_online.eq(target).before(view_online.eq(target2));
   }
}

function randonOfflineViews() {
   let view_online  = $(".random_flex_offline");

   for(var i = 0; i < view_online.length; i++){
       var target = Math.floor(Math.random() * view_online.length -1) + 1;
       var target2 = Math.floor(Math.random() * view_online.length -1) +1;
       view_online.eq(target).before(view_online.eq(target2));
   }
}
