let input = document.getElementById("inp-word");
let finder = document.getElementById("search-btn");
let resultsDiv = document.getElementById("result");
let loader = document.getElementById("loader");

finder.addEventListener("click", fetchWordData);
input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        fetchWordData();
    }
});

async function fetchWordData() {
    let searchWord = input.value.trim();

    if (!searchWord) {
        resultsDiv.innerHTML = `<p class="error">Please enter a word.</p>`;
        resultsDiv.classList.add("show");
        return;
    }
    loader.classList.add("active");
    resultsDiv.classList.remove("show");
    resultsDiv.innerHTML = ""; 

    try {
        let API = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`);
        
        if (!API.ok) {
            
            throw new Error('Word not found or API error.');
        }

        let response = await API.json();
        console.log(response);

        let meaningsHtml = response[0].meanings.map(meaning => {
            const definitions = meaning.definitions.map(def => {
                let defText = `<p class="word-meaning">${def.definition}</p>`;
                if (def.example) {
                    defText += `<p class="word-example">${def.example}</p>`;
                }
                return defText;
            }).join(''); 

            return `
                <div class="meaning-section">
                    <div class="details">
                        <p>${meaning.partOfSpeech}</p>
                    </div>
                    ${definitions}
                </div>
            `;
        }).join('');

        resultsDiv.innerHTML = `
            <div class="word">
                <h3>${searchWord}</h3>
            </div>
            ${meaningsHtml}
        `;
        resultsDiv.classList.add("show"); 

    } catch (error) {
        console.error(error);
        resultsDiv.innerHTML = `<p class="error">Word not found or an error occurred.</p>`;
        resultsDiv.classList.add("show");
    } finally {
        loader.classList.remove("active");
    }
}