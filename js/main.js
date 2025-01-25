
$(document).ready(function(){
  setTimeout(() => {
    $("#appLoader").hide();
  }, 500);

  const d = new Date();
  $("#copyRights").html("&copy; "+d.getFullYear());
});

// 
window.onscroll = function() {
  transNavBar();
};

const actor = "Kaley Christine Cuoco";

$(".actor_header").text(actor);

function transNavBar() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    $("#appNav ul").css({"background-color":"#ed1848"})
  } 
  else {
    $("#appNav ul").css({"background-color":"rgba(237, 24, 72, 0.8)"})
  }
}

// 
const myNum1 = "+1 (682) 296-5546";
const myNum2 = myNum1.replace(" ", "").replace(" ", "").replace("(", "").replace(")", "").replace("+", "").replace("-", "");

// url
const getUrl = new URLSearchParams(window.location.search);
const getPage = getUrl.get('page');
const getReceipt = getUrl.get('receipt');
const getUpgrade = getUrl.get('upgrade');

// 
const validEmail =
/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

if (getPage !=null) {
  $("#nav_contents").hide()
  $("#main_bar").css({"margin-top":"7rem"})
}
else{
  $("#nav_contents").hide().css({"display":"flex"})
  $("#main_bar").css({"margin-top":"1rem"})
}


// 
let fanPage;
  $.ajax({
    url: "./json/activities.json",
    async: false, 
    dataType: 'json',
    success: function (json) {
        fanPage = json;
    }
  });
  
// console.log(fanPage.nav)

let sideBar = `<li><a href="./">&#127968;Home</a></li>`;

for (let i = 0; i < fanPage.nav.length; i++) {
    sideBar += `<li onclick="getSideBar(this)">${fanPage.nav[i].menu}</li>`
    
}

$("#side_bar").html(`
    <ol>
    <menu class="menu_flip" onclick="closeMenu()">&#10060;</menu>
    <div>${sideBar}</div>
    </ol>
  `);

// 
function getSideBar(x) {
    location = "./?page="+x.innerText.toLowerCase();
}

// 
function closeMenu() {
  $("#side_bar").toggle()
}

 // create and update fee
 function createUpdateFee(f) {
  let pay = {};
  pay.fee = f;

  localStorage.setItem("fee", JSON.stringify(pay));
}

// localStorage.clear();