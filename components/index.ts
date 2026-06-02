import {formatDate} from "../lib/utils";

export {default as NavItems} from './NavItems'
export {default as MobileSidebar} from './MobileSidebar'
export {default as StatsCard} from './StatsCard'
export {default as TripCard} from './TripCard'
export { default as Header } from './Header'

export const user = {name: 'Mahmoud'}
export const dashboardStats = {
    totalUsers: 12450,
    usersJoined: {currentMonth: 318, lastMonth: 276},
    totalTrips: 3210,
    tripsCreated: {currentMonth: 150, lastMonth: 250},
    userRole: {total: 62, currentMonth: 200, lastMonth: 150}

}

export const allTrips = [{
    id: 1,
    name: "Tropical Rewind",
    imageUrls: ["/assets/images/sample1.jpg"],
    itinerary: [{ location: "Thailand" }],
    tags: ["Adventure", "Culture"],
    travelStyle: "Solo",
    estimatedPrice: "$1,000",
},
    {
        id: 2,
        name: "French Reverie",
        imageUrls: ["/assets/images/sample2.jpg"],
        itinerary: [{ location: "Paris" }],
        tags: ["Relaxation", "Culinary"],
        travelStyle: "Family",
        estimatedPrice: "$2,000",
    },
    {
        id: 3,
        name: "Zen Break",
        imageUrls: ["/assets/images/sample3.jpg"],
        itinerary: [{ location: "Japan" }],
        tags: ["Shopping", "Luxury"],
        travelStyle: "Couple",
        estimatedPrice: "$3,000",
    },
    {
        id: 4,
        name: "Adventure in Westeros",
        imageUrls: ["/assets/images/sample4.jpg"],
        itinerary: [{ location: "Croatia" }],
        tags: ["Historical", "Culture"],
        travelStyle: "Friends",
        estimatedPrice: "$4,000",
    },
];

export const users = [
    {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        imageUrl: "/assets/images/david.webp",
        dateJoined: formatDate("2025-01-01"),
        itineraryCreated: 10,
        status: "user",
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        imageUrl: "/assets/images/david.webp",
        dateJoined: formatDate("2025-01-02"),
        itineraryCreated: 4,
        status: "user",
    },
    {
        id: 3,
        name: "John Smith",
        email: "john.smith@example.com",
        imageUrl: "/assets/images/david.webp",
        dateJoined: formatDate("2025-01-03"),
        itineraryCreated: 8,
        status: "admin",
    },
];