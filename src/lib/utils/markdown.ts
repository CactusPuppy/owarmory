import snarkdown from "snarkdown";
// import DOMPurify from "isomorphic-dompurify";

export function markdown(text: string): string {
  let parsed = snarkdown(text);
  parsed = updateLinkTargets(parsed);
  parsed = updateHeadingAriaLevels(parsed);

  // return DOMPurify.sanitize(parsed);
  return parsed;
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

// Insert aria-level tags for h1 and h2 titles, retaining their styling, but making sure we control their importance.
function updateHeadingAriaLevels(text: string): string {
  return text.replace(/<h1>/g, '<h1 aria-level="3">').replace(/<h2>/g, '<h2 aria-level="3">');
}
