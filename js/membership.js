
function membershipPage() {
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
                                Selection will be based on Admin's discretion. <br> Please note, fans on higher <b>Package/Plan</b> will be highly prioritised on our list.
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
}



$(document).ready(()=>{

    $("#membership_fee").on('change', ()=>{
        let fees = parseInt($("#membership_fee").val().substring(1)).toLocaleString("en-US", {style:"currency", currency:"USD", minimumFractionDigits:0});

        $("#show_fee").text(fees);

        if (isNaN(parseInt($("#show_fee").text().substring(1)))) {
            $("#show_fee").text("");
        }
    })

    // 
    $("#fee_btn").on('click', ()=>{
        if ($("#show_fee").text() == "") {  
            $("#membership_fee").css({"border-color":"red"})
            return
        }

        if (isNaN(parseInt($("#show_fee").text().substring(1)))) {
            return
        }

        createUpdateFee($("#membership_fee").val());

        location.reload()
    })

    // 
    $("#upgrade_select").on('change', ()=>{
        let upgrade = parseInt($("#upgrade_select").val().substring(1)).toLocaleString("en-US", {style:"currency", currency:"USD", minimumFractionDigits:0});

        if (isNaN(parseInt(upgrade.substring(1)))) {
            $("#upgrade_show").text("")
            return
        }

        $("#upgrade_select").css({"border-color":"grey"});
        
        $("#upgrade_show").text(upgrade)
    })

    // 
    $("#upgrade_btn").on("click", ()=>{
        if ($("#upgrade_show").text() == "") {
            $("#upgrade_select").css({"border-color":"red"})
            return
        }

        $("#upgrade_select").css({"border-color":"grey"});

        $("#appLoader").show().css({"display":"flex"})

        let up = {};
        up.plan = $("#upgrade_select").val().replace(",","");

        localStorage.setItem('upgrade', JSON.stringify(up));


        setTimeout(() => {
            $("#appLoader").hide()
            location = "./?page=membership&receipt=upgrade"
        }, 500);
    })
})
