import DOMPurify from "isomorphic-dompurify";
import { JSDOM } from "jsdom";

const window = new JSDOM("").window;
export default DOMPurify(window);
