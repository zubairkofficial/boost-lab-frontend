import MenuModal from "@/components/MenuModal";
import PlansFuturisticButton from "@/components/PlanFuresticButton";

const LockedStageCard = ({
  stage,
  title,
  description,
  button,
}: {
  stage: string;
  title?: string;
  description: string;
  button?: React.ReactNode;
}) => {
  const isSpecial = stage === "LET BOOSTI BUILD YOUR PERSONALIZED STRATEGY";

  return (
    <div className="flex justify-between items-center w-full max-w-[91rem] px-20 py-10 bg-gradient-to-r from-[#1f3b47] to-[#193540]/60 backdrop-blur-md rounded-md mb-6 text-white font-[Unbounded,Arial,sans-serif]">
      <div>
        <h2
          className={`text-xl md:text-4xl text-[#87F1FF] uppercase tracking-wide font-normal ${
            isSpecial ? "w-[70%] py-5" : ""
          }`}
        >
          {stage}
          {title ? `: ${title}` : ""}
        </h2>
        <p className="mt-2 text-white text-sm md:text-base font-normal">
          {description}
        </p>
      </div>
      <div className="flex items-center text-right text-[#d2d2d2] uppercase text-sm">
        {button ? (
          button
        ) : (
          <>
            <div className="mr-7">
              <img
                src="https://static.tildacdn.net/tild6466-3537-4561-a136-313962393561/lock_icon.svg"
                alt="Lock Icon"
                className="w-18 h-18"
              />
            </div>
            <span className="underline underline-offset-[4px] border-[#d2d2d2] text-xl font-light px-2">
              Not Available
            </span>
          </>
        )}
      </div>
    </div>
  );
};

const ActiveStageCard = ({
  stage,
  title,
  description,
  buttonText,
  onClick,
}: {
  stage: string;
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
}) => (
  <div className="flex justify-between items-center w-full max-w-[91rem] px-20 py-10 bg-gradient-to-r from-[#1f3b47]/10 to-[#193540]/60 backdrop-blur-md rounded-md mb-6 text-white font-[Unbounded,Arial,sans-serif]">
    <div>
      <h2 className="text-xl md:text-4xl text-[#87F1FF] uppercase tracking-wide font-normal">
        {stage}: {title}
      </h2>
      <p className="mt-2 text-white text-sm md:text-base font-normal">
        {description}
      </p>
    </div>
    <div
      className="flex items-center text-[#d2d2d2] uppercase text-sm cursor-pointer"
      onClick={onClick}
    >
      <div className="mr-20">
        <img
          src="https://static.tildacdn.net/tild6231-3763-4066-a262-313738353561/result_icon.svg"
          alt="Result Icon"
          className="w-18 h-18"
        />
      </div>
      <span className="text-xl font-light px-2 text-[#87F1FF] hover:underline">
        {buttonText}
      </span>
    </div>
  </div>
);

export const LockedStagesSection: React.FC<{
  onSeeResult: () => void;
  showResult: boolean;
  testResult: any;
  isLoading: boolean;
  error: any;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}> = ({
  onSeeResult,
  showResult,
  testResult,
  isLoading,
  isModalOpen,
  setIsModalOpen,
}) => (
  <div className="w-full flex flex-col items-center py-10 px-4 z-10">
    <ActiveStageCard
      stage="Stage 1"
      title="Test"
      description="Discover your creative DNA and unlock your unique path"
      buttonText="SEE RESULT"
      onClick={() => {
        setIsModalOpen(true);
        onSeeResult();
      }}
    />

    {showResult && (
      <MenuModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        testResult={testResult}
        isLoading={isLoading}
      />
    )}

    <LockedStageCard
      stage="LET BOOSTI BUILD YOUR PERSONALIZED STRATEGY"
      description="Define your niche, brand voice, and ideal clients"
      button={
        <PlansFuturisticButton>
          START STRATEGY WITH BOOSTIE
        </PlansFuturisticButton>
      }
    />
    <LockedStageCard
      stage="Stage 2"
      title="Strategy"
      description="Define your niche, brand voice, and ideal clients"
    />
    <LockedStageCard
      stage="Stage 3"
      title="Content Creation"
      description="Build a strong brand presence across platforms"
    />
    <LockedStageCard
      stage="Stage 4"
      title="Automation"
      description="Let systems do the work while you create"
    />
    <LockedStageCard
      stage="Stage 5"
      title="Meta Setup"
      description="Run ads that bring real results — not just likes"
    />
  </div>
);
