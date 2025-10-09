import { useState, useEffect } from "react";
import frame from "../../assets/vector2.png";
import line from "../../assets/tariff_line.svg";

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

  const [activeSubscription, setActiveSubscription] = useState(
    activeSubscriptionData || null
  );

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
        userId: user.userId,
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
      setActiveSubscription(null);
      refetchSubscription();
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
    <div className="w-full">
      <div className="max-w-8xl mx-auto py-10 sm:py-20 px-4 sm:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {plans.map((plan: Plan) => {
            const isUserSubscribed = activeSubscription?.status === "active";
            const isCurrentPlan = activeSubscription?.plan?.id === plan.id;
            const isSubscribed = isUserSubscribed && isCurrentPlan;
            const isLoadingThisPlan =
              loadingPlanId === plan.id ||
              loadingPlanId === activeSubscription?.plan?.id ||
              isFetchingSubscription;

            const perMonth = (plan.price / plan.duration).toFixed(2);
            return (
              <div
                key={plan.id}
                className="bg-[#154E62]/60 backdrop-blur-md border border-cyan-500/30 shadow-2xl text-white rounded-bl-[48px] sm:rounded-bl-[68px] md:min-h-[35rem] min-h-[28rem] flex flex-col justify-between relative"
              >
                <div className="p-5 sm:p-8 flex flex-col flex-grow gap-3">
                  <h3
                    className="text-2xl sm:text-4xl lg:text-5xl font-normal text-[#8DEFF4] pt-2 sm:pb-4"
                    style={{ fontFamily: "'Unbounded', Arial, sans-serif" }}
                  >
                    {plan.name}
                  </h3>

                  <div className="flex flex-col gap-3 sm:gap-5 flex-grow">
                    {Array.isArray(plan.description)
                      ? plan.description.map((desc, i) => {
                          const words = desc.split(" ");
                          const mid = Math.ceil(words.length / 2);
                          const firstHalf = words.slice(0, mid).join(" ");
                          const secondHalf = words.slice(mid).join(" ");

                          return (
                            <div key={i} className="flex flex-col pt-3">
                              <div className="flex flex-col text-sm sm:text-base">
                                {words.length > 3 ? (
                                  <>
                                    <p className="text-slate-200">
                                      {firstHalf}
                                    </p>
                                    <p className="text-slate-200 pb-1 sm:pb-2">
                                      {secondHalf}
                                    </p>
                                  </>
                                ) : (
                                  <p className="text-slate-200 pb-0">{desc}</p>
                                )}
                              </div>
                              <img
                                src={line}
                                alt="divider"
                                className="block w-full"
                              />
                            </div>
                          );
                        })
                      : plan.description && (
                          <div className="flex flex-col">
                            <p className="text-sm sm:text-base text-slate-200">
                              {plan.description}
                            </p>
                            <img
                              src={line}
                              alt="divider"
                              className="w-full mt-2"
                            />
                          </div>
                        )}
                  </div>

                  <div
                    className="flex flex-col mt-4 sm:mt-1"
                    style={{ fontFamily: "'PT Sans', Arial, sans-serif" }}
                  >
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      {plan.oldPrice && (
                        <span className="text-base sm:text-xl font-normal text-white line-through opacity-70 mr-2">
                          €{plan.oldPrice}
                        </span>
                      )}

                      <span className="text-2xl sm:text-4xl font-semibold text-[#8DEFF4]">
                        €{plan.price}
                      </span>
                      <span className="text-sm sm:text-base font-normal text-[#8DEFF4] opacity-80">
                        / €{perMonth} / MONTH
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  className={`w-full mt-6 ${
                    isLoadingThisPlan
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer"
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
                    className="w-[102%] h-[80px] sm:h-[100px] md:h-[120px] bg-no-repeat bg-center flex items-center justify-center relative left-1/2 -translate-x-1/2"
                    style={{
                      backgroundImage: `url(${frame})`,
                      backgroundSize: "100% 100%",
                    }}
                  >
                    <span
                      className="text-base sm:text-lg md:text-xl text-white font-normal px-4 py-2 transition-all duration-500 ease-out rounded-md bg-transparent"
                      style={{ fontFamily: "'Unbounded', Arial, sans-serif" }}
                    >
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
