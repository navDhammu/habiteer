import svg from "../assets/nodata.svg";
import Button from "./ui/Buttons/buttons/Button";

export default function NoHabits() {
  return (
    <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center gap-4">
      <img src={svg} className="w-28" />
      <h2 className="text-xl">Your habits list is empty</h2>
      <div className="text-gray-500">
        Get started by creating your first habit
      </div>
      <Button size="md" variant="primary">
        Create First Habit
      </Button>
    </div>
  );
}
