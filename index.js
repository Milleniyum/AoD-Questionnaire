const serverPath = "http://localhost:8080";
const currentYear = new Date().getFullYear();

//Populate years for ages 21 or less
yearSelect = $("#dob-year");
yearSelect.empty();
for (let i = 0; i <= 22; i++) {
    yearSelect.append($(`<option>${currentYear - i}</option>`));
};

//Set grade label to show current year
$("#label-grade").text(`Grade in Fall ${currentYear}`)

function validateForm(formData) {
    const { first_name, last_name, dob_month, dob_day, phone, email } = formData;
    let errors = "";

    if (!first_name) errors += `<li>Please enter a first name</li>`;
    if (!last_name) errors += `<li>Please enter a last name</li>`;
    if (!phone && !email) errors += `<li>Please enter a phone and/or email</li>`;

    switch (dob_month) {
        case "September":
        case "April":
        case "June":
        case "November":
            if (dob_day === 31) errors += `<li>Please enter a valid date-of-birth</li>`;
            break;
        case "February":
            if (dob_day > 29) errors += `<li>Please enter a valid date-of-birth</li>`;
            break;
    };

    if (errors) showAlert(errors)
    else submitForm(formData);
};

function showAlert(errors) {
    $("#alert-message").html(`<ul>${errors}</ul>`);
    $("#alert-modal").modal("show");
};

function submitForm(formData) {
    console.log(formData);
};

function getServerStatus() {
    $.get(serverPath + "/api/server")
        .then(response => {
            console.log(response);
        });
};

$("#submit").on("click", function () {
    const formData = {
        first_name: $("#first-name").val().trim(),
        last_name: $("#last-name").val().trim(),
        dob_month: $("#dob-month").val(),
        dob_day: parseInt($("#dob-day").val()),
        dob_year: parseInt($("#dob-year").val()),
        grade: $("#grade").val(),
        parent: $("#parent").val().trim(),
        allergies: $("#allergies").val().trim(),
        address: $("#address").val().trim(),
        city: $("#city").val().trim(),
        state: $("#state").val(),
        zip: parseInt($("#zip").val().trim()),
        phone: $("#phone").val().trim(),
        email: $("#email").val().trim(),
        fav_color: $("#fav-color").val().trim(),
        fav_candy: $("#fav-candy").val().trim(),
        fav_icecream: $("#fav-icecream").val().trim(),
        fav_music: $("#fav-music").val().trim(),
        fav_artist: $("#fav-artist").val().trim(),
        fav_song: $("#fav-song").val().trim(),
        fav_book: $("#fav-book").val().trim(),
        fav_person: $("#fav-person").val().trim(),
        fav_saying: $("#fav-saying").val().trim(),
        fav_drink: $("#fav-drink").val().trim(),
        fav_food: $("#fav-food").val().trim(),
        fav_fruit: $("#fav-fruit").val().trim(),
        fav_game: $("#fav-game").val().trim(),
        fav_dance: $("#fav-dance").val().trim(),
        fav_clothes: $("#fav-clothes").val().trim(),
        fav_style: $("#fav-style").val().trim(),
        fav_app: $("#fav-app").val().trim()
    };

    validateForm(formData);
});

getServerStatus();