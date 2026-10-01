const characters = [

    {
        name: "Batman",
        type: "hero",
        role: "O Cavaleiro das Trevas",
        image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Batman%20and%20Robin%201966.JPG",
        description:
            "Bruce Wayne utiliza investigação, preparação física, tecnologia e estratégia para combater o crime em Gotham.",
        tags: ["Bruce Wayne", "Detetive", "Gotham"]
    },

    {
        name: "Robin",
        type: "hero",
        role: "Parceiro do Batman",
        image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Burt%20Ward%20Robin.jpg",
        description:
            "Robin é uma identidade usada por diferentes parceiros do Batman. Dick Grayson foi o primeiro Robin.",
        tags: ["Dick Grayson", "Aliado", "Bat-Família"]
    },

    {
        name: "Batgirl",
        type: "hero",
        role: "Vigilante de Gotham",
        image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Yvonne%20Craig%20as%20Batgirl%20in%20%22Batman%22%201968%20press%20photo.jpg",
        description:
            "Barbara Gordon é uma das personagens mais conhecidas a utilizar a identidade Batgirl.",
        tags: ["Barbara Gordon", "Oracle", "Gotham"]
    },

    {
        name: "Coringa",
        type: "villain",
        role: "Arqui-inimigo",
        image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Cesar%20Romero%20-%20The%20Joker%201967%20(colored).png",
        description:
            "Um criminoso caótico e imprevisível que se tornou um dos principais adversários do Batman.",
        tags: ["Caos", "Crime", "Arqui-inimigo"]
    },

    {
        name: "Charada",
        type: "villain",
        role: "Mestre dos enigmas",
        image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Frank%20Gorshin%20Riddler%201967.jpg",
        description:
            "Edward Nygma utiliza enigmas e pistas para desafiar seus adversários.",
        tags: ["Edward Nygma", "Enigmas", "Intelecto"]
    },

    {
        name: "Pinguim",
        type: "villain",
        role: "Chefão do submundo",
        image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Burgess%20Meredith%20as%20the%20Penguin.jpg",
        description:
            "Oswald Cobblepot é tradicionalmente associado ao submundo criminoso de Gotham.",
        tags: ["Oswald Cobblepot", "Crime", "Gotham"]
    },

    {
        name: "Mulher-Gato",
        type: "villain",
        role: "Ladra e anti-heroína",
        image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Eartha%20Kitt%20Catwoman%20Batman%201967.JPG",
        description:
            "Selina Kyle possui uma relação complexa com Bruce Wayne e ocupa uma posição ambígua entre heroína e criminosa.",
        tags: ["Selina Kyle", "Anti-heroína", "Gotham"]
    },

    {
        name: "Duas-Caras",
        type: "villain",
        role: "Ex-promotor de Gotham",
        image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Two-Face%20and%20the%20Riddler.jpg",
        description:
            "Harvey Dent é marcado pela dualidade e pelo uso de uma moeda para tomar decisões.",
        tags: ["Harvey Dent", "Dualidade", "Gotham"]
    }

];


const characterContainer =
    document.getElementById("characters");

const search =
    document.getElementById("search");

const filters =
    document.querySelectorAll(".filter");


let currentFilter = "all";

let currentCharacter = null;


/* =========================
   FAVORITOS
========================= */

function getFavorites() {

    return JSON.parse(
        localStorage.getItem("gothamFavorites") || "[]"
    );

}


function saveFavorites(favorites) {

    localStorage.setItem(
        "gothamFavorites",
        JSON.stringify(favorites)
    );

}


/* =========================
   RENDER
========================= */

function renderCharacters() {

    const query =
        search.value.toLowerCase();

    const favorites =
        getFavorites();


    const filtered =
        characters.filter(character => {

            const matchesFilter =
                currentFilter === "all" ||
                character.type === currentFilter;

            const matchesSearch =
                character.name
                    .toLowerCase()
                    .includes(query);

            return matchesFilter && matchesSearch;

        });


    characterContainer.innerHTML =
        filtered.map(character => {

            const isFavorite =
                favorites.includes(character.name);

            return `

                <article
                    class="character"
                    data-name="${character.name}"
                >

                    <button
                        class="favorite-button"
                        data-favorite="${character.name}"
                    >
                        ${isFavorite ? "★" : "☆"}
                    </button>


                    <img
                        src="${character.image}"
                        alt="${character.name}"
                        loading="lazy"
                    >


                    <div class="character-info">

                        <small>
                            ${
                                character.type === "hero"
                                ? "ALIADO"
                                : "VILÃO"
                            }
                        </small>

                        <h3>
                            ${character.name}
                        </h3>

                        <p>
                            ${character.role}
                        </p>

                    </div>

                </article>

            `;

        }).join("");


    document
        .querySelectorAll(".character")
        .forEach(card => {

            card.addEventListener("click", event => {

                if (
                    event.target.closest(
                        ".favorite-button"
                    )
                ) {
                    return;
                }

                openCharacter(
                    card.dataset.name
                );

            });

        });


    document
        .querySelectorAll(".favorite-button")
        .forEach(button => {

            button.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    toggleFavorite(
                        button.dataset.favorite
                    );

                }
            );

        });

}


/* =========================
   FAVORITAR
========================= */

function toggleFavorite(name) {

    let favorites = getFavorites();

    if (favorites.includes(name)) {

        favorites =
            favorites.filter(
                item => item !== name
            );

    } else {

        favorites.push(name);

    }

    saveFavorites(favorites);

    renderCharacters();

}


/* =========================
   MODAL
========================= */

function openCharacter(name) {

    currentCharacter =
        characters.find(
            character => character.name === name
        );


    document.getElementById("modalImage").src =
        currentCharacter.image;

    document.getElementById("modalImage").alt =
        currentCharacter.name;


    document.getElementById("modalName").textContent =
        currentCharacter.name;


    document.getElementById("modalDescription").textContent =
        currentCharacter.description;


    document.getElementById("modalType").textContent =
        currentCharacter.type === "hero"
        ? "ARQUIVO / ALIADO"
        : "ARQUIVO / VILÃO";


    document.getElementById("modalTags").innerHTML =
        currentCharacter.tags
            .map(tag => `<span>${tag}</span>`)
            .join("");


    const favorites =
        getFavorites();


    document.getElementById("favorite").textContent =
        favorites.includes(name)
        ? "★ REMOVER DOS FAVORITOS"
        : "☆ FAVORITAR";


    document
        .getElementById("modal")
        .classList.add("active");

}


function closeModal() {

    document
        .getElementById("modal")
        .classList.remove("active");

}


document
    .getElementById("closeModal")
    .addEventListener(
        "click",
        closeModal
    );


document
    .querySelector(".modal-background")
    .addEventListener(
        "click",
        closeModal
    );


document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeModal();

        }

    }
);


/* =========================
   PESQUISA
========================= */

search.addEventListener(
    "input",
    renderCharacters
);


/* =========================
   FILTROS
========================= */

filters.forEach(filter => {

    filter.addEventListener(
        "click",
        () => {

            filters.forEach(
                item =>
                    item.classList.remove("active")
            );

            filter.classList.add("active");

            currentFilter =
                filter.dataset.filter;

            renderCharacters();

        }
    );

});


/* =========================
   FAVORITO DO MODAL
========================= */

document
    .getElementById("favorite")
    .addEventListener(
        "click",
        () => {

            if (!currentCharacter) return;

            toggleFavorite(
                currentCharacter.name
            );

            openCharacter(
                currentCharacter.name
            );

        }
    );


/* =========================
   PERSONAGEM ALEATÓRIO
========================= */

document
    .getElementById("randomCharacter")
    .addEventListener(
        "click",
        () => {

            const random =
                characters[
                    Math.floor(
                        Math.random() *
                        characters.length
                    )
                ];

            openCharacter(random.name);

        }
    );


/* =========================
   TEMA
========================= */

document
    .getElementById("themeButton")
    .addEventListener(
        "click",
        () => {

            document.body.classList.toggle("light");

            const light =
                document.body.classList.contains(
                    "light"
                );

            localStorage.setItem(
                "gothamTheme",
                light ? "light" : "dark"
            );

        }
    );


if (
    localStorage.getItem("gothamTheme")
    === "light"
) {

    document.body.classList.add("light");

}


/* =========================
   FILMES
========================= */

const movieDescriptions = {

    "Batman (1989)":
        "Filme dirigido por Tim Burton, com Michael Keaton como Batman.",

    "Batman Begins":
        "Filme de 2005 dirigido por Christopher Nolan que explora a origem de Bruce Wayne como Batman.",

    "The Dark Knight":
        "Filme de 2008 dirigido por Christopher Nolan, apresentando o confronto entre Batman e o Coringa.",

    "The Batman":
        "Filme de 2022 dirigido por Matt Reeves e estrelado por Robert Pattinson."

};


document
    .querySelectorAll(".movie-card")
    .forEach(movie => {

        movie.addEventListener(
            "click",
            () => {

                const title =
                    movie.dataset.movie;

                alert(
                    `${title}\n\n` +
                    movieDescriptions[title]
                );

            }
        );

    });


/* =========================
   QUIZ
========================= */

document
    .querySelectorAll(".answers button")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const result =
                    document.getElementById(
                        "quizResult"
                    );


                if (
                    button.dataset.answer
                    === "correct"
                ) {

                    result.textContent =
                        "✓ CORRETO — Bruce Wayne.";

                } else {

                    result.textContent =
                        "✕ ERRADO — a resposta é Bruce Wayne.";

                }

            }
        );

    });


/* =========================
   LOADING
========================= */

window.addEventListener(
    "load",
    () => {

        setTimeout(
            () => {

                document
                    .getElementById("loading")
                    .classList.add("hidden");

            },
            2100
        );

    }
);


/* INICIALIZAÇÃO */

renderCharacters();