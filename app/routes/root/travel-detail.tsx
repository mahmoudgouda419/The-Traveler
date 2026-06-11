import TripDetail, { loader } from "../admin/trip-detail";

export { loader };

export default function TravelDetail(props: any) {
    return (
        <div className="pt-24">
            <TripDetail {...props} />
        </div>
    );
}