import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import { Dashboard } from './pages/Dashboard.jsx';
import { Upload } from './pages/Upload.jsx';
import App from './App.jsx';
import './index.css';

const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {index: true, Component: Dashboard},
      {path: "/upload", Component: Upload},
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
