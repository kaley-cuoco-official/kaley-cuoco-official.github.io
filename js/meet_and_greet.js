
  let userOnline;
  $.ajax({
    url: "./json/user_online.json",
    async: false, 
    dataType: 'json',
    success: function (json) {
        userOnline = json;
    }
  });

//   
let userOffline;
  $.ajax({
    url: "./json/user_offline.json",
    async: false, 
    dataType: 'json',
    success: function (json) {
        userOffline = json;
    }
  });

// 
function meetAndGreetPage() {
    // 
    let sum1 = 1000;

    if (localStorage.hasOwnProperty("fee")) {
        let getMember = JSON.parse(localStorage.getItem("fee"));

        for (let i = 0; i < fanPage.fan.length; i++) {

            if (fanPage.fan[i].package == "silver" && fanPage.fan[i].fee ==  getMember.fee) {
                sum1 = 1000
            }
            
            if (fanPage.fan[i].package == "gold" && fanPage.fan[i].fee ==  getMember.fee) {
                sum1 = 900
            }
            
            if (fanPage.fan[i].package == "sapphire" && fanPage.fan[i].fee ==  getMember.fee) {
                sum1 = 800
            }
            if (fanPage.fan[i].package == "platinum" && fanPage.fan[i].fee ==  getMember.fee) {
                sum1 = 700
            }
            
            if (fanPage.fan[i].package == "diamond" && fanPage.fan[i].fee ==  getMember.fee) {
                sum1 = 600
            }
        }
    }


    const sum2 = Math.random() * 1000;
    const sum3 = sum1+sum2;
    
    let meetGreet = `
        <section id="meet_greet_container">
            <h2>Members Only</h2>

            <aside>
                <video muted autoplay loop src="./icons/movie1.mp4"></video>
                <div>
                    <span>Waiting List: </span>
                    <b class="counter" data-target="${parseInt(sum3)}"></b>
                </div>
            </aside>

            <div id="meet_greet_footer">
                <p>Sorry, you are on the "<b style="color:red">Reds</b>" and still have a long way to go, before you can finally get to meet me!</p>

                <p>You can increase your chances of getting "<b style="color:green">Green</b>" on the waiting list by upgrading membership. The higher you go, the more you climb on the waiting list.</p>

                <p></p>

                <a href="./?page=membership&upgrade">Upgrade now</a>
            </div>
        </section>
    `
    $("#main_bar").html(meetGreet);


    // 

    const counters = document.querySelectorAll(".counter");

    counters.forEach((count) => {
      counters.innerText = "0";

      const updateCounts = () => {
        const target = +count.getAttribute("data-target"); // + infront change string to number
        const c = +count.innerText;

        // const increment = target / 1000;

        const increment = Math.random() * 10;

        if (c < target) {
          //   count.innerText = c + increment;

          count.innerText = Math.ceil(c + increment);

          setTimeout(updateCounts, 1);
        } else {
          count.innerText = target.toLocaleString();
        }
      };

      updateCounts();
    });
}
