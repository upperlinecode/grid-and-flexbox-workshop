import { Priority } from "../../tasks";
import { PriorityBadgeRoot } from "./Badges.styles";

const PriorityBadge = (props: { priority: Priority }) => {
  const { priority } = props;
  return <PriorityBadgeRoot>{priority}</PriorityBadgeRoot>;
};

export default PriorityBadge;
