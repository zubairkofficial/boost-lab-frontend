import {} from "react";
import PlansFuturisticButton from "@/components/PlanFuresticButton";
import bg from "../assets/bg_tariffs.jpg";
import {
  useGetAllPlansQuery,
  useCreateCheckoutSessionMutation,
} from "../features/plansApi";

export default function SubscriptionPlans() {
  const { data: plans = [], isLoading, isError } = useGetAllPlansQuery();
  const [createCheckoutSession] = useCreateCheckoutSessionMutation();
  const handlePlanSelect = async (plan: any) => {
    try {
      const { url } = await createCheckoutSession({
        stripePriceId: plan.stripePriceId,
      }).unwrap();

      if (!url) throw new Error("Stripe URL is missing");

      window.location.href = url;
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong while redirecting to Stripe");
    }
  };

  return (
    <div
      className="min-h-screen p-8 bg-fixed bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="max-w-7xl mx-auto">
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
          <div className="flex flex-wrap justify-center gap-10">
            {plans.map((plan: any) => (
              <div
                key={plan.id}
                className="bg-[#154E62] border border-cyan-500/30 shadow-xl text-white h-[28rem] w-full max-w-sm min-w-[370px] flex flex-col justify-between"
              >
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-3xl font-bold text-cyan-300 mb-4">
                    {plan.name} Plan
                  </h3>
                  <div className="text-sm text-cyan-200 font-semibold mb-2">
                    — {plan.validTill} Access —
                  </div>
                  <p className="text-sm text-slate-300 mb-4">
                    {plan.description || "Best for long-term growth and value."}
                  </p>
                  <ul className="text-sm text-slate-200 mb-6 space-y-2">
                    {plan.features?.map((feature: string, i: number) => (
                      <li key={i} className="flex items-start">
                        <span className="text-cyan-400 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="text-lg text-white mb-6">
                    {plan.originalPrice && (
                      <span className="line-through text-slate-400 mr-2">
                        €{plan.originalPrice}
                      </span>
                    )}
                    <span className="text-2xl font-bold text-cyan-400">
                      €{plan.price}
                    </span>
                  </div>

                  <PlansFuturisticButton
                    onClick={() => handlePlanSelect(plan)}
                    className="w-full right-7 top-5"
                  >
                    JOIN NOW
                  </PlansFuturisticButton>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-29">
          <p className="text-cyan-300 mb-6">
            All plans include a 30-day money-back guarantee
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-cyan-300">
            <span>✓ No setup fees</span>
            <span>✓ Cancel anytime</span>
            <span>✓ 24/7 support</span>
            <span>✓ Secure payments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
