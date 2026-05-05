import Link from "next/link";

export default function Sidebar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
            <div className="container">
                <Link className="navbar-brand" href="/">Dashboard</Link>
                <Link className="navbar-brand" href="/">Applications</Link>
                <Link className="navbar-brand" href="/">Companies</Link>
                <Link className="navbar-brand" href="/">Tasks</Link>
                <Link className="navbar-brand" href="/">Analytics</Link>
                <Link className="navbar-brand" href="/">Settings</Link>
            </div>
        </nav>
    )
}