import { Status } from "../../tasks";
import { StatusBadgeRoot } from "./Badges.styles";

const StatusBadge = (props: { status: Status }) => {
  const { status } = props;
  return <StatusBadgeRoot status={status}>{status}</StatusBadgeRoot>;
};

export default StatusBadge;
