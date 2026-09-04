$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
        const isOpen = $('.navbar').hasClass('nav-toggle');
        $(this).attr('aria-expanded', isOpen);
        $(this).attr('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    });

});

const favicon = document.getElementById("favicon");
const defaultFavicon = favicon ? favicon.getAttribute("href") : "";
const alternateFavicon = defaultFavicon ? defaultFavicon.replace("favicon.png", "favhand.png") : "";

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Portfolio | Aftab Sipahi";
            $("#favicon").attr("href", defaultFavicon);
        }
        else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", alternateFavicon);
        }
    });


async function fetchData(type = "skills") {
    let response
    type === "skills" ?
        response = await fetch("skills.json")
        :
        response = await fetch("./projects/projects.json")
    const data = await response.json();
    return data;
}

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
              <div class="info">
                <img src="${skill.icon}" alt="${skill.name} icon" loading="lazy" decoding="async" />
                <span>${skill.name}</span>
              </div>
            </div>`
    });
    skillsContainer.innerHTML = skillHTML;
}

fetchData().then(data => {
    showSkills(data);
});

// <!-- tilt js effect starts -->
VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
});
// <!-- tilt js effect ends -->


// pre loader start
// function loader() {
//     document.querySelector('.loader-container').classList.add('fade-out');
// }
// function fadeOut() {
//     setInterval(loader, 500);
// }
// window.onload = fadeOut;
// pre loader end

/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

/* SCROLL HOME */
srtop.reveal('.home .content h1', { delay: 200 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 200 });

srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin', { interval: 600 });
srtop.reveal('.home .github', { interval: 800 });
srtop.reveal('.home .twitter', { interval: 1000 });
srtop.reveal('.home .telegram', { interval: 600 });
srtop.reveal('.home .instagram', { interval: 600 });
srtop.reveal('.home .dev', { interval: 600 });

/* SCROLL ABOUT */
srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });


/* SCROLL SKILLS */
srtop.reveal('.skills .container', { interval: 200 });
srtop.reveal('.skills .container .bar', { delay: 400 });

/* SCROLL EDUCATION */
srtop.reveal('.education .box', { interval: 200 });

/* SCROLL PROJECTS */
srtop.reveal('.work .box', { interval: 200 });

/* SCROLL EXPERIENCE */
srtop.reveal('.experience .timeline', { delay: 400 });
srtop.reveal('.experience .timeline .container', { interval: 400 });

/* SCROLL INSIGHTS */
srtop.reveal('.article-card', { interval: 200 });

const contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const status = document.getElementById("contactStatus");
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const formData = new FormData(contactForm);
        if (formData.get("companyWebsite")) {
            if (status) {
                status.textContent = "Thanks. Your message is ready to send.";
                status.className = "form-status success";
            }
            return;
        }
        if (!contactForm.checkValidity()) {
            if (status) {
                status.textContent = "Please complete the required fields with a valid email address.";
                status.className = "form-status error";
            }
            contactForm.reportValidity();
            return;
        }
        submitButton.disabled = true;
        submitButton.querySelector("span").textContent = "Opening email client…";
        if (status) {
            status.textContent = "Your email app will open with your project details.";
            status.className = "form-status success";
        }
        const recipient = `${contactForm.dataset.mailUser}@${contactForm.dataset.mailDomain}`;
        const subject = `Portfolio enquiry from ${formData.get("name")}`;
        const body = `Name: ${formData.get("name")}\nEmail: ${formData.get("email")}\n\nProject details:\n${formData.get("message")}`;
        window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.setTimeout(() => {
            submitButton.disabled = false;
            submitButton.querySelector("span").textContent = "Discuss a Salesforce Project";
        }, 1200);
    });
}

/* SCROLL CONTACT */
srtop.reveal('.contact-container', { delay: 400 });
