
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