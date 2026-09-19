import Marquee from "react-fast-marquee";
import { GrAnnounce } from "react-icons/gr";

export const TopMarquee = () => {
    return (
        <div className="w-full mx-auto">
            <div className="mt-4 max-sm:mt-1 bg-[#1b1b1b] flex items-center justify-between 
            gap-2 py-2 max-sm:py-1 max-sm:px-2 px-4 text-[#ffab49] 
            shadow-md shadow-gray-900 max-sm:text-sm">
               <GrAnnounce className="text-yellow-500 text-xl"/>
                <Marquee >
                    যেকোনো ধরণের সাইট বানাতে যোগাযোগ করুন: ০১৭৭৮২২৯৬৯২ 🎉 
                </Marquee>
            </div>
        </div>
    )
}
