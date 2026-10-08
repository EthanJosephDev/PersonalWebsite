import { createRoot, hydrateRoot } from "react-dom/client";
import Sentinel from "./pages/Sentinel";

const root = document.getElementById("root")!;
if (root.hasChildNodes()) hydrateRoot(root, <Sentinel />);
else createRoot(root).render(<Sentinel />);
