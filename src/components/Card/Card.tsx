import { Task } from "../../tasks";
import PriorityBadge from "../Badges/PriorityBadge";
import { CardRoot, FieldBody, FieldTitle } from "./Card.styles";

const Card = (props: { task: Task }) => {
  const { taskName, owner, priority } = props.task;
  return (
    <CardRoot>
      <h4>{taskName}</h4>
      <FieldTitle>Owner</FieldTitle>
      <FieldBody>{owner}</FieldBody>
      <FieldTitle>Priority</FieldTitle>
      <FieldBody>
        <PriorityBadge priority={priority} />
      </FieldBody>
    </CardRoot>
  );
};

export default Card;
