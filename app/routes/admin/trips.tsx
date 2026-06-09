import { Header, TripCard } from "../../../components";
import { type LoaderFunctionArgs, useSearchParams } from "react-router";
import { getAllTrips } from "~/appwrite/trips";
import { parseTripData } from "../../../lib/utils";
import type { Route } from './+types/trips'
import { PagerComponent } from "@syncfusion/ej2-react-grids";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const limit = 8;
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || "1", 10);
    const offset = (page - 1) * limit;

    const { allTrips, total } = await getAllTrips(limit, offset);

    return {
        trips: allTrips.map((trip) => {
            const parsedData = parseTripData(trip.tripDetail) || {};

            return {
                id: trip.$id,
                ...parsedData,
                imageUrls: trip.imageUrls ?? []
            }
        }),
        total
    }
}

const Trips = ({ loaderData }: Route.ComponentProps) => {
    const trips = loaderData.trips || [];

    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = Number(searchParams.get('page') || '1');

    const handlePageChange = (page: number) => {
        setSearchParams((prev) => {
            prev.set('page', String(page));
            return prev;
        });
    }

    return (
        <main className="all-users wrapper">
            <Header
                title="Trips"
                description="View and edit AI-generated travel plans"
                ctaText="Create a trip"
                ctaUrl="/trips/create"
            />

            <section>
                <h1 className="p-24-semibold text-dark-100 mb-4">
                    Manage Created Trips
                </h1>

                <div className="trip-grid mb-4">
                    {trips.map((trip: any) => (
                        <TripCard
                            key={trip.id}
                            id={trip.id}
                            name={trip.name || "AI Travel Plan"}
                            imageUrl={trip.imageUrls?.[0]}
                            location={trip.itinerary?.[0]?.location ?? trip.destination ?? ""}
                            tags={[trip.interests, trip.travelStyle].filter(Boolean)}
                            price={trip.estimatedPrice || "TBD"}
                        />
                    ))}
                </div>

                <PagerComponent
                    totalRecordsCount={loaderData.total}
                    pageSize={8}
                    currentPage={currentPage}
                    click={(args) => handlePageChange(args.currentPage)}
                    cssClass="!mb-4"
                />
            </section>
        </main>
    )
}
export default Trips


