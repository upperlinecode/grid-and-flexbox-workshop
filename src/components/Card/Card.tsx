import { Task } from "../../tasks";
import PriorityBadge from "../Badges/PriorityBadge";
import StatusBadge from "../Badges/StatusBadge";
import Button from "../Button/Button.styles";
import DirectionalButton from "../DirectionalButton/DirectionalButton";
import { BudgetGrid, CardHeader, CardRoot, FieldBody, FieldTitle } from "./Card.styles";

interface Props {
  task: Task;
  full: boolean;
  handleDelete?: () => void;
  handleUp?: () => void;
  handleDown?: () => void;
  handleLeft?: () => void;
  handleRight?: () => void;
}

const Card = ({
  task,
  full,
  handleDelete,
  handleUp,
  handleDown,
  handleLeft,
  handleRight,
}: Props) => {
  const { taskName, owner, description, priority, status, budget, spent, remainingSpend } = task;
  return (
    <CardRoot>
      {handleUp && <DirectionalButton direction="up" kind="card" onClick={handleUp} />}
      {handleLeft && <DirectionalButton direction="left" kind="card" onClick={handleLeft} />}
      {handleRight && <DirectionalButton direction="right" kind="card" onClick={handleRight} />}
      {handleDown && <DirectionalButton direction="down" kind="card" onClick={handleDown} />}

      <div>
        <CardHeader>
          {taskName}{" "}
          {handleDelete && (
            <Button kind="delete" onClick={handleDelete}>
              Delete
            </Button>
          )}
        </CardHeader>
        {owner && (
          <>
            <FieldTitle>Owner</FieldTitle>
            <FieldBody>{owner}</FieldBody>
          </>
        )}
        <FieldTitle>Description</FieldTitle>
        <FieldBody>{description}</FieldBody>
        {full && (
          <>
            <FieldTitle>Status</FieldTitle>
            <FieldBody>
              <StatusBadge status={status} />
            </FieldBody>
          </>
        )}
        {priority && (
          <>
            <FieldTitle>Priority</FieldTitle>
            <FieldBody>
              <PriorityBadge priority={priority} />
            </FieldBody>
          </>
        )}
      </div>
      {full && (
        <BudgetGrid>
          <FieldTitle>Budget</FieldTitle>
          <FieldTitle>Spent</FieldTitle>
          <FieldTitle>Remaining</FieldTitle>
          <FieldBody>${budget.toLocaleString()}</FieldBody>
          <FieldBody>${spent.toLocaleString()}</FieldBody>
          <FieldBody>${remainingSpend.toLocaleString()}</FieldBody>
        </BudgetGrid>
      )}
    </CardRoot>
  );
};

export default Card;
