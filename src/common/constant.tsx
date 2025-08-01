import vector2 from "../assets/vector2.png";

export const BeforeSubscriptionStages = [
  {
    stage: "LET BOOSTI BUILD YOUR PERSONALIZED STRATEGY",
    description: "Define your niche, brand voice, and ideal clients",
    button: (
      <button>
        <div className="relative w-[300px] h-[130px] sm:w-[400px] sm:h-[100px] md:w-[400px] md:h-[130px]">
          <img
            src={vector2}
            alt="SERVICES"
            className="w-[82%] md:w-[100%] sm:w-[92%] h-[110px]"
          />
          <div className="absolute inset-0 flex items-center justify-center px-2">
            <span className="text-white text-xs sm:text-lg md:text-start font-semibold w-[71%]">
              START MY STRATEGY WITH BOOSTIE
            </span>
          </div>
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
    title: "TEST",
    description: "Define your niche, brand voice, and ideal clients",
    button: "",
  },
  {
    stage: "Stage 1",
    title: "Test",
    description: "Discover your creative DNA and unlock your unique path",
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
