import { useState, useEffect } from "react";
import frame from "../../assets/vector2.png";
import line from "../../assets/tariff_line.svg";
import bg from "../../assets/bg_tariffs.jpg";

import {
  useGetAllPlansQuery,
  useCreateCheckoutSessionMutation,
  useGetActiveSubscriptionQuery,
  useCancelSubscriptionMutation,
} from "../../features/plansApi";

import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";

type Plan = {
  id: number;
  name: string;
  description: string[] | string;
  price: number;
  oldPrice?: number;
  stripePriceId: string;
  duration: number;
};

const durationMap: Record<number, string> = {
  1: "/ 1 Month",
  3: "/ 3 Months",
  12: "/ 12 Months",
};

export default function PlanCards() {
  const { data: plans = [], isLoading, isError } = useGetAllPlansQuery();
  const [autoRenewMap, setAutoRenewMap] = useState<Record<number, boolean>>({});
  const [createCheckoutSession] = useCreateCheckoutSessionMutation();
  const [cancelSubscription] = useCancelSubscriptionMutation();
  const { user } = useAuth();
  const [loadingPlanId, setLoadingPlanId] = useState<number | null>(null);

  const {
    data: activeSubscriptionData,
    refetch: refetchSubscription,
    isFetching: isFetchingSubscription,
  } = useGetActiveSubscriptionQuery(user?.userId, {
    skip: !user?.userId,
    refetchOnMountOrArgChange: true,
  });

  // Local state to immediately reflect subscription changes
  const [activeSubscription, setActiveSubscription] = useState(
    activeSubscriptionData || null
  );

  // Sync local state with query data
  useEffect(() => {
    setActiveSubscription(activeSubscriptionData || null);
  }, [activeSubscriptionData]);

  const getDurationText = (duration: number) =>
    durationMap[duration] || `/${duration} months`;

  const handlePlanSelect = async (plan: Plan) => {
    if (!user?.userId) {
      toast.error("Please log in to subscribe.");
      return;
    }
    if (!plan.stripePriceId) {
      toast.error("Plan is missing Stripe Price ID.");
      return;
    }

    const isUserSubscribed = activeSubscription?.status === "active";
    const isCurrentPlan = activeSubscription?.plan?.id === plan.id;

    if (isUserSubscribed && isCurrentPlan) {
      toast(
        "You already have an active subscription. Please cancel it before subscribing to a new plan."
      );
      return;
    }

    try {
      setLoadingPlanId(plan.id);
      const { url } = await createCheckoutSession({
        stripePriceId: plan.stripePriceId,
        id: user.userId,
        autoRenew: autoRenewMap[plan.id] || false,
      }).unwrap();

      if (!url) throw new Error("Stripe checkout URL missing.");
      window.location.href = url;
    } catch (error: any) {
      console.error("Checkout error:", error);
      const message =
        error?.data?.message ||
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong during checkout.";
      toast.error(message);
    } finally {
      setLoadingPlanId(null);
    }
  };

  const handleCancelSubscription = async () => {
    if (!activeSubscription?.id || !activeSubscription.plan?.id) return;

    try {
      setLoadingPlanId(activeSubscription.plan.id);
      await cancelSubscription({
        userId: user?.userId,
      }).unwrap();

      toast.success("Subscription cancelled successfully");
      setActiveSubscription(null); // update immediately
      refetchSubscription(); // sync with server
    } catch (error: any) {
      console.error("Cancel subscription error:", error);
      toast.error(error?.message || "Failed to cancel subscription");
    } finally {
      setLoadingPlanId(null);
    }
  };

  if (isLoading)
    return <p className="text-center text-white">Loading plans...</p>;
  if (isError)
    return (
      <p className="text-center text-red-500">
        Failed to load plans. Please try again later.
      </p>
    );

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-10 justify-center">
          {plans.map((plan: Plan) => {
            const isUserSubscribed = activeSubscription?.status === "active";
            const isCurrentPlan = activeSubscription?.plan?.id === plan.id;
            const isSubscribed = isUserSubscribed && isCurrentPlan;
            const isLoadingThisPlan =
              loadingPlanId === plan.id ||
              loadingPlanId === activeSubscription?.plan?.id ||
              isFetchingSubscription;

            return (
              <div
                key={plan.id}
                className={`bg-[#154E62]/60 backdrop-blur-md border border-cyan-500/30 shadow-2xl text-white min-h-[35rem] flex flex-col justify-between rounded-2xl relative mb-6`}
              >
                <div className="p-8 flex flex-col flex-grow gap-3">
                  <h3 className="text-4xl font-semibold text-cyan-300 pt-2 pb-6">
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
                      {getDurationText(plan.duration)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-2 px-8">
                  <input
                    type="checkbox"
                    checked={autoRenewMap[plan.id] || false}
                    onChange={(e) =>
                      setAutoRenewMap((prev) => ({
                        ...prev,
                        [plan.id]: e.target.checked,
                      }))
                    }
                    id={`auto-renew-${plan.id}`}
                    className="accent-cyan-400"
                  />
                  <label
                    htmlFor={`auto-renew-${plan.id}`}
                    className="text-white text-sm"
                  >
                    Auto-Renew
                  </label>
                </div>

                <div
                  className={`w-full mt-6 ${
                    isLoadingThisPlan
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer group"
                  }`}
                  onClick={() => {
                    if (isSubscribed) {
                      handleCancelSubscription();
                    } else if (!isLoadingThisPlan) {
                      handlePlanSelect(plan);
                    }
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
                      {isSubscribed
                        ? "CANCEL SUBSCRIPTION"
                        : isLoadingThisPlan
                        ? "PROCESSING..."
                        : "JOIN NOW"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
