"use client"

import PlansFuturisticButton from "@/components/plans-furastic-button"
import bg from "../assets/bg_tariffs.jpg"

interface Plan {
  name: string
  price: string
  period: string
  features: string[]
  buttonText: string
  popular: boolean
}

interface SubscriptionPlansProps {
  plans?: Plan[]
  title?: string
  subtitle?: string
}

const defaultPlans: Plan[] = [
  {
    name: "BASIC",
    price: "$9",
    period: "/month",
    features: ["5 Projects", "10GB Storage", "Basic Support", "Standard Analytics", "Mobile App Access"],
    buttonText: "START BASIC",
    popular: false,
  },
  {
    name: "PRO",
    price: "$29",
    period: "/month",
    features: [
      "Unlimited Projects",
      "100GB Storage",
      "Priority Support",
      "Advanced Analytics",
      "Mobile App Access",
      "API Access",
      "Custom Integrations",
    ],
    buttonText: "GO PRO",
    popular: true,
  },
  {
    name: "ENTERPRISE",
    price: "$99",
    period: "/month",
    features: [
      "Unlimited Everything",
      "1TB Storage",
      "24/7 Dedicated Support",
      "Enterprise Analytics",
      "White Label Solution",
      "Custom Development",
      "SLA Guarantee",
    ],
    buttonText: "GET ENTERPRISE",
    popular: false,
  },
]

export default function SubscriptionPlans({
  plans = defaultPlans,
  title = "Choose Your Plan",
  subtitle = "Select the perfect subscription plan for your needs. Upgrade or downgrade at any time.",
}: SubscriptionPlansProps) {
  const handlePlanSelect = (planName: string) => {
    alert(`Selected ${planName} plan!`)
    // Add your plan selection logic here
  }

  return (
    <div className="min-h-screen p-8 bg-fixed bg-cover bg-no-repeat" style={{ backgroundImage: `url(${bg})` }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">{title}</h1>
          <p className="text-xl text-cyan-300 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {/* Pricing Cards */}
        <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className="relative bg-[#123c4b] backdrop-blur-sm border rounded-2xl
                         border-slate-700 w-full max-w-sm min-w-[300px]
                         hover:border-cyan-400/50 transition-all duration-300
                         flex flex-col h-auto min-h-[500px]"
            >
             

              {/* Plan Header */}
              <div className="text-center p-8 pb-4">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center mb-4">
                  <span className="text-5xl font-bold text-cyan-400">{plan.price}</span>
                  <span className="text-xl text-slate-400 ml-2">{plan.period}</span>
                </div>
              </div>

              {/* Features List - This will grow to fill available space */}
              <div className="flex-1 px-8">
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-slate-300">
                      <svg
                        className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Button at bottom - Fixed position */}
              <div className="px-8">
                <PlansFuturisticButton onClick={() => handlePlanSelect(plan.name)} className="right-8 top-6 w-full">
                  {plan.buttonText}
                </PlansFuturisticButton>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-slate-400 mb-6">All plans include a 30-day money-back guarantee</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-cyan-300">
            <span>✓ No setup fees</span>
            <span>✓ Cancel anytime</span>
            <span>✓ 24/7 support</span>
            <span>✓ Secure payments</span>
          </div>
        </div>
      </div>
    </div>
  )
}
