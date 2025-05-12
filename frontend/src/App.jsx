import { Outlet, NavLink } from "react-router";

function App() {
  return (
    <main className="container">
      <nav>
        <ul>
          <li><strong>Docsx</strong></li>
        </ul>
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/upload">Upload</NavLink></li>
        </ul>
      </nav>
      <Outlet />
    </main>
  )
}

export default App
