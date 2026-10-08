import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { createServer } from "vite";
import { createElement } from "react";
import { renderToString } from "react-dom/server";

// Emit real HTML for GitHub Pages, link previews, and visitors without JavaScript.
// The same React component is hydrated by the standalone Sentinel entry point.
const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});
try {
  const { default: Sentinel } = await server.ssrLoadModule(
    "/src/pages/Sentinel.tsx",
  );
  const path = resolve("dist/sentinel/index.html");
  const template = await readFile(path, "utf8");
  if (!template.includes('<div id="root"></div>'))
    throw new Error("Sentinel HTML root not found");
  const content = renderToString(createElement(Sentinel));
  await mkdir(resolve("dist/sentinel"), { recursive: true });
  await writeFile(
    path,
    template.replace(
      '<div id="root"></div>',
      `<div id="root">${content}</div>`,
    ),
  );
  console.log("Prerendered /sentinel/ with complete page content.");
} finally {
  await server.close();
}
