import { useNavigate } from "react-router-dom";
import fridgerator from "../assets/fridgerator.png";
import pantry from "../assets/pantry.png";
import box from "../assets/box.png";
import alert from "../assets/alert.png";
import { Header } from "./Header";

/** Pages your UI can navigate to */
type Page = "main" | "fridge" | "kitchen" | "recipes" | "account";

/** onNavigate is now OPTIONAL */
interface MainPageProps {
  onNavigate?: (page: Page) => void;
}

/* -------------------- Hero -------------------- */
function HeroSection({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 text-center">
      <h1
        className="font-['Fraunces:Bold',_sans-serif] font-bold text-[48px] text-[#101828] mb-4 tracking-[-0.5px]"
        style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
      >
        Hungry Hungry Hippos 🍎
      </h1>
      <p
        className="font-['Fraunces:Light',_sans-serif] font-light text-[20px] text-[#4a5565] mb-8 max-w-3xl mx-auto"
        style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
      >
        Your smart kitchen companion for managing your fridge and pantry
      </p>
      <button
        onClick={() => onNavigate("kitchen")}
        className="bg-[#8bc34a] hover:bg-[#7CB342] text-white px-8 py-3 rounded-full shadow-lg transition-colors inline-flex items-center gap-3"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 16 16">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.33333 8H12.6667M8 3.33333V12.6667" />
        </svg>
        <span className="font-['Arial:Bold',_sans-serif] text-[20px]">Add Ingredients Now</span>
      </button>
    </section>
  );
}

/* -------------------- Inventory Cards -------------------- */
function InventorySection({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Fridge Inventory */}
        <button
          onClick={() => onNavigate("kitchen")}
          className="bg-white border-4 border-[rgba(0,0,0,0.68)] rounded-[14px] hover:border-[#dae673] transition-all duration-300 cursor-pointer group relative min-h-[525px]"
        >
          <div
            className="absolute flex flex-col font-['Fraunces:Bold',_sans-serif] font-bold justify-center leading-[0] left-1/2 text-[#101828] text-[24px] text-nowrap top-[31px] translate-x-[-50%] translate-y-[-50%]"
            style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
          >
            <p className="leading-[42px] whitespace-pre">Fridge Inventory</p>
          </div>

          <div className="absolute left-1/2 size-[340px] top-[57px] translate-x-[-50%]">
            <img alt="Fridge" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={fridgerator} />
          </div>

          <div className="absolute top-[430px] left-1/2 -translate-x-1/2 w-[400px] flex justify-between items-center">
            <p
              className="font-['Fraunces:Regular',_sans-serif] font-normal text-[#4a5565] text-[16px] leading-[18px] w-[265px]"
              style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
            >
              Track fresh items, monitor expiry dates, and never waste food again
            </p>

            <div className="w-[127px] h-[71px] rounded-[10px] bg-[#dae673] flex flex-col justify-center px-4">
              <div className="flex items-center text-center">
                <p
                  className="font-['Fraunces:Bold',_sans-serif] font-bold text-[#0d0d0d] text-[30px] leading-[36px]"
                  style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
                >
                  12
                </p>
                <p
                  className="ml-2 grow font-['Fraunces:Regular',_sans-serif] text-[#4a5565] text-[14px] leading-[15px]"
                  style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
                >
                  Items stored
                </p>
              </div>
            </div>
          </div>
        </button>

        {/* Pantry Inventory */}
        <button
          onClick={() => onNavigate("kitchen")}
          className="bg-white border-4 border-[rgba(0,0,0,0.68)] rounded-[14px] hover:border-[#d4a574] transition-all duration-300 cursor-pointer group relative min-h-[525px]"
        >
          <div
            className="absolute flex flex-col font-['Fraunces:Bold',_sans-serif] font-bold justify-center leading-[0] left-1/2 text-[#101828] text-[24px] text-nowrap top-[31px] -translate-x-1/2 -translate-y-1/2"
            style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
          >
            <p className="leading-[42px] whitespace-pre">Pantry Inventory</p>
          </div>

          <div className="absolute left-1/2 size-[340px] top-[57px] -translate-x-1/2">
            <img alt="Pantry" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full rounded-[10px]" src={pantry} />
          </div>

          <div className="absolute top-[430px] left-1/2 -translate-x-1/2 w-[400px] flex justify-between items-center">
            <p
              className="font-['Fraunces:Regular',_sans-serif] font-normal text-[#4a5565] text-[16px] leading-[18px] w-[265px]"
              style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
            >
              Organize dry goods, spices, and long-term storage items
            </p>

            <div className="w-[127px] h-[71px] rounded-[10px] bg-[#d4a574] flex flex-col justify-center px-4">
              <div className="flex items-center text-center">
                <p
                  className="font-['Fraunces:Bold',_sans-serif] font-bold text-[#0d0d0d] text-[30px] leading-[36px]"
                  style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
                >
                  18
                </p>
                <p
                  className="ml-2 grow font-['Fraunces:Regular',_sans-serif] text-[#4a5565] text-[14px] leading-[15px]"
                  style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
                >
                  Items stored
                </p>
              </div>
            </div>
          </div>
        </button>
      </div>
    </section>
  );
}

/* -------------------- Dashboard -------------------- */
function DashboardSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Activity */}
        <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[14px] p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-[40px] h-[40px]">
              <img alt="Recent Activity Icon" className="w-full h-full object-cover" src={box} />
            </div>
            <h3
              className="font-['Fraunces:Bold',_sans-serif] font-bold text-[20px] text-[#101828]"
              style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
            >
              Recent Activity
            </h3>
          </div>

          <div className="space-y-3">
            {/* rows */}
            <div className="bg-gray-50 rounded-[10px] p-3 flex justify-between items-center">
              <div>
                <p className="font-['Fraunces:Regular',_sans-serif] text-[16px] text-[#101828]">Added Milk</p>
                <p className="font-['Fraunces:Regular',_sans-serif] text-[14px] text-[#4a5565]">Fridge</p>
              </div>
              <p className="font-['Fraunces:Regular',_sans-serif] text-[14px] text-[#4a5565]">Expires in 3 days</p>
            </div>
            <div className="bg-gray-50 rounded-[10px] p-3 flex justify-between items-center">
              <div>
                <p className="font-['Fraunces:Regular',_sans-serif] text-[16px] text-[#101828]">Added Tomatoes</p>
                <p className="font-['Fraunces:Regular',_sans-serif] text-[14px] text-[#4a5565]">Fridge</p>
              </div>
              <p className="font-['Fraunces:Regular',_sans-serif] text-[14px] text-[#4a5565]">Expires in 7 days</p>
            </div>
            <div className="bg-gray-50 rounded-[10px] p-3 flex justify-between items-center">
              <div>
                <p className="font-['Fraunces:Regular',_sans-serif] text-[16px] text-[#101828]">Used Pasta</p>
                <p className="font-['Fraunces:Regular',_sans-serif] text-[14px] text-[#4a5565]">Pantry</p>
              </div>
              <p className="font-['Fraunces:Regular',_sans-serif] text-[14px] text-[#4a5565]">Empty for 2 days</p>
            </div>
            <div className="bg-gray-50 rounded-[10px] p-3 flex justify-between items-center">
              <div>
                <p className="font-['Fraunces:Regular',_sans-serif] text-[16px] text-[#101828]">Used Olive Oil</p>
                <p className="font-['Fraunces:Regular',_sans-serif] text-[14px] text-[#4a5565]">Pantry</p>
              </div>
              <p className="font-['Fraunces:Regular',_sans-serif] text-[14px] text-[#4a5565]">Expires in 200 days</p>
            </div>
          </div>
        </div>

        {/* Kitchen Alerts */}
        <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[14px] p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-[40px] h-[40px]">
              <img alt="Kitchen Alerts Icon" className="w-full h-full object-cover" src={alert} />
            </div>
            <h3
              className="font-['Fraunces:Bold',_sans-serif] font-bold text-[20px] text-[#101828]"
              style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
            >
              Kitchen Alerts
            </h3>
          </div>

          <div className="space-y-4">
            <div className="bg-orange-50 border border-[#ffd6a7] rounded-[10px] p-4">
              <h4 className="font-['Fraunces:Regular',_sans-serif] text-[16px] text-[#7e2a0c] mb-2">Items Expiring Soon</h4>
              <p className="font-['Fraunces:Regular',_sans-serif] text-[14px] text-[#9f2d00]">
                3 items in your fridge will expire within the next 3 days
              </p>
            </div>
            <div className="bg-blue-50 border border-[#bedbff] rounded-[10px] p-4">
              <h4 className="font-['Fraunces:Regular',_sans-serif] text-[16px] text-[#1c398e] mb-2">Kitchen Tip</h4>
              <p className="font-['Fraunces:Regular',_sans-serif] text-[14px] text-[#193cb8]">
                Store potatoes in a cool, dark place away from onions to prevent sprouting
              </p>
            </div>
            <div className="bg-green-50 border border-[#b9f8cf] rounded-[10px] p-4">
              <h4 className="font-['Fraunces:Regular',_sans-serif] text-[16px] text-[#0d542b] mb-2">Well Stocked!</h4>
              <p className="font-['Fraunces:Regular',_sans-serif] text-[14px] text-[#016630]">
                Your pantry has 18 items - you're well prepared for cooking
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- Page (with internal nav fallback) -------------------- */
export default function MainPage({ onNavigate }: MainPageProps) {
  const navigate = useNavigate();

  // fallback if onNavigate prop isn't provided
  const go = onNavigate ?? ((page: Page) => {
    switch (page) {
      case "main":
        navigate("/mainpage");
        break;
      case "fridge":
      case "kitchen":
        navigate("/app/inventory"); // change to your real route
        break;
      case "recipes":
        navigate("/recipes");
        break;
      case "account":
        navigate("/account");
        break;
    }
  });

  return (
    <div className="bg-white min-h-screen">
      <Header currentPage="main" onNavigate={go} />
      <HeroSection onNavigate={go} />
      <InventorySection onNavigate={go} />
      <DashboardSection />
    </div>
  );
}
