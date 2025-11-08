/**
 * File: main.js
 * Description: Implements jQuery effects and pure JavaScript form validation.
 * Requirements Covered: jQuery, JS Form Validation (Pure JS - Real-time), jQuery Effects.
 */

// 1. jQuery Section (Effects/Animations)
$(document).ready(function() {
    console.log("main.js: Document ready. Initializing jQuery effects.");

    // --- [Requirement: jQuery Effect - Card Hover] ---
    // Эффект плавного появления и скрытия оверлея при наведении на карточку персонажа
    $('.character-card').each(function() {
        const $card = $(this);
        const $overlay = $card.find('.card-overlay');

        $card.hover(
            // mouseenter: плавно показывает оверлей
            function() {
                $overlay.stop(true, true).slideDown(300);
            }, 
            // mouseleave: плавно скрывает оверлей
            function() {
                $overlay.stop(true, true).slideUp(200);
            }
        );
    });

    // Optional: Global fade-in effect on page load
    $('main').css('opacity', 0).delay(100).animate({ opacity: 1 }, 1000);
});

// ====================================================================

// 2. Pure JavaScript Section (Real-Time Form Validation)
// --- [Requirement: JS Form Validation] ---

// Валидационные правила и сообщения об ошибках
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

/**
 * Валидирует одно поле в реальном времени и применяет классы Bootstrap.
 * Эта функция вызывается из атрибута oninput в contact.html.
 * @param {string} fieldId - ID поля, которое нужно проверить.
 */
window.validateField = function(fieldId) {
    const input = document.getElementById(fieldId);
    const rule = validationRules[fieldId];
    const value = input.value.trim();
    let isValid = true;
    
    // Проверка по минимальной длине
    if (rule.minLength && value.length < rule.minLength) {
        isValid = false;
    }

    // Проверка по регулярному выражению (паттерну)
    if (isValid && rule.pattern && !rule.pattern.test(value)) {
        isValid = false;
    }

    // Применение стилей Bootstrap (красный/зеленый)
    if (value === '') {
        // Если поле пустое, удаляем оба класса для нейтрального вида
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

/**
 * Выполняет финальную валидацию всех полей при отправке формы.
 * @param {Event} event - Событие отправки формы.
 */
function finalValidation(event) {
    // 1. Предотвращаем стандартную отправку формы по умолчанию
    event.preventDefault(); 
    
    const formMessage = document.getElementById('form-message');
    let allValid = true;

    // 2. Проверяем каждое поле и обновляем состояние (для вывода красных рамок)
    for (const fieldId in validationRules) {
        // Вызываем функцию проверки поля для отображения итогового статуса
        if (!validateField(fieldId)) {
            allValid = false;
        }
    }
    
    // 3. Вывод результата
    formMessage.textContent = ''; 

    if (allValid) {
        // Успех
        formMessage.textContent = "Transmission successful! Data uploaded to the main grid. We will respond within 24 standard rotations.";
        formMessage.style.color = '#00FF00'; // Green Neon
        
        // Очищаем форму и зеленые рамки после успешной отправки
        document.getElementById('contactForm').reset(); 
        for (const fieldId in validationRules) {
            document.getElementById(fieldId).classList.remove('is-valid');
        }
        
    } else {
        // Ошибка
        formMessage.textContent = "ERROR: Failed to establish secure uplink. Please check highlighted fields.";
        formMessage.style.color = '#FF0000'; // Red Error Neon
    }
}

// Привязка функции итоговой валидации к событию 'submit' формы
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Меняем привязку на finalValidation, которая проверяет все поля
        contactForm.addEventListener('submit', finalValidation);
    }
});