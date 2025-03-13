document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("letterModal");
    const letterCard = document.getElementById("letterCard");
    const openLetterBtn = document.getElementById("wishButton");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const audio = document.getElementById("backgroundMusic");

    // Open Letter Modal
    openLetterBtn.addEventListener("click", openModal);

    // Close Letter Modal
    closeModalBtn.addEventListener("click", closeModal);

    function openModal() {
        modal.style.display = "flex";
        letterCard.innerHTML = ""; // Reset previous content
        audio.play(); // Start music again

        // Text display hone ke baad WhatsApp button add hoga
        setTimeout(() => {
            typeWriter(letterCard, getMessage(), 0, addWhatsAppButton);
        }, 100);

        gsap.from(".modal-content", {
            scale: 0.8,
            opacity: 0,
            duration: 0.3,
            ease: "power3.out",
        });
    }

    function closeModal() {
        audio.pause(); // Stop music when modal is closed
        audio.currentTime = 0; // Reset music to start

        gsap.to(".modal-content", {
            scale: 0.8,
            opacity: 0,
            duration: 0.3,
            ease: "power3.in",
            onComplete: () => {
                modal.style.display = "none";
                letterCard.innerHTML = ""; // Reset text properly
            }
        });
    }

    function typeWriter(element, text, index, callback) {
        if (index < text.length) {
            if (text.charAt(index) === "<") {
                let endIndex = text.indexOf(">", index);
                element.innerHTML += text.substring(index, endIndex + 1);
                index = endIndex + 1;
            } else {
                const span = document.createElement("span");
                span.textContent = text.charAt(index);
                element.appendChild(span);
                index++;
            }

            setTimeout(() => typeWriter(element, text, index, callback), 50);
        } else if (callback) {
            setTimeout(callback, 500);
        }
    }

    function addWhatsAppButton() {
        // Ensure button is not duplicated
        if (!document.querySelector(".whatsapp-button")) {
            const whatsappButton = document.createElement("button");
            whatsappButton.textContent = "Send WhatsApp Message";
            whatsappButton.className = "gallery-button whatsapp-button"; // Reusing the style

            // WhatsApp link with a custom message
            const phoneNumber = "YOUR_PHONE_NUMBER"; // <-- Apna number dalna
            const message = encodeURIComponent("");
            whatsappButton.onclick = () => window.open(`https://wa.me/${+919336784076}?text=${message}`, "_blank");

            letterCard.appendChild(document.createElement("br"));
            letterCard.appendChild(whatsappButton);

            gsap.from(whatsappButton, {
                y: 50,
                opacity: 0,
                duration: 0.5,
                ease: "power3.out",
            });
        }
    }

    function getMessage() {
        return `गुलाल उड़ाए हवा में, बहार आई है,<br>
खुशबू लिए फिज़ा में, बहार आई है।<br><br>

सजने लगे हैं रंग में गली-मोहल्ले,<br>
होली की आज महकती बहार आई है।<br><br>

<b>"होली की ढेरों शुभकामनाएँ!" 🎉💖 </b>`;
    }
});
