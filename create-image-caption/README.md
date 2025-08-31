# Create Image Caption — Obsidian Plugin

Add captions to images or wrap the current selection in a customizable HTML element.

## Features

- **Wrap selection** with a caption element (default: `<span class="image-caption">…</span>`)
- **Add caption below image** on the current line (supports both Markdown images `![alt](path)` and Obsidian wikilink images `![[image.png]]`)
- Built-in **prompt input**: if no text is selected, the plugin asks for the caption text before inserting
- **Configurable** tag name (`span`, `div`, `figcaption`, …) and CSS class
- Built-in **default styles**, plus a **Custom CSS** box for user-defined tweaks
- Works with hotkeys and Command Palette

## Commands

- **Wrap selection in caption**
- **Add caption below current image**

  - If you select text → uses it as the caption
  - If no selection → prompts for caption text
  - Works with Markdown images (`![alt](path)`) and wikilink images (`![[image.png]]`)

Assign hotkeys in **Settings → Hotkeys**.

## Settings

- **Tag name**: HTML tag to use (default: `span`)
- **Class name**: CSS class applied (default: `image-caption`)
- **Enable default styles**: toggles the built-in appearance
- **Custom CSS**: appended after the default (or used alone if defaults are disabled)

### Default CSS (when enabled)

```css
.image-caption {
  font-size: smaller;
  color: #637282;
  font-style: italic;
  display: block;
  text-align: center;
  margin-top: 0.25rem;
}
```

## Usage

### Wrap selection

1. Select text in the editor.
2. Run **Wrap selection in caption** (or your hotkey).

### Add caption below an image

1. Place the cursor on a line with a Markdown or wikilink image, e.g. `![alt](path)` or `![[image.png]]`.
2. Optionally select text to use as the caption.
3. Run **Add caption below current image**. If no selection exists, a prompt will appear asking for the caption text.
4. The caption element is inserted on the next line.

Example:

```md
![[eiffel.jpg]]
<span class="image-caption">Eiffel Tower, 2023</span>
```

## Installation (Manual)

1. Build the plugin:

   ```bash
   npm i
   npm run build
   ```

2. Copy these files into your vault’s plugin folder: `<vault>/.obsidian/plugins/create-image-caption/`

   - `manifest.json`
   - `main.js` (created by the build)
   - `styles.css` (optional)

3. Reload Obsidian and enable **Create Image Legend** under **Community plugins**.

## Development

- `npm run dev` – watch mode
- `npm run build` – production bundle

## Notes

- The plugin injects CSS dynamically so changes to **Class name**, **Default styles**, or **Custom CSS** apply immediately.
- If you prefer theme snippets, you can disable default styles and keep **Custom CSS** empty, then style `.${className}` in your theme/snippet.

## License

MIT
