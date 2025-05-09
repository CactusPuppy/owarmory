<script lang="ts">
  import TalentRichInsert from "./TalentRichInsert.svelte";

  interface Props {
    text: string;
    /** HTML will be rendered when true. Only enable if the given text is actually sanitized. No cheating. */
    sanitized?: boolean;
  }

  const { text, sanitized = false }: Props = $props();

  const segments = parseText(text);

  // Parse given text to separate text from {{tags}}. Returning regular text with `type: "text"`,
  // and tags with `type: "tag"`. Text is insert as html, tags are insert as Svelte components.
  function parseText(text: string): { type: string; content: string }[] {
    const regex = /\{\{(.+?)\}\}/g;
    const result = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      // Text between the index of the last tag and the found tag
      if (match.index > lastIndex) {
        result.push({ type: "text", content: text.slice(lastIndex, match.index) });
      }

      // All content inside of the found tag
      result.push({ type: "tag", content: match[1] });
      lastIndex = regex.lastIndex;
    }

    // All remaining text after the last tag
    if (lastIndex < text.length) {
      result.push({ type: "text", content: text.slice(lastIndex) });
    }

    return result;
  }
</script>

<span>
  <!-- eslint-disable-next-line svelte/require-each-key -->
  {#each segments as { type, content }}
    {#if type === "text"}
      {#if sanitized}
        <!-- eslint-disable-next-line svelte/no-at-html-tags -->
        {@html content}
      {:else}
        {content}
      {/if}
    {:else if type === "tag"}
      <TalentRichInsert talentName={content} />
    {/if}
  {/each}
</span>
