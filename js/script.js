const files = [

    ["navbar", "navbar.html"],
    ["hero", "hero.html"],
    ["stats", "stats.html"],
    ["destinations", "destinations.html"],
    ["explore", "explore.html"],
    ["regions", "regions.html"],
    ["plan-your-trip", "plan-your-trip.html"],
    ["packages", "packages.html"],
    ["hidden-gems", "hidden-gems.html"],
    ["Index", "index2.html"],
    ["reviews", "reviews.html"],
    ["about", "about.html"],
    ["contact", "contact.html"],
    ["footer", "footer.html"]

];


// =====================================================
// LOAD HTML SECTIONS
// =====================================================

files.forEach(([id, file]) => {

    fetch(file)
        .then(response => response.text())
        .then(data => {

            const section = document.getElementById(id);

            if (!section) return;

            section.innerHTML = data;


            // LOAD SAVED CONTACT
            if (id === "contact") {
                loadSavedContact();
            }


            // LOAD SAVED TRIP
            if (id === "plan-your-trip") {
                loadSavedTrip();
            }
 

            // MOBILE MENU
            if (id === "navbar") {

                const menuToggle =
                    document.getElementById("menuToggle");

                const mobileNavigation =
                    document.getElementById("mobileNavigation");

                if (menuToggle && mobileNavigation) {

                    menuToggle.addEventListener("click", () => {

                        mobileNavigation.classList.toggle("active");

                    });

                }

            }

        })
        .catch(error => console.error(file, error));

});


// =====================================================
// THEME TOGGLE
// =====================================================

const themeToggle =
    document.getElementById("themeToggle");

if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {

            themeToggle.textContent = "☀️";

        } else {

            themeToggle.textContent = "🌙";

        }

    });

}


// =====================================================
// DESTINATION REGION FILTER
// =====================================================

document.addEventListener("click", function (e) {

    const button =
        e.target.closest(".region-btn");

    if (!button) return;

    const filter =
        button.getAttribute("data-filter");

    const buttons =
        document.querySelectorAll(".region-btn");

    const cards =
        document.querySelectorAll(".destination-card");


    buttons.forEach(function (btn) {

        btn.classList.remove("active");

    });

    button.classList.add("active");


    cards.forEach(function (card) {

        if (filter === "all") {

            card.style.display = "";

        } else if (
            card.classList.contains(filter + "-card")
        ) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

});


// =====================================================
// EXPLORE INDIA REGION CARDS
// =====================================================

document.addEventListener("click", function (e) {

    const regionCard =
        e.target.closest(".region-card");

    if (!regionCard) return;

    const filter =
        regionCard.getAttribute("data-filter");

    if (!filter) return;

    const cards =
        document.querySelectorAll(".destination-card");

    const buttons =
        document.querySelectorAll(".region-btn");


    cards.forEach(function (card) {

        if (filter === "all") {

            card.style.display = "";

        } else if (
            card.classList.contains(filter + "-card")
        ) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });


    buttons.forEach(function (button) {

        button.classList.remove("active");

        if (
            button.getAttribute("data-filter") === filter
        ) {

            button.classList.add("active");

        }

    });

});


// =====================================================
// TRAVEL MOOD FILTER
// =====================================================

document.addEventListener("click", function (e) {

    const moodCard =
        e.target.closest(".mood-card");

    if (!moodCard) return;

    const mood =
        moodCard.getAttribute("data-mood");

    if (!mood) return;

    const cards =
        document.querySelectorAll(".destination-card");


    cards.forEach(function (card) {

        if (
            card.classList.contains(mood + "-card")
        ) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

});


// =====================================================
// HIDDEN GEMS → DISCOVER
// =====================================================

document.addEventListener("click", function (e) {

    if (e.target.id !== "discoverHiddenGems") return;

    const hiddenGemsMore =
        document.getElementById("hiddenGemsMore");

    if (!hiddenGemsMore) return;

    hiddenGemsMore.classList.add("show");

    hiddenGemsMore.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

});

// =====================================================
// TRIP PLANNER
// =====================================================

document.addEventListener("click", function (e) {

    if (!e.target.closest("#buildJourneyBtn")) return;

    const name=

        document.getElementById("plannerName")?.value || "";

        const email=

        document.getElementById("plannerEmail")?.value || "";
    const destination =
        document.getElementById("plannerDestination")?.value || "";

    const tripLength =
       
        document.getElementById("triplength")?.value || "";

    const travelDate =
        document.getElementById("travelDate")?.value || "";

    const travellers =
        document.getElementById("travellers")?.value || "";

    const travelStyle =
        document.getElementById("travelStyle")?.value || "";


    if (!name || !email || !destination || !tripLength || !travelDate  || !travelStyle) {

        alert("Please fill in all trip details.");

        return;
    }


    const tripData = {
        name: name,

        email: email,

        destination: destination,

        tripLength: tripLength,

        travelDate: travelDate,

        travellers: travellers,

        travelStyle: travelStyle

    };


    // SAVE TRIP

    localStorage.setItem(
        "wanderIndiaTrip",
        JSON.stringify(tripData)
    );


    // DISPLAY SAVED TRIP

    const savedBox =
        document.getElementById("savedTrip");

        const savedName =
        document.getElementById("savedName");   
        const savedEmail =
        document.getElementById("savedEmail");

    const savedDestination =
        document.getElementById("savedDestination");

    const savedTripLength =
        document.getElementById("savedTripLength");

    const savedTravelDate =
        document.getElementById("savedTravelDate");

    const savedTravellers =
        document.getElementById("savedTravellers");

    const savedTravelStyle =
        document.getElementById("savedTravelStyle");


    if (savedBox) {
        if (savedName)
            savedName.textContent = name; 
          
        if (savedEmail)
            savedEmail.textContent = email;

        if (savedDestination)
            savedDestination.textContent = destination;

        if (savedTripLength)
            savedTripLength.textContent = tripLength;

        if (savedTravelDate)
            savedTravelDate.textContent = travelDate;

        if (savedTravellers)
            savedTravellers.textContent = travellers;

        if (savedTravelStyle)
            savedTravelStyle.textContent = travelStyle;


        savedBox.style.display = "block";

    }


    alert("Your trip has been saved successfully!");

});


// =====================================================
// LOAD SAVED TRIP
// =====================================================

function loadSavedTrip() {

    const saved =
        localStorage.getItem("wanderIndiaTrip");

    if (!saved) return;


    const trip =
        JSON.parse(saved);


    const savedBox =
        document.getElementById("savedTrip");
        const savedName =
        document.getElementById("savedName");   
        const savedEmail =
        document.getElementById("savedEmail");

    const savedDestination =
        document.getElementById("savedDestination");

    const savedTripLength =
        document.getElementById("savedTripLength");

    const savedTravelDate =
        document.getElementById("savedTravelDate");

    const savedTravellers =
        document.getElementById("savedTravellers");

    const savedTravelStyle =
        document.getElementById("savedTravelStyle");


    if (!savedBox) return;

if (savedName)
        savedName.textContent =
            trip.name || "";        
            if (savedEmail)
        savedEmail.textContent =
            trip.email || "";
    if (savedDestination)
        savedDestination.textContent =
            trip.destination || "";

    if (savedTripLength)
        savedTripLength.textContent =
            trip.tripLength || "";

    if (savedTravelDate)
        savedTravelDate.textContent =
            trip.travelDate || "";

    if (savedTravellers)
        savedTravellers.textContent =
            trip.travellers || "";

    if (savedTravelStyle)
        savedTravelStyle.textContent =
            trip.travelStyle || "";


    savedBox.style.display = "block";

}



// =====================================================
// CONTACT FORM
// =====================================================

document.addEventListener("click", function (e) {

    if (!e.target.closest("#contactSubmit")) return;

const name =
    document.getElementById("contactName")?.value?.trim() || "";

const email =
    document.getElementById("contactEmail")?.value?.trim() || "";

const subject =
    document.getElementById("contactSubject")?.value?.trim() || "";

const message =
    document.getElementById("contactMessage")?.value?.trim() || "";
    

    if (
        !name ||
        !email ||
        !message ||
        !subject ||
        subject === "Select an option"
    ) {

        alert(
            "Please fill in all fields."
        );

        return;

    }


    const newContact = {

        name: name,

        email: email,

        subject: subject,

        message: message

    };


    // GET OLD ENQUIRIES

    let enquiries =
        JSON.parse(
            localStorage.getItem(
                "wanderIndiaContacts"
            )
        ) || [];


    // ADD NEW ENQUIRY

    enquiries.push(newContact);


    // SAVE ALL ENQUIRIES

    localStorage.setItem(
        "wanderIndiaContacts",
        JSON.stringify(enquiries)
    );


    // SHOW LATEST ENQUIRY

    const showName =
        document.getElementById("showContactName");

    const showEmail =
        document.getElementById("showContactEmail");

    const showSubject =
        document.getElementById("showContactSubject");

    const showMessage =
        document.getElementById("showContactMessage");

    const savedContact =
        document.getElementById("savedContact");


    if (showName)
        showName.textContent = name;

    if (showEmail)
        showEmail.textContent = email;

    if (showSubject)
        showSubject.textContent = subject;

    if (showMessage)
        showMessage.textContent = message;

    if (savedContact)
        savedContact.style.display = "block";


    alert(
        "Your enquiry has been saved successfully!"
    );

});


// =====================================================
// LOAD SAVED CONTACT
// =====================================================

function loadSavedContact() {

    const enquiries =
        JSON.parse(
            localStorage.getItem(
                "wanderIndiaContacts"
            )
        ) || [];


    if (enquiries.length === 0) return;


    const latest =
        enquiries[enquiries.length - 1];


    const savedContact =
        document.getElementById("savedContact");


    if (!savedContact) return;


    const showName =
        document.getElementById("showContactName");

    const showEmail =
        document.getElementById("showContactEmail");

    const showSubject =
        document.getElementById("showContactSubject");

    const showMessage =
        document.getElementById("showContactMessage");


    if (showName)
        showName.textContent = latest.name;

    if (showEmail)
        showEmail.textContent = latest.email;

    if (showSubject)
        showSubject.textContent = latest.subject;

    if (showMessage)
        showMessage.textContent = latest.message;


    savedContact.style.display =
        "block";

}