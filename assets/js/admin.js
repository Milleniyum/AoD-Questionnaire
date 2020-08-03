const serverPath = window.location.host.includes("netlify") ? "https://serene-hamlet-61538.herokuapp.com" : "http://localhost:8080";
console.log(serverPath);

$("table").hide();
$("table").show();

function getResponses() {
    $.ajax({ url: serverPath + "/api/responses", method: "GET", data: { username: "username", password: "password" } })
        .then(response => {
            console.log(response);
            loadTable(response);
        })
        .catch(err => {
            showAlert("A server error occured. Please try again.")
            console.log(err);
        });
};

function loadTable(response) {
    let count = 0;
    const today = new Date();

    response.forEach(item => {
        count++;
        let age = today.getFullYear() - item.dob_year;
        let month = today.getMonth() + 1;
        let day = today.getDate();
        //Subtract a year from their age if their birthday hasn't come yet
        if (month < item.dob_month || (month === item.dob_month && day < item.dob_day)) age--;

        tRow = $("<tr>");
        tRow.append($("<th>").addClass("scope", "row").text(count));
        tRow.append($("<td>").text(item.first_name));
        tRow.append($("<td>").text(item.last_name));
        tRow.append($("<td>").text(`${item.dob_month}/${item.dob_day}/${item.dob_year}`));
        tRow.append($("<td>").text(age));
        tRow.append($("<td>").text(item.grade));
        tRow.append($("<td>").text(item.parent));
        tRow.append($("<td>").text(item.allergies));
        tRow.append($("<td>").text(`${item.address}, ${item.city}, ${item.state} ${item.zip}`));
        tRow.append($("<td>").text(item.phone));
        tRow.append($("<td>").text(item.email));
        tRow.append($("<td>").text(item.fav_color));
        tRow.append($("<td>").text(item.fav_candy));
        tRow.append($("<td>").text(item.fav_icecream));
        tRow.append($("<td>").text(item.fav_music));
        tRow.append($("<td>").text(item.fav_artist));
        tRow.append($("<td>").text(item.fav_song));
        tRow.append($("<td>").text(item.fav_book));
        tRow.append($("<td>").text(item.fav_person));
        tRow.append($("<td>").text(item.fav_saying));
        tRow.append($("<td>").text(item.fav_drink));
        tRow.append($("<td>").text(item.fav_food));
        tRow.append($("<td>").text(item.fav_fruit));
        tRow.append($("<td>").text(item.fav_game));
        tRow.append($("<td>").text(item.fav_dance));
        tRow.append($("<td>").text(item.fav_clothes));
        tRow.append($("<td>").text(item.fav_style));
        tRow.append($("<td>").text(item.fav_app));

        $("tbody").append(tRow);
    });
}

function showAlert(errors) {
    $("#alert-message").html(`<ul>${errors}</ul>`);
    $("#alert-modal").modal("show");
};

getResponses();