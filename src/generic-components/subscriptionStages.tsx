import frame from "../assets/vector2.png";

export const BeforeSubscriptionStages = [
  {
    stage: "LET BOOSTI BUILD YOUR PERSONALIZED STRATEGY",
    description: "Define your niche, brand voice, and ideal clients",
    button: (
      <button className="pt-10">
        <div
          className="w-[100%] h-[80px] md:h-[110px] bg-no-repeat bg-center flex items-center justify-center relative left-1/2 -translate-x-1/2"
          style={{
            backgroundImage: `url(${frame})`,
            backgroundSize: "100% 100%",
          }}
        >
          <span
            className="text-base md:text-lg text-white font-normal px-4 py-2 transition-all duration-500 ease-out rounded-md bg-transparent"
            style={{ fontFamily: "'Unbounded', Arial, sans-serif" }}
          >
            START MY STRATEGY WITH BOOSTIE
          </span>
        </div>
      </button>
    ),
  },
  {
    stage: "Stage 2",
    title: "Strategy",
    description: "Define your niche, brand voice, and ideal clients",
  },
  {
    stage: "Stage 3",
    title: "Content Creation",
    description: "Build a strong brand presence across platforms",
  },
  {
    stage: "Stage 4",
    title: "Automation",
    description: "Let systems do the work while you create",
  },
  {
    stage: "Stage 5",
    title: "Meta Setup",
    description: "Run ads that bring real results — not just likes",
  },
];

export const AfterSubscriptionStages = [
  {
    stage: "Stage 1",
    title: "SEE RESULTS",
    description: "See you test result here",
    isResultStage: true,
  },
  {
    stage: "Stage 2",
    title: "STRATEGY",
    description: "Define your niche, brand voice, and ideal clients",
  },
  {
    stage: "Stage 3",
    title: "CONTENT CREATION",
    description: "Build a strong brand presence across platforms",
  },
  {
    stage: "Stage 4",
    title: "AUTOMATION",
    description: "Let systems do the work while you create",
  },
  {
    stage: "Stage 5",
    title: "Meta Setup",
    description: "Run ads that bring real results — not just likes",
  },
];
