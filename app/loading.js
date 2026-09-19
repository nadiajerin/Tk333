const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full">
            {/* Loading Spinner / Arrow */}
            {/* <div className="relative">
                <div className="w-12 h-12 border-4 border-gray-200 border-t-[#DB4444] rounded-full animate-spin"></div>
            </div> */}
            
            <img src="https://i.ibb.co.com/L38WTxz/banner.jpg" alt="" className="w-full min-h-screen"/>


            {/* Loading Text (ঐচ্ছিক) */}
            {/* <p className="mt-4 text-gray-600 font-medium animate-pulse">
                Loading...
            </p> */}
        </div>
    );
};

export default Loading;