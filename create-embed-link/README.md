# Create Embed Link — Obsidian Plugin

Easily embed external content like YouTube videos, Spotify music, or generic website links directly into your notes.

## Features

- **Embed YouTube videos** using iframe. Supports both plain URLs and pre-generated embed links.
- **Embed Spotify tracks, albums, or playlists** using iframe. Supports both plain URLs and pre-generated embed links.
- **Embed any website link** as a rich link card (fetches Open Graph title, description, and image).
- Simple **prompt input** to enter the URL.
- **Modern card-style CSS** for rich links with image, title, and description.
- Works with hotkeys and the Command Palette.

## Commands

- **Embed URL**: Prompts for a URL and inserts the appropriate embed block at the cursor position.

### Behavior

- **YouTube URLs**: Converts standard or short YouTube links into an embedded iframe. Already embedded URLs are preserved.
- **Spotify URLs**: Converts track, album, or playlist links into an embedded iframe player. Already embedded URLs are preserved.
- **Other website URLs**: Fetches Open Graph metadata (title, description, image) and creates a rich link card.
- Invalid or unsupported URLs will display a notice.

## Usage

1. Place your cursor where you want to embed content.
2. Run the **Embed URL** command (from Command Palette or hotkey).
3. Enter the URL in the prompt.
4. The embed block will be inserted:

**YouTube example:**

```md
<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen></iframe>
```

**Spotify example:**

```md
<iframe src="https://open.spotify.com/embed/track/6rqhFgbbKwnb9MLmUQDhG6" width="100%" height="152" frameBorder="0" allowfullscreen></iframe>
```

**Generic website example:**

```md
<div class="rich-link">
  <a href="https://example.com" target="_blank">
    <img src="https://example.com/og-image.jpg" alt="Example Website">
    <div>
      <h4>Example Website</h4>
      <p>Short description from Open Graph</p>
    </div>
  </a>
</div>
```

**Preview screenshot:**

![Rich Link Card Example](https://user-images.githubusercontent.com/WillACosta/screenshots/rich-link-preview.png)

## ⚙️ Settings

Open **Settings → Plugin Options → Create Image Caption** to configure:

- **Use default rich style (styles.css)**
  Toggle between using the bundled `styles.css` (recommended) or a minimal inline fallback style.
  Advanced users can disable both and provide custom CSS snippets.

- **Embed width / height**
  Customize the dimensions of YouTube and Spotify embeds.

- **Enable YouTube embeds**
  Automatically embed YouTube links.

- **Enable Spotify embeds**
  Automatically embed Spotify tracks, albums, and playlists.

- **Enable generic website embeds**
  Uses [Microlink API](https://microlink.io) to fetch link previews (title, description, and image).
  Works with most websites.

## 🎨 Style Switching

- When **enabled (default)** → the plugin loads `styles.css` automatically.
- When **disabled** → a lightweight inline style is injected.
- You can also completely override styles by disabling both and providing your own CSS snippet in Obsidian.

## 📸 Example

![Embed Examples](docs/screenshots/embed-examples.png)

## Installation (Manual)

1. Build the plugin:

   ```bash
   npm install
   npm run build
   ```

2. Copy the folder into your vault’s plugin directory: `<vault>/.obsidian/plugins/create-embed-link/`

   - `manifest.json`
   - `main.js` (from build)
   - `styles.css` (optional)

3. Reload Obsidian and enable **Create Embed Link** in **Community Plugins**.

## Development

- `npm run dev` – watch mode
- `npm run build` – production bundle

## Notes

- Iframes only render in preview mode.
- Some websites may block embedding via iframe (`X-Frame-Options` header).
- Rich links can be styled using the `.rich-link` CSS class or through your theme.

## License

MIT
