import AdminPanel from "./adminpanel";

const Dashboard = ({ children }: any) => {
    return (
      <>
      <AdminPanel children={''}/>
      </>
    );
    };
    
    export default Dashboard;
    
    Dashboard.getLayout = function PageLayout(page: any) {
    return (
        <>
            {page}
        </>
    )
    }