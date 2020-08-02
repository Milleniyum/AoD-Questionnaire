console.log(window.location.host)
const serverPath = window.location.pathname.includes("Desktop") ? "http://localhost:8080" : "https://serene-hamlet-61538.herokuapp.com";
console.log(serverPath);
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
    if (phone && phone.replace(/\D/g, '').length != 10) errors += `<li>Please enter a valid phone number</li>`;
    // if (email && !/.+@.+\..+/.test(email)) errors += `<li>Please enter a valid email address</li>`;

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
    $.ajax({ url: serverPath + "/api/answers", method: "POST", data: formData })
        .then(response => {
            $("#wrapper").remove();
            countdown();
            clearInterval(pingServer);
        })
        .catch(err => {
            showAlert("A server error occured. Please try again.")
            console.log(err);
        })
};

function getServerStatus() {
    let count = 10; //Ping the server for a max of 10 minutes
    let intervalPing = setInterval(pingServer, 60000);

    function pingServer() {
        count--;
        if (count === 0) return clearInterval(intervalPing);
        $.ajax({ url: serverPath + "/api/server", method: "GET" })
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.log(err);
            })
    }
};

function countdown() {
    let count = 10;
    $("#submitted").html(`Thank You for Your Submission<br><br>You will be routed to our website in ${count} second(s)`);
    setInterval(reroute, 1000);

    function reroute() {
        count--;
        if (count === 1) return window.location.href = "https://www.angelsofdestiny.org/";
        $("#submitted").html(`Thank You for Your Submission<br><br>You will be routed to our website in ${count} second(s)`);
    }
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
        zip: $("#zip").val().trim() === "" ? null : parseInt($("#zip").val().trim()),
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

//Ping the heroku server to ensure it's up when submitting
getServerStatus();

// $("#first-name").val("Jamie");
// $("#last-name").val("DeLong");
// $("#dob-month").val("February");
// $("#dob-day").val("20");
// $("#dob-year").val("1998");
// $("#grade").val("12th");
// $("#parent").val("Cynthia and Lee DeLong");
// $("#allergies").val("Peanuts");
// $("#address").val("8830 Dunes Ct. 12-307");
// $("#city").val("Kissimmee");
// $("#state").val("FL");
// $("#zip").val("34747");
// $("#phone").val("407-376-8799");
// $("#email").val("jdlong1980@gmail.com");
// $("#fav-color").val("Blue");
// $("#fav-candy").val("Junior Mints");
// $("#fav-icecream").val("Butter Pecan");
// $("#fav-music").val("Pop");
// $("#fav-artist").val("Madonna");
// $("#fav-song").val("True Blue");
// $("#fav-book").val("Discovery of Witches");
// $("#fav-person").val("Maya Angelou");
// $("#fav-saying").val("God Willing and the Crick Don't Rise");
// $("#fav-drink").val("Diet Cranberry Ginger Ale");
// $("#fav-food").val("Mac N Cheese");
// $("#fav-fruit").val("Cherries");
// $("#fav-game").val("World of Warcraft");
// $("#fav-dance").val("The Carlton");
// $("#fav-clothes").val("T-Shirt and Jeans");
// $("#fav-style").val("Baggy");
// $("#fav-app").val("Facebook");