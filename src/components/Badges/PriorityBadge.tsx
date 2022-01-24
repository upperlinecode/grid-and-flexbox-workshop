import { Priority } from "../../tasks";
import { PriorityBadgeDiv } from "./Badges.styles";

const PriorityBadge = (props: { priority: Priority }) => {
  const { priority } = props;
  return <PriorityBadgeDiv priority={priority}>{priority}</PriorityBadgeDiv>;
};

export default PriorityBadge;
