import { ReactElement } from "react";
import AdminPanel from "./adminpanel";

const Dashboard = ({ children }: { children: React.ReactNode }) => {
    return (
      <>
      <AdminPanel children={''}/>
      </>
    );
    };
    
    export default Dashboard;
    
    Dashboard.getLayout = function PageLayout(page: ReactElement) {
    return (
        <>
            {page}
        </>
    )
    }