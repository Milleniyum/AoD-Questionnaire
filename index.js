const date = new Date();
const currentYear = date.getFullYear();

//Populate years for ages 21 or less
yearSelect = $("#dob-year");
yearSelect.empty();
for (let i = 0; i <= 22; i++) {
    yearSelect.append($(`<option>${currentYear - i}</option>`));
};

//Set grade label to show current year
$("#label-grade").text(`Grade in Fall ${currentYear}`)

function validateForm(formData) {
    const { firstName, lastName, dobMonth, dobDay, phone, email } = formData;
    let errors = "";

    if (!firstName) errors += `<li>Please enter a first name</li>`;
    if (!lastName) errors += `<li>Please enter a last name</li>`;
    if (!phone || !email) errors += `<li>Please enter a phone and/or email</li>`;

    switch (dobMonth) {
        case "September":
        case "April":
        case "June":
        case "November":
            if (dobDay === 31) errors += `<li>Please enter a valid date-of-birth</li>`;
            break;
        case "February":
            if (dobDay > 29) errors += `<li>Please enter a valid date-of-birth</li>`;
            break;
    }

    if (errors) showAlert(errors)
    else submitForm(formData);
}

function showAlert(errors) {
    $("#alert-message").html(`<ul>${errors}</ul>`);
    $("#alert-modal").modal("show");
}

function submitForm(formData) {
    console.log(formData);
}

$("#submit").on("click", function () {
    const formData = {
        firstName: $("#first-name").val().trim(),
        lastName: $("#last-name").val().trim(),
        dobMonth: $("#dob-month").val(),
        dobDay: parseInt($("#dob-day").val()),
        dobYear: parseInt($("#dob-year").val()),
        grade: $("#grade").val(),
        parent: $("#parent").val().trim(),
        allergies: $("#allergies").val().trim(),
        address: $("#address").val().trim(),
        city: $("#city").val().trim(),
        state: $("#state").val(),
        zip: parseInt($("#zip").val().trim()),
        phone: $("#phone").val().trim(),
        email: $("#email").val().trim(),
        favColor: $("#fav-color").val().trim(),
        favCandy: $("#fav-candy").val().trim(),
        favIceCream: $("#fav-icecream").val().trim(),
        favMusic: $("#fav-music").val().trim(),
        favArtist: $("#fav-artist").val().trim(),
        favSong: $("#fav-song").val().trim(),
        favBook: $("#fav-book").val().trim(),
        favPerson: $("#fav-person").val().trim(),
        favSaying: $("#fav-saying").val().trim(),
        favDrink: $("#fav-drink").val().trim(),
        favFood: $("#fav-food").val().trim(),
        favFruit: $("#fav-fruit").val().trim(),
        favGame: $("#fav-game").val().trim(),
        favDance: $("#fav-dance").val().trim(),
        favClothes: $("#fav-clothes").val().trim(),
        favStyle: $("#fav-style").val().trim(),
        favApp: $("#fav-app").val().trim()
    };

    validateForm(formData);
})