let ActionButton = document.getElementById("generate-btn");
ActionButton.addEventListener("click", () => {
    let InputData = document.getElementById("qr-input");
    let Input = InputData.value.trim();

    if (Input === "") {
        alert("Please add text or link");
        return;
    }

    async function QRImageGenerator() {
        try {
            let apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(Input)}`;
            document.getElementById("qr-image").src = apiUrl;
            let downloadLink = document.getElementById("download-link");
            downloadLink.href = apiUrl;                
            downloadLink.setAttribute("download", "qr.png");
            Input="";
        } catch (error) {
            console.error("Error generating QR:", error);
        }
    }

    QRImageGenerator();
});