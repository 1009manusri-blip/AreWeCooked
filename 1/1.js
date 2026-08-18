document.addEventListener("DOMContentLoaded", () => {

    const pageKey = "arewecooked_1_1";

    /* ===============================
       THEORY CARDS
    =============================== */

    const carousel = document.querySelector("#theoryCarousel");
    const cards = document.querySelectorAll(".theory-card");

    const prevBtn = document.querySelector("#prevCard");
    const nextBtn = document.querySelector("#nextCard");

    const dots = document.querySelectorAll(".card-dot");
    const tocItems = document.querySelectorAll(".toc-item");

    const currentCardText = document.querySelector("#currentCard");
    const totalCardsText = document.querySelector("#totalCards");

    let currentCard = 0;

    if (totalCardsText) {
        totalCardsText.textContent = cards.length;
    }


    function goToCard(index) {

        if (!cards.length) return;

        index = Math.max(0, Math.min(index, cards.length - 1));

        currentCard = index;

        const card = cards[currentCard];

        card.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center"
        });

        updateNavigation();
    }


    function updateNavigation() {

        if (currentCardText) {
            currentCardText.textContent = currentCard + 1;
        }

        if (prevBtn) {
            prevBtn.disabled = currentCard === 0;
        }

        if (nextBtn) {
            nextBtn.disabled =
                currentCard === cards.length - 1;
        }

        dots.forEach((dot, index) => {
            dot.classList.toggle(
                "active",
                index === currentCard
            );
        });

        tocItems.forEach((item, index) => {
            item.classList.toggle(
                "active",
                index === currentCard
            );
        });
    }


    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            goToCard(currentCard - 1);
        });
    }


    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            goToCard(currentCard + 1);
        });
    }


    dots.forEach((dot) => {

        dot.addEventListener("click", () => {

            const index =
                Number(dot.dataset.card);

            goToCard(index);

        });

    });


    tocItems.forEach((item) => {

        item.addEventListener("click", () => {

            const index =
                Number(item.dataset.card);

            goToCard(index);

        });

    });


    /* ===============================
       KEYBOARD NAVIGATION
    =============================== */

    document.addEventListener("keydown", (event) => {

        const active =
            document.activeElement;

        if (
            active &&
            (
                active.tagName === "INPUT" ||
                active.tagName === "TEXTAREA"
            )
        ) {
            return;
        }

        if (event.key === "ArrowRight") {
            goToCard(currentCard + 1);
        }

        if (event.key === "ArrowLeft") {
            goToCard(currentCard - 1);
        }

    });


    /* ===============================
       PROGRESS
    =============================== */

    const checkboxes =
        document.querySelectorAll(".concept-checkbox");

    const progressText =
        document.querySelector("#progressText");

    const progressPercentage =
        document.querySelector("#progressPercentage");

    const progressFill =
        document.querySelector("#progressFill");


    function updateProgress() {

        const total = checkboxes.length;

        const completed =
            [...checkboxes].filter(
                checkbox => checkbox.checked
            ).length;

        const percentage =
            total === 0
                ? 0
                : Math.round((completed / total) * 100);


        if (progressText) {
            progressText.textContent =
                `${completed} / ${total} completed`;
        }

        if (progressPercentage) {
            progressPercentage.textContent =
                `${percentage}%`;
        }

        if (progressFill) {
            progressFill.style.width =
                `${percentage}%`;
        }


        checkboxes.forEach((checkbox, index) => {

            localStorage.setItem(
                `${pageKey}_check_${index}`,
                checkbox.checked
            );

        });

    }


    checkboxes.forEach((checkbox, index) => {

        const saved =
            localStorage.getItem(
                `${pageKey}_check_${index}`
            );

        checkbox.checked =
            saved === "true";

        checkbox.addEventListener(
            "change",
            updateProgress
        );

    });

    updateProgress();


    /* ===============================
       BOOKMARKS
    =============================== */

    const bookmarkButtons =
        document.querySelectorAll(".bookmark-btn");


    bookmarkButtons.forEach((button, index) => {

        const saved =
            localStorage.getItem(
                `${pageKey}_bookmark_${index}`
            );

        if (saved === "true") {
            button.classList.add("bookmarked");
        }


        button.addEventListener("click", () => {

            const active =
                button.classList.toggle("bookmarked");

            localStorage.setItem(
                `${pageKey}_bookmark_${index}`,
                active
            );

        });

    });


    /* ===============================
       NOTES
    =============================== */

    const noteButtons =
        document.querySelectorAll(".notes-toggle");

    const noteAreas =
        document.querySelectorAll(".concept-notes");


    noteButtons.forEach((button, index) => {

        button.addEventListener("click", () => {

            const textarea = noteAreas[index];

            if (!textarea) return;

            textarea.classList.toggle("show");

            if (textarea.classList.contains("show")) {
                textarea.focus();
            }

        });

    });


    noteAreas.forEach((textarea) => {

        const key =
            textarea.dataset.notes;

        if (!key) return;

        const saved =
            localStorage.getItem(
                `${pageKey}_note_${key}`
            );

        if (saved) {
            textarea.value = saved;
        }


        textarea.addEventListener("input", () => {

            localStorage.setItem(
                `${pageKey}_note_${key}`,
                textarea.value
            );

        });

    });


    /* ===============================
       LANGUAGE SELECTOR
    =============================== */

    const languageButtons =
        document.querySelectorAll(".language-btn");

    const codeExamples =
        document.querySelectorAll(".code-example[data-code-language]");


    languageButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const language =
                button.dataset.language;


            languageButtons.forEach((btn) => {
                btn.classList.remove("active");
            });

            button.classList.add("active");


            codeExamples.forEach((example) => {

                example.classList.toggle(
                    "active",
                    example.dataset.codeLanguage === language
                );

            });

        });

    });


    /* ===============================
       COPY CODE
    =============================== */

    const copyButtons =
        document.querySelectorAll(".copy-code");


    copyButtons.forEach((button) => {

        button.addEventListener("click", async () => {

            const targetId =
                button.dataset.copyTarget;

            const target =
                document.getElementById(targetId);

            if (!target) return;


            try {

                await navigator.clipboard.writeText(
                    target.innerText
                );

                const oldText =
                    button.textContent;

                button.textContent =
                    "✓ Copied!";

                setTimeout(() => {
                    button.textContent = oldText;
                }, 1200);

            } catch (error) {

                console.error(
                    "Copy failed:",
                    error
                );

            }

        });

    });


    /* ===============================
       SEARCH
    =============================== */

    const search =
        document.querySelector("#conceptSearch");


    if (search) {

        search.addEventListener("input", () => {

            const query =
                search.value.toLowerCase().trim();


            cards.forEach((card) => {

                const searchable =
                    (
                        card.dataset.search || ""
                    ).toLowerCase();

                const match =
                    searchable.includes(query);

                card.style.display =
                    match ? "" : "none";

            });

        });

    }


    /* ===============================
       TABLE OF CONTENTS
    =============================== */

    const tocToggle =
        document.querySelector("#tocToggle");

    const tocPanel =
        document.querySelector("#tocPanel");

    const closeToc =
        document.querySelector("#closeToc");


    if (tocToggle && tocPanel) {

        tocToggle.addEventListener("click", () => {

            tocPanel.classList.toggle("open");

        });

    }


    if (closeToc && tocPanel) {

        closeToc.addEventListener("click", () => {

            tocPanel.classList.remove("open");

        });

    }


    /* ===============================
       CONTINUE LEARNING
    =============================== */

    const continueBtn =
        document.querySelector("#continueBtn");


    if (continueBtn) {

        continueBtn.addEventListener("click", () => {

            goToCard(currentCard);

        });

    }


    /* ===============================
       RESET PROGRESS
    =============================== */

    const resetBtn =
        document.querySelector("#resetProgress");


    if (resetBtn) {

        resetBtn.addEventListener("click", () => {

            if (
                !confirm(
                    "Reset all learning progress, bookmarks and notes?"
                )
            ) {
                return;
            }


            Object.keys(localStorage)
                .filter(key =>
                    key.startsWith(pageKey)
                )
                .forEach(key => {
                    localStorage.removeItem(key);
                });


            location.reload();

        });

    }


    /* ===============================
       INITIAL STATE
    =============================== */

    updateNavigation();

});