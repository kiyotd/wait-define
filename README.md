# wait-define

オブジェクトのプロパティが定義されるまで待つ非同期関数です。

An asynchronous function that waits until a property of an object is defined.

## Installation

```bash
npm i @kiyotd/wait-define
```

## Examples

`window.hello` が定義されるまで待つ場合

If you wait until `window.hello` is defined

`main.ts`

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

上記の例では、`2500ms` 後に `window.hello` が定義されますが、監視時間は `2000ms` までなのでエラーが発生します。

In the above example, `window.hello` is defined after `2500ms`, but an error occurs because the monitoring time is up
to `2000ms`.

## Arguments

| Name           | Type     | Description                                                                                                                                                                                |
|----------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `propertyName` | `string` | 定義を待つプロパティ名<br/>The property name to wait for definition                                                                                                                                   |
| `obj`          | `any`    | プロパティの定義を待つオブジェクト<br />Object waiting for property definition                                                                                                                              |
| `interval_ms`  | `number` | 定義を確認する間隔（ミリ秒）。デフォルトは100ミリ秒。<br />Interval (in milliseconds) to check definitions. Default is 100 milliseconds.                                                                            |
| `timeout_ms`   | `number` | 待機を終了し、エラーをスローするまでの時間（ミリ秒）。指定しない場合、定義が確認されるまで無限に待ちます。<br />Time (in milliseconds) to exit wait and throw an error. If not specified, waits indefinitely until the definition is confirmed. |

## Returns

プロパティが定義されたら解決されるPromiseを返します。

Returns a Promise that resolves when the property is defined.

## License

MIT
