$(document).ready(function() {
    console.log("main.js: Document ready. Initializing jQuery effects.");

    $('.character-card').each(function() {
        const $card = $(this);
        const $overlay = $card.find('.card-overlay');

        $card.hover(
            function() {
                $overlay.stop(true, true).slideDown(300);
            }, 
            function() {
                $overlay.stop(true, true).slideUp(200);
            }
        );
    });

    $('main').css('opacity', 0).delay(100).animate({ opacity: 1 }, 1000);
});

const validationRules = {
    contactName: {
        minLength: 3,
        pattern: /^.+$/, 
        errorMessage: "Name must be at least 3 characters."
    },
    contactEmail: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        errorMessage: "Please enter a valid email address."
    },
    contactMessage: {
        minLength: 20,
        pattern: /^.+$/,
        errorMessage: "Message must be at least 20 characters long."
    }
};

window.validateField = function(fieldId) {
    const input = document.getElementById(fieldId);
    const rule = validationRules[fieldId];
    const value = input.value.trim();
    let isValid = true;
    
    if (rule.minLength && value.length < rule.minLength) {
        isValid = false;
    }

    if (isValid && rule.pattern && !rule.pattern.test(value)) {
        isValid = false;
    }

    if (value === '') {
        input.classList.remove('is-valid');
        input.classList.remove('is-invalid');
    } else if (isValid) {
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');
    } else {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
    }

    return isValid;
};

function finalValidation(event) {
    event.preventDefault(); 
    
    const formMessage = document.getElementById('form-message');
    let allValid = true;

    for (const fieldId in validationRules) {
        if (!validateField(fieldId)) {
            allValid = false;
        }
    }
    
    formMessage.textContent = ''; 

    if (allValid) {
        formMessage.textContent = "Transmission successful! Data uploaded to the main grid. We will respond within 24 standard rotations.";
        formMessage.style.color = '#00FF00'; // Green Neon
        
        document.getElementById('contactForm').reset(); 
        for (const fieldId in validationRules) {
            document.getElementById(fieldId).classList.remove('is-valid');
        }
        
    } else {
        formMessage.textContent = "ERROR: Failed to establish secure uplink. Please check highlighted fields.";
        formMessage.style.color = '#FF0000';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', finalValidation);
    }
});