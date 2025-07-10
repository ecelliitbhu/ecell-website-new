import { useDispatch, useSelector } from 'react-redux';
import { closeDialog } from '@/lib/redux/slices/GlobalDialogWrapperSlice';
import toast from 'react-hot-toast';

export default function Referral() {
    const dispatch = useDispatch();
    const referralCodes = useSelector(state => {
        // console.log(state.campusAmbassador.user);
        return state.campusAmbassador.referralCodes;
    });

    const handleCopy = (code) => {
        navigator.clipboard.writeText(code);
        toast.success("Referral code copied to clipboard!", {
            position: "bottom-right",
        });
    };

    return (
        <div className="p-8 max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
                Your Referral Codes
            </h2>
            <div
                className="flex flex-col gap-6 overflow-y-auto max-h-96"
                style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(156, 163, 175, 0.6) rgba(229, 231, 235, 1)' }}
            >
                {Object.entries(referralCodes).map(([competition, code]) => (
                    <div 
                        key={competition} 
                        className="flex justify-between items-center border border-gray-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-gray-50 gap-4"
                    >
                        <span className="text-xl font-medium text-gray-700">
                            {competition}
                        </span>
                        <div className="flex items-center">
                            <span 
                                className="border border-gray-300 bg-gray-100 text-gray-800 px-4 py-2 rounded-lg flex items-center cursor-pointer text-base font-mono"
                                onClick={() => handleCopy(code)}
                            >
                                {code}
                                <span className="ml-3 text-gray-500">
                                <img 
                                    src="https://ik.imagekit.io/ecelliitbhu/website/copy.png" 
                                    alt="Copy" 
                                    className="ml-3 w-5 h-5 sm:w-3 sm:h-3" 
                                />
                                </span>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            {/* <button  */}
                {/* onClick={() => dispatch(closeDialog())}  */}
                {/* className="mt-8 w-full px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow hover:bg-blue-700 transition-colors" */}
            {/* > */}
                {/* Close */}
            {/* </button> */}
        </div>
    );
}
