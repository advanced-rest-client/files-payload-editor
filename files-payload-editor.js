/**
@license
Copyright 2018 The Advanced REST client authors <arc@mulesoft.com>
Licensed under the Apache License, Version 2.0 (the "License"); you may not
use this file except in compliance with the License. You may obtain a copy of
the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations under
the License.
*/
import {IronValidatableBehavior} from '../../@polymer/iron-validatable-behavior/iron-validatable-behavior.js';
import {html} from '../../@polymer/polymer/lib/utils/html-tag.js';
import {mixinBehaviors} from '../../@polymer/polymer/lib/legacy/class.js';
import {PolymerElement} from '../../@polymer/polymer/polymer-element.js';
import '../../@advanced-rest-client/arc-icons/arc-icons.js';
import '../../@polymer/paper-button/paper-button.js';
import '../../@polymer/paper-icon-button/paper-icon-button.js';
import '../../@polymer/iron-icon/iron-icon.js';
let latestFile;
/**
 * `<files-payload-editor>` A request body editor to add files as a payload.
 *
 * With this element the user can select single file that will be used in the request body.
 *
 * As other payload editors it fires `payload-value-changed` custom event when value change.
 *
 * The element can be used in forms when `iron-form` is used. It contains validation methods to
 * validate user input.
 *
 * ### Example
 *
 * ```html
 * <files-payload-editor></files-payload-editor>
 * ```
 *
 * ### Styling
 * `<files-payload-editor>` provides the following custom properties and mixins for styling:
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--files-payload-editor-file-trigger-color` | Color of the file input | `--accent-color` or `#FF5722`
 * `--files-payload-editor-file-summary-color` | Color of the selected file summary | `rgba(0,0,0,0.74)`
 * `--files-payload-editor-selected-file-name-color` | Selected file name label color | `rgba(0,0,0,0.74)`
 * `--files-payload-editor-selected-file-icon-color` | Color of the icon in the selected file section | `--accent-color` or `#2196F3`
 * `--inline-fom-action-icon-color` | Theme variable, color of the delete icon | `rgba(0, 0, 0, 0.74)`
 * `--inline-fom-action-icon-color-hover` | Theme variable, color of the delete icon when hovering | `--accent-color` or `rgba(0, 0, 0, 0.74)`
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 * @appliesMixin Polymer.IronValidatableBehavior
 * @memberof ApiComponents
 */
class FilesPayloadEditor extends mixinBehaviors([IronValidatableBehavior], PolymerElement) {
  static get template() {
    return html`
    <style>
    :host {
      display: block;
      padding: 12px 0;
    }

    .selector {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .list {
      margin: 0 0.29em;
      display: inline-block;
      margin-top: 12px;
    }

    paper-material {
      padding: 0.4em 0.57em;
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .file-trigger {
      margin-right: 12px;
      color: var(--files-payload-editor-file-trigger-color, var(--accent-color, #FF5722));
    }

    .files-counter-message {
      flex: 1;
      flex-basis: 0.000000001px;
      @apply --arc-font-body1;
      color: var(--files-payload-editor-file-summary-color, rgba(0,0,0,0.74));
    }

    .file-icon {
      color: var(--files-payload-editor-selected-file-icon-color, var(--accent-color, #2196F3));
    }

    .delete-icon {
      color: var(--inline-fom-action-icon-color, rgba(0, 0, 0, 0.74));
      transition: color 0.2s linear;
    }

    .delete-icon:hover {
      color: var(--inline-fom-action-icon-color-hover, var(--accent-color, rgba(0, 0, 0, 0.74)));
    }

    .file-name {
      @apply --arc-font-body1;
      margin-left: 8px;
      color: var(--files-payload-editor-selected-file-name-color, rgba(0,0,0,0.74));
    }

    .card {
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                  0 1px 5px 0 rgba(0, 0, 0, 0.12),
                  0 3px 1px -2px rgba(0, 0, 0, 0.2);
    }
    </style>
    <div class="selector">
      <paper-button raised="" on-tap="_selectFile" class="file-trigger">Choose a file</paper-button>
      <template is="dom-if" if="[[hasFile]]">
        <span class="files-counter-message" hidden\$="[[!hasFile]]">1 file selected, [[fileSize]] bytes</span>
      </template>
    </div>
    <template is="dom-if" if="[[hasFile]]">
      <div class="list">
        <div class="card">
          <iron-icon class="file-icon" icon="arc:insert-drive-file"></iron-icon>
          <span class="file-name">[[fileName]]</span>
          <paper-icon-button class="action-icon delete-icon"
            icon="arc:remove-circle-outline" hidden\$="[[!hasFile]]"
            title="Clear file" on-click="removeFile"></paper-icon-button>
        </div>
      </div>
    </template>
    <input type="file" hidden="" on-change="_fileObjectChanged">
`;
  }

  static get is() {
    return 'files-payload-editor';
  }
  static get properties() {
    return {
      // Computed value, true if the control has files.
      hasFile: {
        type: Boolean,
        readOnly: true
      },
      /**
       * If set the value will be base64 encoded.
       */
      base64Encode: Boolean,
      // Selected file name
      fileName: String,
      // Selected file size,
      fileSize: Number,
      /**
       * Value produced by this control.
       *
       * @type {Blob}
       */
      value: {
        type: Object,
        notify: true,
        observer: '_valueChnaged'
      }
    };
  }
  /**
   * Returns a reference to the input element.
   *
   * @return {HTMLElement}
   */
  _getInput() {
    return this.shadowRoot.querySelector('input[type="file"]');
  }

  _valueChnaged(value) {
    if (!value) {
      return;
    }
    if (value instanceof Blob) {
      this.set('fileName', value.name || 'blob');
      this.set('fileSize', value.size);
      this._setHasFile(true);
      latestFile = value;
    } else {
      this._setHasFile(false);
    }
    if (!this.fileName || (!this.fileSize && this.fileSize !== 0)) {
      this._updateFileMeta(value);
      return;
    }
    let type;
    if (value.type) {
      type = value.type;
    } else {
      type = 'application/octet-stream';
    }
    setTimeout(() => {
      this._informContentType(type);
    });
  }
  /**
   * Updated `fileName` and `fileSize` from a base64 encoded string value
   *
   * @param {String} value File as base64 string
   */
  _updateFileMeta(value) {
    if (!value || typeof value !== 'string') {
      if (latestFile) {
        this.value = latestFile;
        return;
      }
      this._setHasFile(false);
      return;
    }
    let type;
    if (value.indexOf('data:') === 0) {
      value = value.substr(5);
      const comaIndex = value.indexOf(',');
      type = value.substr(0, value.indexOf(';'));
      value = value.substr(comaIndex + 1);
    }
    let byteChars;
    try {
      byteChars = atob(value);
      this._setHasFile(true);
    } catch (e) {
      if (latestFile) {
        this.value = latestFile;
        return;
      }
      this._setHasFile(false);
    }
    type = type || 'application/octet-stream';
    this._informContentType(type);
    this.set('fileName', 'blob');
    this.set('fileSize', byteChars ? byteChars.length : -1);
  }
  /**
   * Dispatches `content-type-changed` custom event change when a
   * file is selected.
   *
   * @param {String} ct File content type
   */
  _informContentType(ct) {
    const e = new CustomEvent('content-type-changed', {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {
        value: ct
      }
    });
    this.dispatchEvent(e);
  }
  /**
   * A handler to choose file button click.
   * This function will find a proper input[type="file"] and programatically click on it to open
   * file dialog.
   */
  _selectFile() {
    const file = this._getInput();
    file.click();
  }

  /**
   * A handler to file change event for input[type="file"].
   * This will update files array for corresponding `this.value` array object.
   *
   * @param {Event} e Input change event
   */
  _fileObjectChanged(e) {
    this._setFileValue(e.target.files[0]);
    this._getInput().blur();
  }
  /**
   * Sets the `value` depending on `base64Encode` option.
   *
   * @param {Blob} file A file to set as a value.
   */
  _setFileValue(file) {
    if (!file) {
      this.set('value', undefined);
      return;
    }
    if (!this.base64Encode) {
      this.set('value', file);
      return;
    }
    const reader = new FileReader();
    const context = this;
    reader.addEventListener('load', function() {
      const typed = new Uint8Array(reader.result);
      const result = btoa(String.fromCharCode.apply(null, typed));
      context.set('value', result);
      context.__informBase64Conversion();
    });
    reader.addEventListener('error', function() {
      console.warn('File value processing error');
      context.set('value', 'Invalid file');
      context.__informBase64Conversion();
    });
    reader.readAsArrayBuffer(file);
  }
  // Send an event when base64 conversion ends
  __informBase64Conversion() {
    const e = new CustomEvent('base64-value-set', {
      bubbles: false,
      cancelable: true
    });
    this.dispatchEvent(e);
  }
  // Overides Polymer.IronValidatableBehavior
  _getValidity() {
    return this._computeHasFile(this.value);
  }

  _computeHasFile(file) {
    if (!file) {
      return false;
    }
    const enc = this.base64Encode;
    if (enc) {
      return !!file;
    }
    return file instanceof Blob;
  }
  /**
   * Removed added file from the editor.
   */
  removeFile() {
    this.value = undefined;
    this.fileName = undefined;
    this.fileSize = undefined;
    this._setHasFile(false);
    const file = this._getInput();
    file.value = '';
  }
  /**
   * The element keeps in memory last selected file so it can be restored.
   * This removes reference to the object so it can be GSd.
   */
  clearCache() {
    latestFile = undefined;
  }
}
window.customElements.define(FilesPayloadEditor.is, FilesPayloadEditor);
