import { ReactNode } from "react";
import Image from "next/image";

interface sidebar{
      img: string,
      tab: string,
      heading: string,
      classList: string,
      changeState:()=>void
}
const SideBar = ({img,
      tab,
      heading,
      classList,
      changeState}:sidebar
  
) => {
      return (
            <div className={classList}>
                  {heading && (
                        <div className="font-semibold mb-3">
                              {heading}
                        </div>
                  )}
                  <div
                        onClick={changeState}
                        className="flex cursor-pointer items-center font-medium gap-x-3"
                  >
                        <Image src={img} alt={""} />
                        <div className="text-sm">{tab}</div>
                  </div>
            </div>
      );
};

export default SideBar;