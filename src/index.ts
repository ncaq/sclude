// re exportする
// export formを使うとJavaScript側でside effectが消えてしまう
// [Re-exports of external modules with side effects are erased from ES5 targets · Issue #6835 · Microsoft/TypeScript](https://github.com/Microsoft/TypeScript/issues/6835)

import * as Array from "./Array";
import * as String from "./String";

export { Array, String };
