
const appointmentForm = document.getElementById("appointmentForm");
const doctorSelect = document.getElementById("doctor");
const dateInput = document.getElementById("date");
const successMessage = document.getElementById("successMessage");

// Prevent selecting past dates
const today = new Date();
const localDate = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
).toISOString().split("T")[0];

dateInput.min = localDate;

// Select doctor from doctor card
document.querySelectorAll(".select-doctor").forEach(button => {
    button.addEventListener("click", () => {
        doctorSelect.value = button.dataset.doctor;

        document.getElementById("appointment").scrollIntoView({
            behavior: "smooth"
        });
    });
});

// Appointment form submission
appointmentForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const doctor = doctorSelect.value;
    const date = dateInput.value;
    const time = document.getElementById("time").value;

    if (!name || !email || !phone || !doctor || !date || !time) {
        alert("Please fill in all required fields.");
        return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
        alert("Please enter a valid 10-digit phone number.");
        return;
    }

    if (date < localDate) {
        alert("Please select a valid future date.");
        return;
    }

    successMessage.innerHTML =
        `Appointment request submitted successfully!<br>
        Thank you, ${name}.<br>
        Doctor: ${doctor}<br>
        Date: ${date}<br>
        Time: ${time}`;

    appointmentForm.reset();
    dateInput.min = localDate;
});
