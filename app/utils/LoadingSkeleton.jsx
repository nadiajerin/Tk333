import React from 'react';

const LoadingSkeleton = () => {
    // Mobile-e horizontal scroll dekhate dummy array
    const skeletonCards = Array(3).fill(0);

    return (
        <div className="flex  gap-3 pb-4 scrollbar-hide lg:hidden">
            {skeletonCards.map((_, index) => (
                <div 
                    key={index} 
                    className="min-w-[100px] max-w-[100px] mx-auto rounded-xl overflow-hidden bg-[#1b1b1b] border border-white/5 shadow-lg flex-shrink-0"
                >
                    {/* Game Image Area with Spinner */}
                    <div className="w-full aspect-[3/4] bg-white/10 relative flex items-center justify-center">
                        
                        {/* Custom CSS Spinner - jeta ghurbe */}
                        <div className="w-10 h-10 border-2 border-white/10 border-t-[#f0b400] rounded-full animate-spin"></div>
                        
                    </div>
                </div>
            ))}
        </div>
    );
};


export default LoadingSkeleton;