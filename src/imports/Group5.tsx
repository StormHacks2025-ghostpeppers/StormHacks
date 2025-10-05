import imgChatGptImage20251041358322 from "figma:asset/4bd14b305a485c40b997d6a69ae5ae1bf3d58009.png";

function PatternButton() {
  return (
    <div className="absolute bg-[#769802] h-[65px] left-0 overflow-clip rounded-[100px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] top-0 w-[150px]" data-name="PatternButton">
      <p className="absolute font-['Fraunces:Regular',_sans-serif] font-normal leading-[18px] left-[46px] text-[20px] text-nowrap text-white top-[23px] tracking-[-0.5px] whitespace-pre" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
        Fridge
      </p>
    </div>
  );
}

function PatternButton1() {
  return (
    <div className="absolute bg-[#c62003] h-[65px] left-[176px] overflow-clip rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] top-0 w-[150px]" data-name="PatternButton">
      <div className="absolute flex flex-col font-['Fraunces:Regular',_sans-serif] font-normal justify-end leading-[0] left-[calc(50%-35px)] text-[20px] text-nowrap text-white top-[41px] tracking-[-0.5px] translate-y-[-100%]" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
        <p className="leading-[18px] whitespace-pre">Recipes</p>
      </div>
    </div>
  );
}

function PatternButton2() {
  return (
    <div className="absolute bg-black h-[64px] left-[352px] overflow-clip rounded-[5px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] top-px w-[150px]" data-name="PatternButton">
      <p className="absolute font-['Fraunces:Regular',_sans-serif] font-normal leading-[18px] left-[38px] text-[20px] text-nowrap text-white top-[23px] tracking-[-0.5px] whitespace-pre" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
        Account
      </p>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents left-0 top-0">
      <PatternButton />
      <PatternButton1 />
      <PatternButton2 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute h-[65px] left-[902px] top-[33px] w-[502px]">
      <Group4 />
    </div>
  );
}

export default function Group5() {
  return (
    <div className="relative size-full">
      <div className="absolute bg-neutral-100 h-[130px] left-0 top-0 w-[1440px]" />
      <p className="absolute font-['Fraunces:SemiBold_Italic',_sans-serif] font-semibold italic leading-[18px] left-[120px] text-[36px] text-black text-nowrap top-[57px] tracking-[-0.5px] whitespace-pre" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
        Hungry Hungry Hippos
      </p>
      <Frame1 />
      <div className="absolute h-[83px] right-[1322px] top-[calc(50%-0.5px)] translate-y-[-50%] w-[87px]" data-name="ChatGPT Image 2025年10月4日 13_58_32 2">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgChatGptImage20251041358322} />
      </div>
    </div>
  );
}