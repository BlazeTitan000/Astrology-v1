import React from "react";

interface GuideCardProps {
    title: string;
    description: string;
    icon?: string;
}

const GuideCard: React.FC<GuideCardProps> = ({ title, description, icon }) => {
    return (
        <div className="bg-[rgba(28,28,58,1)] grow text-2xl font-normal w-full px-[23px] py-[27px] rounded-xl max-md:max-w-full max-md:mt-10 max-md:px-5">
            <div className="bg-[rgba(0,0,0,0)] w-full max-w-full text-white pb-[7px]">
                <div className="bg-[rgba(0,0,0,0)] flex items-center px-[21px] py-[5px] ">
                    {icon && (
                        <img
                            src={icon}
                            alt="Icon"
                            className="aspect-[1] object-contain w-[30px] z-10 shrink-0 mr-4 "
                        />
                    )}
                    <h3 className="text-[1.2rem] font-libre-bodoni">{title}</h3>
                </div>
            </div>
            <div className="bg-[rgba(0,0,0,0)] text-gray-300 mt-[33px] px-px max-md:max-w-full">
                <p className="text-sm font-playfair">{description}</p>
            </div>
        </div>
    );
};

export default GuideCard;