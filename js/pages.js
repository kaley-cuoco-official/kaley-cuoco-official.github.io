// membership requires fees and must be renewed
// fan page will stimulate random pep being fans
// meet & greet will require membership status
// charity will show where we use raised funds for charity
// competitions will promote one thing or the other
// 

// grab url page and fire up
$(document).ready(function() {
    if (getPage != null) {
        appUrlPage()
    }
    else{
        landAppPage();
    }
})

// 
let whatsApp = "Upload your payment receipt";

//
function appUrlPage() {
    switch (getPage) {
        case 'about me':
            $("#main_bar").html(getPage)
        break;

        case 'contacts':
            $("#main_bar").html(getPage)
        break;

        case 'account':

        if (localStorage.hasOwnProperty("fan")) {
            location = "./";
        }

            $("#main_bar").html(`
                <form id="reg_form">

                    <aside>
                        <h2>Fan Portal</h2>

                        <div>
                            <b>First Name: *</b>
                            <input type="text" id="reg_name1" class="reg_inputs" placeholder="Enter your first name">
                        </div>

                        <div>
                            <b>Middle Name: </b>
                            <input type="text" id="reg_name2" placeholder="Enter your middle name">
                        </div>

                        <div>
                            <b>Last Name: *</b>
                            <input type="text" id="reg_name3" class="reg_inputs" placeholder="Enter your last name">
                        </div>

                        <div>
                            <b>User-ID: *</b>
                            <input type="text" id="reg_id" class="reg_inputs" placeholder="Enter your e-mail address or phone number">
                        </div>

                        <button>Submit</button>
                    </aside>

                </form>    
            `)
        break;

        case 'membership':
            checkRegistration();

            let membershipOpt = `<option value="">Select . . .</option>`

            for (let i = 0; i < fanPage.fan.length; i++) { 
                membershipOpt += `<option value="${fanPage.fan[i].fee}">${fanPage.fan[i].package.toUpperCase()}</option>`  
            }

            let members = `
                <div class="page_bg" id="membership_vip">
                    <section>
                        <h2>Become Full/V.I.P Member</h2>

                        <p>
                            <b>Membership Package: </b>
                            <select id="membership_fee">${membershipOpt}</select>
                            <span id="show_fee"></span>
                        </p>

                        <button id="fee_btn">Next</button>
                    </section>
                </div>
            `;

            // 
            if (localStorage.hasOwnProperty("fee") && localStorage.hasOwnProperty("member")) {

                if ( getUpgrade != null) {
                    let fan = localStorage.getItem("member");

                    if (fan == "confirmed") {
                        let fanFee = JSON.parse(localStorage.getItem("fee"));
                        let fanReg = JSON.parse(localStorage.getItem("fan"));

                        let contact = "";

                        if (validEmail.test(fanReg.id)) {
                            contact =  `<li> <b>Email: </b> <span>${fanReg.id}</span> </li>`
                        } 
                        else {
                            contact =  `<li> <b>Phone: </b> <span>${fanReg.id}</span> </li>`
                        }

                        let myPlan = "";
                        let upgradePlan = `<option value="">Select . . .</option>`;

                        for (let i = 0; i < fanPage.fan.length; i++) {
                            if (fanPage.fan[i].fee == fanFee.fee) {
                                myPlan =  `<li><b>Plan:</b> <span>${fanPage.fan[i].package.toUpperCase()} (${parseInt(fanPage.fan[i].fee.substring(1)).toLocaleString("en-US", {style:"currency", currency:"USD", minimumFractionDigits:0})})</span></li>`
                            }

                            if (parseInt(fanPage.fan[i].fee.substring(1)) >  parseInt(fanFee.fee.substring(1))) {
                                upgradePlan += `<option value="${fanPage.fan[i].fee}">${fanPage.fan[i].package.toUpperCase()}</option>`
                            }
                            
                        }

                        members = `
                        <div class="page_bg" id="membership_upgrade">
                            
                            <section>
                                <ul>
                                    <li> 
                                    <b>Name: </b> 
                                    <span>${fanReg.firstName.toUpperCase()}, ${fanReg.lastName.toUpperCase()}</span> 
                                    </li>
                                    ${contact}
                                    ${myPlan}
                                </ul>

                                <h2>Upgrade Plan</h2>

                                <div id="membership_upgrade_contents">
                                    <p>
                                        <b>Plan: </b>
                                        <select id="upgrade_select">${upgradePlan}</select>
                                        <span id="upgrade_show"></span>
                                    </p>

                                    <button id="upgrade_btn">Upgrade</button>
                                </div>

                            </section>

                        </div>
                    `
                }
            }
            else if (getReceipt != null){

                if (localStorage.hasOwnProperty("upgrade")) {
                    let verifyUpgrade = JSON.parse(localStorage.getItem("upgrade"));
                    console.log(atob(getReceipt).replace(",",""))

                    if (atob(getReceipt).replace(",","") == verifyUpgrade.plan) {

                        createUpdateFee(verifyUpgrade.plan);
                        localStorage.removeItem("upgrade");

                        $("#appLoader").show().css({"display":"flex"})

                        setTimeout(() => {
                            alert("Upgrade was sucessful !")
                            location = "./?page=membership"
                        }, 500);
                    }
                    else if(getReceipt == "upgrade"){
                        let upgradeFee = JSON.parse(localStorage.getItem("upgrade"));

                        members = `
                        <div class="page_bg" id="membership_link">
                        <section>
                            <h2>Upgrade Plan</h2>

                            <aside>
                                <div class="membership_link_div">
                                    <h3>Account Details</h3>

                                    <i>
                                        Pay <b>${parseInt(upgradeFee.plan.substring(1)).toLocaleString("en-US", {style:"currency", currency:"USD", minimumFractionDigits:0})}</b> to any of this account; send upload receipt via WhatsApp for confirmation code.
                                    </i>

                                    <p>
                                        <b>BTC: </b>
                                        <span>NA</span>
                                    </p>

                                    <p>
                                        <b>Cash App: </b>
                                        <span>NA</span>
                                    </p>

                                    <p>
                                        <b>PayPal: </b>
                                        <span>NA</span>
                                    </p>

                                    <hr> <br><br>

                                    <h3>Whats Link</h3>
                                    <p>
                                        <b>Receipt: </b>
                                        <a href="https://wa.me/${myNum2}?text=${whatsApp}">
                                            <img src="./icons/whatsapp.webp" alt="WhatsApp">
                                        </a>
                                    </p>
                                
                                </div>
            
                            </aside>
                           
                        </section>

                            
                        </div>
                        
                        `
                    }  
                    else{
                        alert("You do not have valid UPGRADE PLAN")
                        // location = "./"
                    }
                } 
                else{
                    location = "./?page=membership&upgrade"
                }
                
            }
            else{

                if (localStorage.hasOwnProperty("upgrade")) {
                    let pendingUpgrade = JSON.parse(localStorage.getItem("upgrade"));
                    
                    alert(`You have pending Upgrade Plan (${pendingUpgrade.plan})`)
                }

                let fees = JSON.parse(localStorage.getItem("fee"));

                let paidFee = "";
                let fanPackage = "";
                let listFanBase = "";

                for (let i = 0; i < fanPage.fan.length; i++) {
                    if (fanPage.fan[i].fee == fees.fee) {
                        
                        paidFee = parseInt(fanPage.fan[i].fee.substring(1)).toLocaleString("en-US", {style:"currency", currency:"USD", minimumFractionDigits:0});

                        fanPackage = fanPage.fan[i].package.toUpperCase();
                    }

                    listFanBase += `<li>

                        <b>${fanPage.fan[i].package.toUpperCase()}</b> 

                        <span>
                        (${parseInt(fanPage.fan[i].fee.substring(1)).toLocaleString("en-US", {style:"currency", currency:"USD", minimumFractionDigits:0})})
                        </span>

                    </li>`
                }

                members = `
                <div class="page_bg" id="membership_base">

                    <section>
                        <h2>Kaley Cuoco's Fan Base</h2>

                        <aside>
                            <div id="membership_base_nav">
                                <p>
                                    <b>Current Base:</b> 
                                    <span>${fanPackage} (${paidFee})</span> 
                                    <a href="./?page=membership&upgrade">Upgrade Plan</a>
                                </p>
                            </div>

                            <div id="membership_base_text">
                                <p>
                                You now official a member of <strong>${actor.toUpperCase()}</strong> fan club; and is now eligible for a <a style="color:blue" href="./?page=meet%20and%20greet">Meet and Greet !</a>.
                                </p>

                                <br>

                                <p>
                                Selection will be based on Admin's discretion. <br> Please note, fans on higher <b>Package/Plan</b> will prioritised on our list.
                                </p>

                                <br>

                                <p>
                                Consider upgrading your Fan-Base category to increase your chances.
                                </p>
                            </div>
                            
                            <div id="membership_base_conatainer">
                                <h3>Fan Base Categories</h3>
                                <ol>${listFanBase}</ol>
                            </div>
                        </aside>

                    </section> 

                </div>
                  
                 `
            }

                
            }
            
            // 
            if (localStorage.hasOwnProperty("fee") && !localStorage.hasOwnProperty("member")) {

                if(getReceipt != null && getReceipt != ""){
                    let verifyPay = JSON.parse(localStorage.getItem('fee'))

                    if (verifyPay.fee == atob(getReceipt).replace(",","")) {

                        localStorage.setItem("member", "confirmed");

                        setTimeout(() => {
                            alert("Your membership plan confirmed !")
                            location = "./?page=membership" 
                        }, 500);
                    }

                }
                else{

                    let confirmFee = JSON.parse(localStorage.getItem("fee"));

                    members = `
                    <div class="page_bg" id="membership_link">
                        <section>
                            <h2>Confirm Payment</h2>

                            <aside>
                                <div class="membership_link_div">
                                    <h3>Account Details</h3>

                                    <i>
                                        Pay <b>${parseInt(confirmFee.fee.substring(1)).toLocaleString("en-US", {style:"currency", currency:"USD", minimumFractionDigits:0})}</b> to any of this account; send upload receipt via WhatsApp for confirmation code.
                                    </i>

                                    <p>
                                        <b>BTC: </b>
                                        <span>NA</span>
                                    </p>

                                    <p>
                                        <b>Cash App: </b>
                                        <span>NA</span>
                                    </p>

                                    <p>
                                        <b>PayPal: </b>
                                        <span>NA</span>
                                    </p>

                                    <hr> <br><br>

                                    <h3>Whats Link</h3>
                                    <p>
                                        <b>Receipt: </b>
                                        <a href="https://wa.me/${myNum2}?text=${whatsApp}">
                                            <img src="./icons/whatsapp.webp" alt="WhatsApp">
                                        </a>
                                    </p>
                                
                                </div>
            
                            </aside>
                           
                        </section>
                    </div>
                    
                    `
                }     
            }
            
            $("#main_bar").html(members);
        break;

        case 'fan club':
            checkRegistration();
            let fanClub = `Loop random fans`;
            $("#main_bar").html(fanClub)
        break;

        case 'meet and greet':
            checkRegistration();
            let meetGreet = `Ability to meet depends on ya plan. Above 1k. Days longivity depends on plan`
            $("#main_bar").html(getPage)
        break;

        case 'competitions':
            $("#main_bar").html(getPage)
        break;

        case 'movies':
            $("#main_bar").html(getPage)
        break;

        case 'news':
            $("#main_bar").html(getPage)
        break;

        case 'search':

        if (getSearch != null) {
            $(document).ready(()=>{
                searchPage();
            })
        }

        break;
    
        default:
            // location
        break;
    }
}

// 
function checkRegistration() {
    if (!localStorage.hasOwnProperty("fan")) {
        location = "./?page=account";
    }
}
