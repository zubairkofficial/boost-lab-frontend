import frame from "../../assets/vector2.png";
import line from "../../assets/tariff_line.svg";
import bg from "../../assets/bg_tariffs.jpg";

import {
  useGetAllPlansQuery,
  useCreateCheckoutSessionMutation,
  useGetActiveSubscriptionQuery,
} from "../../features/plansApi";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../store/userSlice";
import toast from "react-hot-toast";

type Plan = {
  id: number;
  name: string;
  description: string[] | string;
  price: number;
  oldPrice?: number;
  stripePriceId: string;
};

export default function PlanCards() {
  const { data: plans = [], isLoading, isError } = useGetAllPlansQuery();
  const [createCheckoutSession] = useCreateCheckoutSessionMutation();
  const userInfo = useSelector(selectUserInfo);

  const { data: activeSubscription } = useGetActiveSubscriptionQuery(userInfo?.id, {
    skip: !userInfo?.id,
  });

  const handlePlanSelect = async (plan: Plan) => {
    try {
      if (!userInfo?.id) throw new Error("User ID not found. Please log in.");
      if (!plan.stripePriceId) throw new Error("Missing Stripe Price ID");

      const isUserSubscribed = activeSubscription?.status === "active";
      const isCurrentPlan = activeSubscription?.plan?.id === plan.id;

      if (isUserSubscribed && isCurrentPlan) {
        toast("You are already subscribed to this plan.");
        return;
      }

      const { url } = await createCheckoutSession({
        stripePriceId: plan.stripePriceId,
        id: userInfo.id,
      }).unwrap();

      if (!url) throw new Error("Stripe URL is missing");

      window.open(url, "_blank", "noopener,noreferrer");
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast.error(
        error?.message || "You already have an active subscription to this plan"
      );
    }
  };

  return (
    <div
      className="min-h-screen bg-fixed bg-cover bg-no-repeat container mx-auto"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="max-w-8xl mx-auto py-20 px-6 sm:px-14">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-cyan-300 max-w-2xl mx-auto">
            Select the perfect subscription plan for your needs. Upgrade or
            downgrade at any time.
          </p>
        </div>

        {isLoading && (
          <p className="text-center text-white">Loading plans...</p>
        )}
        {isError && (
          <p className="text-center text-red-500">
            Failed to load plans. Please try again later.
          </p>
        )}

        {!isLoading && !isError && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-10 justify-center">
            {plans.map((plan: Plan) => {
              const isUserSubscribed = activeSubscription?.status === "active";
              const isCurrentPlan = activeSubscription?.plan?.id === plan.id;
              const isSubscribed = isUserSubscribed && isCurrentPlan;

              return (
                <div
                  key={plan.id}
                  className={`bg-[#154E62]/60 backdrop-blur-md border border-cyan-500/30 shadow-2xl text-white min-h-[35rem] flex flex-col justify-between rounded-2xl relative mb-6 ${
                    isSubscribed ? "opacity-60" : ""
                  }`}
                >
                  <div className="p-8 flex flex-col flex-grow gap-3">
                    <h3 className="text-4xl font-semibold text-cyan-300 pt-2">
                      {plan.name}
                    </h3>

                    <div className="flex flex-col gap-4 flex-grow">
                      {Array.isArray(plan.description)
                        ? plan.description.map((desc, i) => (
                            <div key={i} className="flex flex-col gap-1">
                              <p className="text-sm text-slate-200">{desc}</p>
                              <img
                                src={line}
                                alt="divider"
                                className="h-10 w-full mt-0"
                              />
                            </div>
                          ))
                        : plan.description && (
                            <p className="text-sm text-slate-200">
                              {plan.description}
                            </p>
                          )}
                    </div>

                    <div className="flex flex-wrap gap-x-2 items-center text-white text-base sm:text-lg mt-4">
                      {plan.oldPrice && (
                        <span className="line-through text-slate-400 text-sm sm:text-xl">
                          €{plan.oldPrice}
                        </span>
                      )}
                      <span className="font-bold text-cyan-400 text-lg sm:text-2xl">
                        €{plan.price}
                      </span>
                      <span className="text-cyan-400 text-sm sm:text-lg font-medium break-words">
                        /month
                      </span>
                    </div>
                  </div>

                  <div
                    className={`w-full mt-6 ${
                      isSubscribed
                        ? "cursor-not-allowed"
                        : "cursor-pointer group"
                    }`}
                    onClick={() => {
                      if (!isSubscribed) handlePlanSelect(plan);
                    }}
                  >
                    <div
                      className="w-full h-[130px] bg-no-repeat bg-center bg-contain flex items-center justify-center"
                      style={{
                        backgroundImage: `url(${frame})`,
                        backgroundSize: "100% 100%",
                      }}
                    >
                      <span className="text-white text-sm sm:text-base font-semibold px-4 py-2 transition-all duration-500 ease-out rounded-md bg-transparent">
                        {isSubscribed ? "ALREADY SUBSCRIBED" : "JOIN NOW"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
