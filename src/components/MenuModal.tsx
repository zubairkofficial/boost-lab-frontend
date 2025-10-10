import { type FC } from "react";

import { Dialog, DialogContent } from "./ui/dialog";
import TestResult from "./TestResult";

interface MenuModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  testResult?: any;
  isLoading: boolean;
}

const MenuModal: FC<MenuModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  testResult,
}) => {
  if (!isModalOpen) return null;

  return (
    <Dialog open={isModalOpen}>
      <DialogContent setIsModalOpen={setIsModalOpen} isModelOpen={isModalOpen}>
        <TestResult testResult={testResult} />
      </DialogContent>
    </Dialog>
  );
};

export default MenuModal;
