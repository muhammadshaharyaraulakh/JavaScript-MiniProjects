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

function cleanText(html) {
    if (!html) return "";

    let sanitized = html
        .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
        .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
        .replace(/<link\b[^>]*>/gi, "");

    if (typeof DOMParser !== "undefined") {
        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(sanitized, "text/html");
            doc.querySelectorAll("style, script, link, meta").forEach(el => el.remove());
            return (doc.body.textContent || "").replace(/\s+/g, " ").trim();
        } catch (e) {
        }
    }

    return sanitized
        .replace(/<[^>]+>/g, "")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, "\"")
        .replace(/&#39;/g, "'")
        .replace(/\s+/g, " ")
        .trim();
}

async function fetchDefinitions(word) {
    const term = word.toLowerCase();

    try {
        const res = await fetch(`https://en.wiktionary.org/api/rest_v1/page/definition/${encodeURIComponent(term)}`);
        if (res.ok) {
            const data = await res.json();
            const sections = data.en || [];
            if (sections.length > 0) {
                const parsed = sections.map(sec => ({
                    partOfSpeech: sec.partOfSpeech || "Definition",
                    definitions: (sec.definitions || [])
                        .map(d => ({
                            definition: cleanText(d.definition),
                            example: d.examples && d.examples.length > 0 ? cleanText(d.examples[0]) : ""
                        }))
                        .filter(d => d.definition && d.definition.length > 3)
                        .slice(0, 3)
                })).filter(s => s.definitions.length > 0);

                if (parsed.length > 0) return parsed;
            }
        }
    } catch (err) {
        console.warn("Wiktionary lookup failed, trying fallback:", err);
    }

    try {
        const dRes = await fetch(`https://api.datamuse.com/words?sp=${encodeURIComponent(term)}&md=d&max=1`);
        if (dRes.ok) {
            const dData = await dRes.json();
            if (dData.length > 0 && dData[0].defs && dData[0].defs.length > 0) {
                const posMap = { n: "Noun", v: "Verb", adj: "Adjective", adv: "Adverb", u: "General" };
                const grouped = {};

                dData[0].defs.slice(0, 5).forEach(raw => {
                    const parts = raw.split("\t");
                    const pos = posMap[parts[0]] || "Definition";
                    const def = (parts[1] || "").trim();
                    if (!grouped[pos]) grouped[pos] = [];
                    grouped[pos].push({ definition: def, example: "" });
                });

                return Object.entries(grouped).map(([partOfSpeech, definitions]) => ({
                    partOfSpeech,
                    definitions
                }));
            }
        }
    } catch (err) {
        console.warn("Datamuse fallback failed:", err);
    }

    return null;
}

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
        const meanings = await fetchDefinitions(searchWord);

        if (!meanings || meanings.length === 0) {
            throw new Error("Word not found.");
        }

        let meaningsHtml = meanings.map(meaning => {
            const definitions = meaning.definitions.map(def => {
                let defText = `<p class="word-meaning">${def.definition}</p>`;
                if (def.example) {
                    defText += `<p class="word-example">${def.example}</p>`;
                }
                return defText;
            }).join("");

            return `
                <div class="meaning-section">
                    <div class="details">
                        <p>${meaning.partOfSpeech}</p>
                    </div>
                    ${definitions}
                </div>
            `;
        }).join("");

        resultsDiv.innerHTML = `
            <div class="word">
                <h3>${searchWord}</h3>
                <button id="speak-btn" title="Pronounce word" style="background: none; border: none; font-size: 22px; color: #ae9cff; cursor: pointer;">
                    <i class="fas fa-volume-up"></i>
                </button>
            </div>
            ${meaningsHtml}
        `;
        resultsDiv.classList.add("show");

        const speakBtn = document.getElementById("speak-btn");
        if (speakBtn && "speechSynthesis" in window) {
            speakBtn.addEventListener("click", () => {
                const utterance = new SpeechSynthesisUtterance(searchWord);
                window.speechSynthesis.speak(utterance);
            });
        }

    } catch (error) {
        console.error(error);
        resultsDiv.innerHTML = `<p class="error">Word not found or could not load definition.</p>`;
        resultsDiv.classList.add("show");
    } finally {
        loader.classList.remove("active");
    }
}