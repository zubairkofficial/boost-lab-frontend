import { Link } from "react-router-dom";
import line from "../assets/tariff_line.svg";
import frame from "../assets/vector2.png";

export default function PersonalInfo() {
  const features = [
    {
      img: "https://cdn-icons-png.flaticon.com/512/1828/1828817.png",
      title: "Starter Plan",
      price: 69,
      oldPrice: 119,
      billingCycle: "(€3/MONTH)",
      features: [
        "The perfect way to try BOOSTLAB",
        "Discover your creative identity and see your potential. Flexible, no long-term commitment.",
      ],
    },
    {
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      title: "Growth Plan",
      price: 129,
      oldPrice: 199,
      billingCycle: "(€6/MONTH)",
      features: [
        "Best value for progress",
        "Enjoy stable growth and enough time to implement all strategies at a better price per month.",
      ],
    },
    {
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      title: "Annual Plan",
      price: 199,
      oldPrice: 299,
      billingCycle: "(€12/MONTH)",
      features: [
        "Maximum savings & confidence",
        "Get full access for a whole year, save up to 40%, and focus on your long-term success.",
      ],
    },
  ];

  return (
    <>
      <div
        className="min-h-screen bg-fixed bg-cover bg-no-repeat"
        style={{ fontFamily: "'PT Sans', Arial, sans-serif" }}
      >
        <div className="max-w-7xl mx-auto py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {features.map((item, index) => (
              <div
                key={index}
                className="bg-[#154E62]/60 backdrop-blur-md border border-cyan-500/30 shadow-2xl text-white h-[35rem] flex flex-col justify-between rounded-2xl relative"
              >
                <div className="p-8 flex flex-col flex-grow gap-3">
                  <h3 className="text-5xl font-semibold text-cyan-300 pt-2">
                    {item.title}
                  </h3>

                  <ul className="text-slate-200 space-y-3 flex-grow">
                    {item.features.map((feature, i) => (
                      <li key={i} className="flex flex-col">
                        <span className="flex items-start">{feature}</span>
                        <img
                          src={line}
                          alt="divider"
                          className="h-10 w-full mt-0"
                        />
                      </li>
                    ))}
                  </ul>

                  <div className="text-lg text-white">
                    <span className="text-3xl line-through text-slate-400 mr-2">
                      €{item.oldPrice}
                    </span>
                    <span className="text-3xl font-bold text-cyan-400">
                      €{item.price}
                    </span>
                    <span className="text-2xl mx-2 text-cyan-400 font-semibold">
                      {item.billingCycle}
                    </span>
                  </div>
                </div>

                <div className="w-full mt-6 cursor-pointer group">
                  <div
                    className="w-full h-[130px] bg-no-repeat bg-center bg-contain flex items-center justify-center"
                    style={{
                      backgroundImage: `url(${frame})`,
                      backgroundSize: "100% 100%",
                    }}
                  >
                    <button
                      className="text-white text-sm sm:text-base font-semibold px-4 py-2 transition-all duration-500 ease-out
      group-hover:shadow-[0_0_2500px_100px_#8EF0F4] rounded-md bg-transparent"
                    >
                      JOIN NOW
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#063241]">
        <footer className="w-full p-10 bg-[#063241] sticky bottom-0">
          <div className="flex justify-center gap-10 text-sm font-semibold text-cyan-300 bg-[#063241]">
            <Link to="/terms" className="hover:underline">
              Terms of Service
            </Link>
            <Link to="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link to="/contact" className="hover:underline">
              Contact Us
            </Link>
          </div>
        </footer>
      </div>
    </>
  );
}
