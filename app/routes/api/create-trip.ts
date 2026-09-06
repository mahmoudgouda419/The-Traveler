import {type ActionFunctionArgs, data} from "react-router";
import createTrip from "~/routes/admin/create-trip";
import Groq from "groq-sdk";
import {parseMarkdownToJson} from "../../../lib/utils";
import {appwriteConfig, database} from "~/appwrite/client";
import {ID} from "appwrite";


export const action = async ({request} : ActionFunctionArgs) => {
    const {
        country,
        numberOfDays,
        travelStyle,
        interests,
        budget,
        groupType,
        userId,
    } = await request.json();
    async function getImages(query: string) {
        const response = await fetch(
            `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=3&client_id=${unsplashApiKey}`
        );

        const data = await response.json();

        return data.results
            .map((img: any) => img.urls?.regular)
            .filter(Boolean);
    }
    const groq = new Groq({
        apiKey: process.env.GROQ_API_KEY!,
    });
    const unsplashApiKey = process.env.UNSPLASH_ACCESS_KEY!;

    try {
        const prompt = `Generate a ${numberOfDays}-day travel itinerary for ${country} based on the following user information:
            Budget: '${budget}'
            Interests: '${interests}'
            TravelStyle: '${travelStyle}'
            GroupType: '${groupType}'
            
            The itinerary MUST strongly prioritize the user's Interests.
            At least 70% of all activities must directly relate to the selected Interests.

            If the destination cannot realistically satisfy the selected Interests, choose the closest realistic alternative and clearly explain this in the trip description.

            Use only real cities, landmarks, attractions, museums, shopping centers, restaurants, hotels, beaches, parks, districts, and activities that actually exist.

            Do not invent businesses, venues, attractions, restaurants, hotels, shopping centers, or landmarks.

            If uncertain whether a place exists, choose a more famous and widely known alternative.

            Activities must match the selected Budget, Interests, TravelStyle, and GroupType.

            Avoid illegal, unavailable, culturally inappropriate, unsafe, or unrealistic activities.

            Keep the itinerary geographically efficient and avoid excessive travel between distant locations in a short trip.

            Before generating the final JSON:

            Activities unrelated to the selected Interests may be included only as secondary experiences and must not exceed 20% of the itinerary.

            Do not add beach, shopping, nightlife, cultural, water, or entertainment activities unless they directly support the selected Interests.
            
            Use specific attraction names whenever possible. Avoid generic descriptions such as:
            "enjoy the scenery",
            "experience local culture",
            "enjoy beautiful views",
            "relax and unwind",
            "visit a local restaurant",
            or similar vague descriptions.
            
            Always keep seasons in this exact order:
            Spring, Summer, Autumn, Winter.
            
            When planning each day, consider realistic travel times between locations and avoid placing distant attractions in the same day unless transportation is clearly feasible.


            
            Return the itinerary and lowest estimated price in a clean, non-markdown JSON format with the following structure,Return ONLY valid JSON. The response must start with { and end with }. Do not use markdown.:
            {
            "name": "A descriptive title for the trip",
            "description": "A brief description of the trip and its highlights not exceeding 100 words",
            "estimatedPrice": "Lowest average price for the trip in USD, e.g.$price",
            "duration": ${numberOfDays},
            "budget": "${budget}",
            "travelStyle": "${travelStyle}",
            "country": "${country}",
            "interests": "${interests}",
            "groupType": "${groupType}",
            "bestTimeToVisit": [
              '🌸 Season (from month to month): reason to visit',
              '☀️ Season (from month to month): reason to visit',
              '🍁 Season (from month to month): reason to visit',
              '❄️ Season (from month to month): reason to visit'
            ],
            "weatherInfo": [
              '☀️ Season: temperature range in Celsius (temperature range in Fahrenheit)',
              '🌦️ Season: temperature range in Celsius (temperature range in Fahrenheit)',
              '🌧️ Season: temperature range in Celsius (temperature range in Fahrenheit)',
              '❄️ Season: temperature range in Celsius (temperature range in Fahrenheit)'
            ],
            "location": {
              "city": "name of the city or region",
              "coordinates": [latitude, longitude],
              "openStreetMap": "link to open street map"
            },
            "itinerary": [
            {
              "day": 1,
              "location": "City/Region Name",
              "activities": [
                {"time": "Morning", "description": "🏰 Visit the local historic castle and enjoy a scenic walk"},
                {"time": "Afternoon", "description": "🖼️ Explore a famous art museum with a guided tour"},
                {"time": "Evening", "description": "🍷 Dine at a rooftop restaurant with local wine"}
              ]
            },
            ...
            ]
            }`;

        const completion = await groq.chat.completions.create({
            model: "openai/gpt-oss-120b",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.4,
        });

        const responseText =
            completion.choices[0]?.message?.content || "";


        let trip;

        try {
            trip = JSON.parse(responseText);
        } catch {
            trip = parseMarkdownToJson(responseText);
        }
        console.log(responseText);
        console.log(trip);

        // const trip = parseMarkdownToJson(textResult.response.text())
        let imageUrls = await getImages(`${country} ${interests} ${travelStyle}`);

        if (imageUrls.length < 3) {
            imageUrls = [
                ...imageUrls,
                ...(await getImages(`${country} ${interests}`)),
            ];
        }

        if (imageUrls.length < 3) {
            imageUrls = [
                ...imageUrls,
                ...(await getImages(country)),
            ];
        }
        imageUrls = [...new Set(imageUrls)].slice(0, 3);
        const tripDetail = JSON.stringify(trip);
        console.log("tripDetail length:", tripDetail.length);
        console.log("tripDetail preview:", tripDetail.slice(0, 500));

        const result = await database.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.tripCollectionId,
            ID.unique(),
            {
                tripDetail,
                createdAt: new Date().toISOString(),
                imageUrls,
                userId,
                payment_link: "https://example.com",
            }
        );

        console.log("saved result:", result);
        console.log("saved tripDetail:", result.tripDetail);
        //  const result = await database.createDocument(
        //      appwriteConfig.databaseId,
        //      appwriteConfig.tripCollectionId,
        //      ID.unique(),
        //      {
        //          tripDetail: "HELLO WORLD",
        //          createdAt: new Date().toISOString(),
        //          imageUrls,
        //          userId,
        //          payment_link: "https://example.com",
        //      }
        //  )
        return data({ id: result.$id })
    } catch (e) {
        console.error('error generating new trip', e);
    }
}