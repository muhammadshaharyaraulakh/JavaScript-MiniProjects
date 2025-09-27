
const votes = {
    option1: 0,
    option2: 0,
    option3: 0,
    option4: 0
};

const optionLabels = {
    option1: "JavaScript",
    option2: "Python",
    option3: "Java",
    option4: "C++"
};

let attempts = 0;
const maxAttempts = 10;

// DOM references
const voteBtn = document.getElementById('voteBtn');
const resultDiv = document.getElementById('result');

// Add click event listener
voteBtn.addEventListener('click', () => {
    if (attempts >= maxAttempts) {
        alert("You have reached the maximum number of voting attempts (10).");
        return;
    }

    const selected = document.querySelector('input[name="poll"]:checked');
    if (!selected) {
        alert("Please select an option before submitting.");
        return;
    }

    const selectedOption = selected.value;
    votes[selectedOption]++;
    attempts++;

    displayResults();

    // Disable button after max attempts
    if (attempts >= maxAttempts) {
        voteBtn.disabled = true;
        voteBtn.innerText = "Max Attempts Reached";
        voteBtn.style.backgroundColor = "#ccc";
        voteBtn.style.cursor = "not-allowed";
    }
});

function displayResults() {
    const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);
    resultDiv.innerHTML = '';

    if (totalVotes === 0) {
        resultDiv.innerHTML = '<p>No votes yet.</p>';
        return;
    }

    for (let key in votes) {
        const count = votes[key];
        const percentage = ((count / totalVotes) * 100).toFixed(1);

        const resultItem = document.createElement('div');
        resultItem.classList.add('option-result');

        resultItem.innerHTML = `
            <div class="option-text">${optionLabels[key]}</div>
            <div class="bar-container">
                <div class="bar" style="width: ${percentage}%"></div>
            </div>
            <div class="percentage">${percentage}%</div>
        `;

        resultDiv.appendChild(resultItem);
    }
}
