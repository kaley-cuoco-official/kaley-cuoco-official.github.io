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
        case 'contact-us':
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

            membershipPage();

        break;

        case 'fan club':
            checkRegistration();
            validMember();

            fanClubPage();
        break;

        case 'meet and greet':
            checkRegistration();
            validMember();

            meetAndGreetPage();
        break;

        case 'events':
            getEventsPage();
        break;

        case 'movies':
            getMoviesPage();
        break;

        case 'news':
            getNewsPage();
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

// verify reg
function checkRegistration() {
    if (!localStorage.hasOwnProperty("fan")) {
        location = "./?page=account";
    }
}

// verify 1st payment
function validMember() {
    if (!localStorage.hasOwnProperty("member")) {
        location = "./?page=membership";
    }
}
