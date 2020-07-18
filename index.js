
const date = new Date();
const currentYear = date.getFullYear();

//Populate years for ages 21 or less
yearSelect = $("#year");
yearSelect.empty();
for (let i = 0; i <= 22; i++) {
    yearSelect.append($(`<option>${currentYear - i}</option>`));
};

//Set grade label to show current year
$("#label-grade").text(`Grade in Fall ${currentYear}`)