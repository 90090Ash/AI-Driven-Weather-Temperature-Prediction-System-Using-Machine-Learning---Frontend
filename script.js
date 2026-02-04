async function predictTemperature() {
    const humidity = humidityInput = document.getElementById("humidity").value;
    const wind = document.getElementById("wind").value;
    const pressure = document.getElementById("pressure").value;

    if (!humidity || !wind || !pressure) {
        alert("Please fill all fields");
        return;
    }

    document.getElementById("loader").style.display = "block";
    document.getElementById("result").style.display = "none";
    document.getElementById("predictBtn").disabled = true;

    // ⏳ 5 second futuristic delay
    setTimeout(async () => {
        try {
            const response = await fetch("https://ai-driven-weather-temperature-prediction.onrender.com/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    humidity: Number(humidity),
                    wind_speed: Number(wind),
                    meanpressure: Number(pressure)
                })
            });

            const data = await response.json();

            document.getElementById("loader").style.display = "none";
            document.getElementById("result").style.display = "block";
            document.getElementById("predictBtn").disabled = false;

            document.getElementById("result").innerHTML =
                `🌡️ Predicted Temperature: <b>${data.predicted_temperature} °C</b>`;

        } catch (error) {
            alert("❌ Error connecting to AI server");
            document.getElementById("loader").style.display = "none";
            document.getElementById("predictBtn").disabled = false;
        }
    }, 5000);
}