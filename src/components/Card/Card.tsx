import { Task } from "../../tasks";
import PriorityBadge from "../Badges/PriorityBadge";
import StatusBadge from "../Badges/StatusBadge";
import { BudgetGrid, CardRoot, FieldBody, FieldTitle } from "./Card.styles";

const Card = (props: { task: Task; full: boolean }) => {
  const {
    taskName,
    owner,
    description,
    priority,
    status,
    budget,
    spent,
    remainingSpend,
  } = props.task;
  const { full } = props;
  return (
    <CardRoot>
      <div>
        <h4>{taskName}</h4>
        <FieldTitle>Owner</FieldTitle>
        <FieldBody>{owner}</FieldBody>
        {full && (
          <>
            <FieldTitle>Description</FieldTitle>
            <FieldBody>{description}</FieldBody>
            <FieldTitle>Status</FieldTitle>
            <FieldBody>
              <StatusBadge status={status} />
            </FieldBody>
          </>
        )}
        <FieldTitle>Priority</FieldTitle>
        <FieldBody>
          <PriorityBadge priority={priority} />
        </FieldBody>
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
