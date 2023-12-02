import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

console.log(
  "Path of file in parent dir:",
  path.resolve(__dirname, "../day2.ts"),
);
console.log("Path of file in parent dir:", path.resolve(__dirname, ""));
