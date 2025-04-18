import React from "react";
import GuideCard from "./GuideCard";

const PlanetsGuideSection: React.FC = () => {
    const guides = [
        {
            id: 1,
            title: "🔭 Planets in your chart",
            description:
                "Each planet reflects a different part of your personality—like how you love, think, act, or grow. Together, they shape your inner world and what drives you.\n\nYour birth chart includes the sun, moon, and all major planets, each with a specific role.",
            // icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/7afcb605f17b327e9e8e922d264ae2a038966388?placeholderIfAbsent=true",
        },
        {
            id: 2,
            title: "🌌 Signs in your chart",
            description:
                "The zodiac signs give each planet its tone. They describe how you express your energy—bold, emotional, calm, curious—your unique style.\n\nThey show how you act, not what you do, adding color to every part of your chart.",
            // icon: "/group.png",
        },
        {
            id: 3,
            title: "🏠 Houses in your chart",
            description:
                "Houses show where your energy flows: love, career, family, or creativity. They reveal which life areas matter most and where you seek meaning.\n\nEach house links to a specific area of life, like relationships, work, or personal growth.",
            // icon: "/group-1.png",
        },
        {
            id: 4,
            title: "🌟 Aspects in your chart",
            description:
                "Aspects are the connections between planets. They reveal your natural talents, inner conflicts, and potential for growth or balance.\n\nThey influence how easily your inner energies work together—or sometimes clash.",
            // icon: "/group-2.png",
        },
    ];

    return (
        <div className="bg-[rgba(0,0,0,0)]  w-5/6 mx-auto " id="how-to-work">
            <div className="bg-[rgba(0,0,0,0)] flex w-full flex-col items-stretch pb-[15px] w-5/6 mx-auto">
                <h2 className="text-white lg:text-4xl text-2xl font-normal leading-none text-center self-center font-libre-bodoni">
                    Planets & Signs Guide
                </h2>

                <div className="bg-[rgba(0,0,0,0)] mt-14 ">
                    <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
                        <div className="w-6/12 max-md:w-full max-md:ml-0">
                            <GuideCard
                                title={guides[0].title}
                                description={guides[0].description}
                                icon={guides[0].icon}
                            />
                        </div>
                        <div className="w-6/12 ml-5 max-md:w-full max-md:ml-0">
                            <GuideCard
                                title={guides[1].title}
                                description={guides[1].description}
                                icon={guides[1].icon}
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-[rgba(0,0,0,0)] mt-[59px] max-md:max-w-full max-md:mt-10">
                    <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
                        <div className="w-6/12 max-md:w-full max-md:ml-0">
                            <GuideCard
                                title={guides[2].title}
                                description={guides[2].description}
                                icon={guides[2].icon}
                            />
                        </div>
                        <div className="w-6/12 ml-5 max-md:w-full max-md:ml-0">
                            <GuideCard
                                title={guides[3].title}
                                description={guides[3].description}
                                icon={guides[3].icon}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlanetsGuideSection;
