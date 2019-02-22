[![Published on NPM](https://img.shields.io/npm/v/@advanced-rest-client/files-payload-editor.svg)](https://www.npmjs.com/package/@advanced-rest-client/files-payload-editor)

[![Build Status](https://travis-ci.org/advanced-rest-client/files-payload-editor.svg?branch=stage)](https://travis-ci.org/advanced-rest-client/files-payload-editor)  

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/advanced-rest-client/files-payload-editor)

# files-payload-editor

`<files-payload-editor>` A request body editor to add files as a payload.
With this element the user can select single file that will be used in the request body.

As other payload editors it fires `payload-value-changed` custom event when value change.

The element can be used in forms when `iron-form` is used. It contains validation methods to
validate user input.

<!---
```
<custom-element-demo>
  <template>
    <link rel="import" href="files-payload-editor.html">
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
<files-payload-editor></files-payload-editor>
```

### API components

This components is a part of [API components ecosystem](https://elements.advancedrestclient.com/)

## Usage

### Installation
```
npm install --save @advanced-rest-client/files-payload-editor
```

### In an html file

```html
<html>
  <head>
    <script type="module">
      import '@advanced-rest-client/files-payload-editor/files-payload-editor.js';
    </script>
  </head>
  <body>
    <files-payload-editor></files-payload-editor>
  </body>
</html>
```

### In a Polymer 3 element

```js
import {PolymerElement, html} from '@polymer/polymer';
import '@advanced-rest-client/files-payload-editor/files-payload-editor.js';

class SampleElement extends PolymerElement {
  static get template() {
    return html`
    <files-payload-editor></files-payload-editor>
    `;
  }
}
customElements.define('sample-element', SampleElement);
```

### Installation

```sh
git clone https://github.com/advanced-rest-client/files-payload-editor
cd api-url-editor
npm install
npm install -g polymer-cli
```

### Running the demo locally

```sh
polymer serve --npm
open http://127.0.0.1:<port>/demo/
```

### Running the tests
```sh
polymer test --npm
```
