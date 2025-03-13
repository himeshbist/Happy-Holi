document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("letterModal");
    const letterCard = document.getElementById("letterCard");
    const openLetterBtn = document.getElementById("wishButton");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const audio = document.getElementById("backgroundMusic");

    let wasPlaying = false; // Track if music was playing before tab switch

    if (!modal || !letterCard || !openLetterBtn || !closeModalBtn || !audio) {
        console.error("One or more required elements are missing.");
        return;
    }

    openLetterBtn.addEventListener("click", openModal);
    closeModalBtn.addEventListener("click", closeModal);

    // ✅ Stop & Resume music when user switches tab or minimizes screen
    document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
            wasPlaying = !audio.paused; // Store play state
            audio.pause();
        } else if (wasPlaying) {
            audio.play(); // Resume if it was playing before
        }
    });

    function openModal() {
        modal.style.display = "flex";
        letterCard.innerHTML = "";
        audio.currentTime = 0;
        audio.play();
        document.querySelector(".modal-content").style.display = "block";

        setTimeout(() => {
            typeWriter(letterCard, getMessage(), 0, addWhatsAppButton);
        }, 100);

        gsap.from(".modal-content", {
            scale: 0.8,
            opacity: 0,
            duration: 0.3,
            ease: "power3.out",
        });

        // ✅ Stop music when user clicks outside modal
        modal.addEventListener("click", function (event) {
            if (event.target === modal) {
                closeModal();
            }
        });
    }

    function closeModal() {
        audio.pause();
        audio.currentTime = 0;

        gsap.to(".modal-content", {
            scale: 0.8,
            opacity: 0,
            duration: 0.3,
            ease: "power3.in",
            onComplete: () => {
                modal.style.display = "none";
                letterCard.innerHTML = "";
                document.querySelector(".whatsapp-link")?.remove();
            }
        });
    }

    function typeWriter(element, text, index, callback) {
        element.innerHTML = "";
        function writeChar(i) {
            if (i < text.length) {
                if (text.charAt(i) === "<") {
                    let endIndex = text.indexOf(">", i);
                    element.innerHTML += text.substring(i, endIndex + 1);
                    i = endIndex + 1;
                } else {
                    const span = document.createElement("span");
                    span.textContent = text.charAt(i);
                    element.appendChild(span);
                    i++;
                }
                setTimeout(() => writeChar(i), 50);
            } else if (callback) {
                setTimeout(callback, 500);
            }
        }
        writeChar(0);
    }

    function addWhatsAppButton() {
        if (!document.querySelector(".whatsapp-link")) {
            const whatsappLink = document.createElement("a");
            whatsappLink.href = "https://wa.me/919455331645";
            whatsappLink.target = "_blank";
            whatsappLink.className = "whatsapp-link";
            whatsappLink.innerHTML = "Wish Me";

            letterCard.appendChild(document.createElement("br"));
            letterCard.appendChild(whatsappLink);

            gsap.from(whatsappLink, {
                y: 50,
                opacity: 0,
                duration: 0.5,
                ease: "power3.out",
            });
        }
    }

    function getMessage() {
        return `<span class="hindi-text">🌸 गुलाल उड़ाए हवा में, बहार आई है,<br>
खुशबू लिए फिज़ा में, बहार आई है।<br><br>
सजने लगे हैं रंग में गली-मोहल्ले,<br>
होली की आज महकती बहार आई है।<br><br>
<b>"होली की ढेरों शुभकामनाएँ!" 🎉💖 </b></span>`;
    }


    // ✅ Dynamic CSS Injection
    const style = document.createElement("style");
    style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari&display=swap');

        #letterModal {
            display: none;
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.6);
            justify-content: center;
            align-items: center;
        }
        .modal-content {
            background: #fff;
            padding: 20px;
            text-align: center;
            border-radius: 12px;
            width: 90%;
            max-width: 400px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            font-family: 'Noto Sans Devanagari', sans-serif;
        }
        .whatsapp-link {
            background: #25d366;
            color: white;
            text-decoration: none;
            padding: 12px 18px;
            font-size: 16px;
            font-weight: bold;
            border-radius: 8px;
            cursor: pointer;
            margin-top: 15px;
            display: inline-block;
            width: 100%;
            max-width: 250px;
            transition: all 0.3s ease;
        }
        .whatsapp-link:hover {
            background: #1ebe5d;
            transform: scale(1.05);
        }
        #closeModalBtn {
            color: red;
            border: none;
            padding: 1px 1px;
            font-size: 20px;
            font-weight: bold;
            border-radius: 6px;
            cursor: pointer;
            margin-top: 3px;
            transition: all 0.3s ease;
        }
        #closeModalBtn:hover {
            background: darkred;
        }
        .hindi-text {
            font-family: 'Noto Sans Devanagari', sans-serif;
            font-size: 18px;
            color: #333;
        }
    `;
    document.head.appendChild(style);
});
