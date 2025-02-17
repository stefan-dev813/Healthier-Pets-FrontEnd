import darkLogo from "@/assets/logos/dark.svg";
import logo from "@/assets/logos/main.svg";
import Image from "next/image";

export function Logo() {
  return (
    // <div className="relative h-8 max-w-[10.847rem]">
    //   <Image
    //     src={logo}
    //     fill
    //     className="dark:hidden"
    //     alt="NextAdmin logo"
    //     role="presentation"
    //     quality={100}
    //   />

    //   <Image
    //     src={darkLogo}
    //     fill
    //     className="hidden dark:block"
    //     alt="NextAdmin logo"
    //     role="presentation"
    //     quality={100}
    //   />
    // </div>
    <div>
      <div 
        style={{fontSize:'30px', color:'black', fontWeight:'bold'}}
        className="dark:hidden"
      >
        <h1 style={{paddingLeft:'15px'}}>Healthier-Pets</h1>
      </div>

      <div 
        style={{fontSize:'30px', color:'white', fontWeight:'bold'}}
        className="hidden dark:block"
      >
        <h1 style={{paddingLeft:'15px'}}>Healthier-Pets</h1>
      </div>
    </div>
  );
}
