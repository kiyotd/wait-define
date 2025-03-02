# wait-define

[![npm version](https://img.shields.io/npm/v/@kiyotd/wait-define.svg)](https://www.npmjs.com/package/@kiyotd/wait-define)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9%2B-blue)](https://www.typescriptlang.org/)

An asynchronous function that waits until a property of an object is defined.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Basic Example](#basic-example)
  - [Advanced Examples](#advanced-examples)
- [API Reference](#api-reference)
  - [Arguments](#arguments)
  - [Returns](#returns)
- [TypeScript Support](#typescript-support)
- [License](#license)

## Installation

```bash
# Using npm
npm install @kiyotd/wait-define

# Using yarn
yarn add @kiyotd/wait-define
```

## Usage

### Basic Example

If you wait until `window.hello` is defined:

```typescript
import { waitDefine } from '@kiyotd/wait-define';

document.addEventListener('DOMContentLoaded', async () => {
  console.log('waiting for window.hello ...');

  setTimeout(() => {
    // @ts-ignore
    window.hello = 'world';
  }, 2500);

  waitDefine('hello', window, 100, 2000)
    .then(() => {
      console.log('window.hello is defined!');
    })
    .catch((error) => {
      console.error('An error occurred:', error);
    });
});
```

In the above example, `window.hello` is defined after `2500ms`, but an error occurs because the monitoring time is only up to `2000ms`.

### Advanced Examples

#### Waiting for a nested property

```typescript
import { waitDefine } from '@kiyotd/wait-define';

// Create an object with a nested structure
const data = { user: {} };

// Set the nested property after a delay
setTimeout(() => {
  data.user.profile = { name: 'John', age: 30 };
}, 1000);

// Wait for the nested property to be defined
waitDefine('profile', data.user, 100, 2000)
  .then(() => {
    console.log('User profile is now available:', data.user.profile);
  })
  .catch((error) => {
    console.error('Failed to get user profile:', error);
  });
```

#### Using with async/await

```typescript
import { waitDefine } from '@kiyotd/wait-define';

async function loadData() {
  try {
    // Wait for API data to be loaded into window.apiData
    await waitDefine('apiData', window, 100, 5000);

    // Now we can safely use window.apiData
    const userData = window.apiData.users;
    console.log('User data loaded:', userData);

    return userData;
  } catch (error) {
    console.error('Failed to load API data:', error);
    throw error;
  }
}

// Call the async function
loadData().then(data => {
  // Process the data
});
```

## API Reference

### Arguments

| Name           | Type     | Description                                                                                                                                                                                |
|----------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `propertyName` | `string` | The property name to wait for definition                                                                                                                                                   |
| `obj`          | `any`    | Object waiting for property definition                                                                                                                                                     |
| `interval_ms`  | `number` | Interval (in milliseconds) to check definitions. Default is 100 milliseconds.                                                                                                               |
| `timeout_ms`   | `number` | Time (in milliseconds) to exit wait and throw an error. If not specified, waits indefinitely until the definition is confirmed.                                                             |

### Returns

Returns a Promise that resolves when the property is defined. If a timeout is specified and the property is not defined within that time, the Promise will be rejected with a timeout error.

## TypeScript Support

This library is written in TypeScript and includes type definitions. No additional installation is needed for TypeScript support.

```typescript
// Type definition
function waitDefine(
  propertyName: string,
  obj: any,
  interval_ms?: number,
  timeout_ms?: number
): Promise<void>;
```


## License

MIT
