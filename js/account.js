// reg to local storage
$(document).ready(()=> {
    // 
    if (localStorage.hasOwnProperty("fan")) {
        let fan = JSON.parse(localStorage.getItem("fan"));
        $("#fanName").html(`<b>Hi, </b> ${fan.firstName.toUpperCase()}`)
    }

    // 
    $("#reg_form").on('submit', (e)=>{
        e.preventDefault();

        const reg_inputs = document.querySelectorAll(".reg_inputs");

        reg_inputs.forEach(reg_input => {
            if (reg_input.value == "") {
                reg_input.style.borderColor = "red"
            }
            else{
                reg_input.style.borderColor = "gray" 
            }
        });

        if ($("#reg_name1").val() == "" || $("#reg_name3").val() == "" || $("#reg_id").val() == "") {
            return
        }

        if ($("#reg_name2").val() == "") {
            $("#reg_name2").val("fan")
        }

        let myFan  = {}
        myFan.firstName = $("#reg_name1").val();
        myFan.middleName = $("#reg_name2").val();
        myFan.lastName = $("#reg_name3").val();
        myFan.id = $("#reg_id").val();

        localStorage.setItem('fan', JSON.stringify(myFan));

        $("#appLoader").show().css({"display":"flex"})

        setTimeout(() => {
            $("#appLoader").hide()
            alert("Congratulations on being a Member of my FAN CLUB");
            location = "./?page=membership";
        }, 1000);

    })
});