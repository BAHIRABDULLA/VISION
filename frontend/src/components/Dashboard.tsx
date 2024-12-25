import { useSelector } from 'react-redux';
import { RootState } from "@/redux/store/store";


const Dashboard = () => {
    const role = useSelector((state: RootState) => state.menteeAuth.user?.role === 'mentee' ? 'mentee' : 'mentor')
    return (
        <div className="flex-1 mt-3 flex flex-col items-center justify-center text-white">
            <h2 className="text-2xl font-semibold">Welcome to the {role} dashboard</h2>
            <p className="mt-4 text-4xl text-center text-purple-500 font-bold">
                {role === 'mentor' ? 'Empower the Next Generation' : 'Gain Insights from Experts'}
            </p>
        </div>
    )
}

export default Dashboard