import { Editor } from 'obsidian'

export class ObsidianEditor {
  constructor(private _editor: Editor) {}

  insertHtmlAtSelectionOrCursor(html: string) {
    const formattedHtml = html.trim().concat('\n\n')

    if (this._editor.somethingSelected()) {
      this._editor.replaceSelection(formattedHtml)
      const pos = this._editor.getCursor()
      this._editor.setCursor(pos)
    } else {
      const from = this._editor.getCursor()
      this._editor.replaceRange(formattedHtml, from)
      const after = this._editor.offsetToPos(this._editor.posToOffset(from) + formattedHtml.length)
      this._editor.setCursor(after)
    }
  }

  async insertPlaceholderThenReplace(placeholderHtml: string, produceHtml: () => Promise<string>) {
    let from, to

    if (this._editor.somethingSelected()) {
      // Replace selection with placeholder and measure its range
      this._editor.replaceSelection(placeholderHtml)
      to = this._editor.getCursor()
      from = this._editor.offsetToPos(this._editor.posToOffset(to) - placeholderHtml.length)
    } else {
      // Insert placeholder at current cursor and compute its range by offsets
      from = this._editor.getCursor()
      const startOffset = this._editor.posToOffset(from)
      this._editor.replaceRange(placeholderHtml, from)
      const endOffset = startOffset + placeholderHtml.length
      to = this._editor.offsetToPos(endOffset)
      // Put caret at end of placeholder while we fetch
      this._editor.setCursor(to)
    }

    const html = await produceHtml()
    const formattedHtml = html.trim().concat('\n\n')

    // Replace the exact placeholder range with final HTML
    this._editor.replaceRange(formattedHtml, from, to)

    // Move caret to just after the inserted HTML
    const after = this._editor.offsetToPos(this._editor.posToOffset(from) + formattedHtml.length)
    this._editor.setCursor(after)
  }
}
