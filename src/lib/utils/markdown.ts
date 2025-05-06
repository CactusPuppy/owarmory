import snarkdown from "snarkdown";
import DOMPurify from "isomorphic-dompurify";

export function markdown(text: string): string {
  let parsed = snarkdown(text);
  parsed = updateLinkTargets(parsed);

  return DOMPurify.sanitize(parsed);
}

// Links generated with Snarkdown are flat links. We'd prefer them to open in a new tab and with nofollow.
// We could improve on this by checking if the link is internal or not, but let's see if that's actually necessary.
// https://github.com/developit/snarkdown/issues/5#issuecomment-282924371
function updateLinkTargets(text: string): string {
  return text.replace(
    /(<a href="(https?:)?\/\/.*?")>/g,
    '$1 target="_blank" rel="noreferrer noopener nofollow">',
  );
}
