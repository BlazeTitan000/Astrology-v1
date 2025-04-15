import React from "react";
import GuideCard from "./GuideCard";

const PlanetsGuideSection: React.FC = () => {
    const guides = [
        {
            id: 1,
            title: "Planets in your birth chart",
            description:
                "These represent your core drives and energies.\nEach planet symbolizes a different aspect of\nyour psyche and life experience, from your\nidentity and emotions to your ambition and\ngrowth.",
            icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/7afcb605f17b327e9e8e922d264ae2a038966388?placeholderIfAbsent=true",
        },
        {
            id: 2,
            title: "Signs in your birth chart",
            description:
                "The zodiac signs show the style and quality of expression for each planet. They reveal how you embody and express the planetary\nenergies in your unique way.",
            icon: "/group.png",
        },
        {
            id: 3,
            title: "Houses in your birth chart",
            description:
                "The houses in your birth chart represent the\ndifferent areas of life where you focus your\nenergy and attention. They highlight the\nspecific arenas where your planetary energies and sign qualities play out.",
            icon: "/group-1.png",
        },
        {
            id: 4,
            title: "Aspects formed in your birth chart",
            description:
                "Aspects are the relationships and interactions between the planets in your chart. They create patterns of harmony (supporting your natural talents) or challenge (indicating areas for growth and development).",
            icon: "/group-2.png",
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
