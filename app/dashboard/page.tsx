import Sidebar from "@/components/layout/sidebar";
import Navbar from "@/components/layout/navbar";

export default function Dashboard() {
    return (
        <div>
            <Navbar />
            <p>Dashboard for Job Hunt</p>
            <Sidebar />
        </div>
    );
}