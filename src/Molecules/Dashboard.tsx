import { useSelector } from "react-redux";
import { RootState } from "../Store/store";

const Dashboard = () => {
  const formState = useSelector((state: RootState) => state.form);
  return <h1>Welcome, {formState.username}</h1>;
};

export default Dashboard;
