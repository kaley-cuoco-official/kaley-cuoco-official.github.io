$("#nav_search_form").on('submit', (e)=>{
    e.preventDefault();

    if ($("#nav_search_input").val() == "") {
        return
    }

    location = "./?page=search&desc="+$("#nav_search_input").val();
})

function searchPage() {
    
    let search = `
    <div id="app_landing">
        ${getSearch}
    </div>
    `;
    $("#main_bar").html(search)
}