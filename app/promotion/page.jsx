import BottomNavMenu from "../shared/BottomNavMenu"
import Navbar from "../shared/Navbar"
import SocialSideVar from "../shared/SocialSideVar"


const page = () => {

    const img = [
        "https://images.6223027.com/mcs-images/announcement/we999bdtf5/2923397_1771170034415.png",
        "https://images.6223027.com/mcs-images/announcement/we999bdtf5/2923396_1763135182979.png",
        "https://images.6223027.com/mcs-images/announcement/we999bdtf5/2923397_1770575763763.png",
        "https://images.6223027.com/mcs-images/announcement/we999bdtf5/2921117_1754220137454.png",
        "https://images.6223027.com/mcs-images/announcement/we999bdtf5/2923397_1770573544167.png",
        "https://images.6223027.com/mcs-images/announcement/we999bdtf5/2923397_1770577659475.png"
    ]

    return (
        <div className="">
            <Navbar />
            <div className="mx-auto py-4 lg:hidden __container bg-[#1b1b1b] py-6">
                <p className="text-[#ffb44d] font-bold text-xl">অফার</p>
                {img.map((url, index) => (
                    <div className="relative my-4">
                        <img
                            src={url}
                            alt={`Image ${index}`}
                            className="w-full h-40 object-cover rounded-xl shadow-lg"
                        />
                    </div>
                ))}
            </div>
            <BottomNavMenu />
            <SocialSideVar />
        </div>
    )
}

export default page