/**
 * 指定されたプロパティがオブジェクトに定義されるまで待機します。
 *
 * @param propertyName - 定義を待つプロパティ名
 * @param obj - プロパティの定義を待つオブジェクト
 * @param interval_ms - 定義を確認する間隔（ミリ秒）。デフォルトは100ミリ秒。
 * @param timeout_ms - 待機を終了し、エラーをスローするまでの時間（ミリ秒）。指定しない場合、定義が確認されるまで無限に待ちます。
 * @returns プロパティが定義されたら解決されるPromise
 *
 * @example
 * // window.posts が定義されるまで待つ
 * waitDefine('posts', window, 100, 5000)
 *   .then(() => console.log("The window.posts is defined!"))
 *   .catch((error) => console.error(`Error: ${error.message}`));
 */
export function waitDefine(
  propertyName: string,
  obj: any,
  interval_ms: number = 100,
  timeout_ms?: number,
): Promise<void> {
  return new Promise((resolve, reject): void => {
    let intervalId: NodeJS.Timeout;

    const check = new Promise<void>((resolve) => {
      intervalId = setInterval(() => {
        if (obj[propertyName] !== undefined) {
          clearInterval(intervalId);
          resolve();
        }
      }, interval_ms);
    });

    const timeout = new Promise<void>((_, reject) => {
      if (timeout_ms !== undefined) {
        setTimeout(() => {
          clearInterval(intervalId);
          reject(new Error(`Timeout of ${timeout_ms}ms exceeded.`));
        }, timeout_ms);
      }
    });

    Promise.race([check, timeout]).then(resolve, reject);
  });
}
