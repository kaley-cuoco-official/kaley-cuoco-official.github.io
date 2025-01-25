// 
let amountJson
$.ajax({
    url: "./json/activities.json",
    async: false, 
    dataType: 'json',
    success: function (json) {
        amountJson = json;
    }
  });

  let opt = `<option value="">Select ...</option>`;
    
        if (amountJson) {
            for (let i = 0; i < amountJson.fan.length; i++) {
                amountJson.fan[i].package
                amountJson.fan[i].fee
    
                opt += `<option value="${amountJson.fan[i].fee}">${amountJson.fan[i].package.toUpperCase()}</option>`;
                
            }
        }
    
        $("#gen_select").html(opt)

// 
$("#gen_form").on('submit', (e)=>{
    e.preventDefault();

    if ($("#gen_output").text() == "" || parseInt($("#gen_output").text().substring(1).replace(",","")) <= 0) {
        // $("#gen_input").css({"border-color":"red"})
        $("#gen_select").css({"border-color":"red"})
        $("#gen_select").val("")
        return
    }

    $("#gen_input").css({"border-color":"grey"})

    let url = `<a href="./?page=membership&receipt=${btoa($("#gen_output").text())}">Copy Link</a>`

    $("#gen_link").html(url);

})


$("#gen_input").on('keyup', ()=>{
    validateAmount($("#gen_input").val())
})

// 


$("#gen_select").on('change', ()=>{
    validateAmount($("#gen_select").val().substring(1))
})

// 
function validateAmount(amt) {
    if (parseInt(parseInt(amt)) <=0 || isNaN(parseInt(amt))) {
        $("#gen_output").text("$0")
        $("#gen_input").css({"border-color":"red"})
        return
    }

    let amount = parseInt(amt).toLocaleString("en-US", {style:"currency", currency:"USD", minimumFractionDigits:0});

    $("#gen_output").text(amount)
    // $("#gen_input").css({"border-color":"grey"});
    $("#gen_select").css({"border-color":"grey"});
    $("#gen_link").html("");
}