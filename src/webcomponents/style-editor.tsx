import { createRoot } from "react-dom/client";
import { Styles } from "../types/css";
import { Editor } from "../components/Editor";
import isNil from "lodash-es/isNil";

type RawStyle = Styles;

type StyleEditorOptions = {
  selector: string;
  properties: string[];
  autoAttach: boolean;
  defaultStyles: RawStyle;
  onSave: (styles: RawStyle) => void;
};

export class StyleEditor extends HTMLElement {
  private options: StyleEditorOptions | null = null;
  private selector: string = '';
  private properties: string[] = [];
  private _styles: RawStyle = {};
  private onChange: ((styles: RawStyle) => void);

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.onChange = (styles: RawStyle) => {
      this._styles = styles;
    };
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot!.innerHTML = `
      <style>
        :host {
          display: block;
        }
      </style>
      <div class="style-editor"></div>
    `;
    const ele = this.shadowRoot!.querySelector('.style-editor')!;
    createRoot(ele).render(<Editor styles={this._styles} onChange={this.onChange}></Editor>);
  }

  init(options: StyleEditorOptions) {
    if (isNil(options)) {
      throw new Error('No options provided');
    }
    this.options = options;
    this.selector = options.selector;
    this.properties = options.properties;
    this._styles = options.defaultStyles ?? { fontSize: '14px' };
  }

  set styles(value: RawStyle) {
    this._styles = value;
  }

  get styles() {
    return this._styles;
  }

  show() {
    this.render();
  }

  hide() {
  }

  save() {
    this.options?.onSave(this._styles);
  }

}
