import { Status } from "../../tasks";
import { StatusBadgeDiv } from "./Badges.styles";

const StatusBadge = (props: { status: Status }) => {
  const { status } = props;
  return <StatusBadgeDiv status={status}>{status}</StatusBadgeDiv>;
};

export default StatusBadge;
