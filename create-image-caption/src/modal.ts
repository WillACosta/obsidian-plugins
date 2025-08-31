import { App, Modal } from 'obsidian'

type NullableString = string | null
type OnSubmit = (value: NullableString) => void

interface Props {
  app: App
  placeholder: NullableString
  title: string
  onSubmit?: OnSubmit
}

export class InputModal extends Modal {
  public result: NullableString = null
  private placeholder: NullableString
  private title: string
  private onSubmit?: OnSubmit

  constructor({ app, title, placeholder = null, onSubmit }: Props) {
    super(app)
    this.placeholder = placeholder
    this.title = title
    this.onSubmit = onSubmit
  }

  private _handleSubmit(value: NullableString) {
    this.result = value
    this.onSubmit?.call(null, value)
    this.close()
  }

  onOpen() {
    const { contentEl } = this
    contentEl.createEl('h3', { text: this.title })

    const input = contentEl.createEl('input', {
      type: 'text',
      attr: { placeholder: this.placeholder },
    })

    input.style.width = '100%'
    input.style.marginBottom = '12px'

    input.focus()

    input.addEventListener('keydown', (evt) => {
      if (evt.key === 'Enter') {
        this._handleSubmit(input.value)
      } else if (evt.key === 'Escape') {
        this._handleSubmit(null)
      }
    })

    const submitBtn = contentEl.createEl('button', { text: 'Embed' })
    submitBtn.style.width = '100%'
    submitBtn.style.padding = '6px'
    submitBtn.onclick = () => {
      this._handleSubmit(input.value)
    }
  }

  onClose() {
    this.contentEl.empty()
  }
}
