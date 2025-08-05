import line from "../assets/tariff_line.svg";
import frame from "../assets/vector2.png";

export default function PersonalInfo() {
  const features = [
    {
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
    <div className="min-h-screen bg-fixed bg-cover bg-no-repeat">
      <div className="max-w-8xl mx-auto py-20 px-6 sm:px-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-10 justify-center">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-[#154E62]/60 backdrop-blur-md border border-cyan-500/30 shadow-2xl text-white min-h-[35rem] flex flex-col justify-between rounded-2xl relative mb-6"
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

                <div className="flex flex-wrap gap-x-2 items-center text-white text-base sm:text-lg">
                  <span className="line-through text-slate-400 text-sm sm:text-xl">
                    €{item.oldPrice}
                  </span>
                  <span className="font-bold text-cyan-400 text-lg sm:text-2xl">
                    €{item.price}
                  </span>
                  <span className="text-cyan-400 text-sm sm:text-lg font-medium break-words">
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
                    rounded-md bg-transparent"
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
  );
}
