import { useNavigate } from "react-router-dom";
import LeaderBoard from "./LeaderBord";
// import PremiumDetails from "./PremiumDetails";

const Premium = () => {
    const navigate = useNavigate();
    function handleReport(){
        navigate('/premium-card')
    }
    return (
        <div>
            <div className="mx-auto px-8 mt-8">
            <LeaderBoard/>
            </div>
            <div className="mt-8 p-4">
                <button
                className="fixed bottom-2 right-4 bg-yellow-500 text-black text-sm px-4 py-2 rounded-md"
                onClick={handleReport}
            >
                View & Download expense report
            </button>
            </div>
        </div>
    )
}

export default Premium;