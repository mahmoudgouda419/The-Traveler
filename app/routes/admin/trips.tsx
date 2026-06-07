import {Header} from "../../../components";

const Trips = () => {
    return (
        <main className="all-users wrapper">
            <Header
                title="Trips"
                description="View and Edit AI-Generated Travel Trips"
                ctaText={"Create Trips"}
                ctaUrl = "/trips/create"
            />
        </main>
    )
}
export default Trips
