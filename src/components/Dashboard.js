
const Dashboard = () => {
    return ( 
    <>
      <h1>Dashboard</h1>
      <button onClick={() => localStorage.setItem("token", "")}>Clear Local Storage</button>
    </>
    )
}
export default Dashboard;