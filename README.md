[![Build Status](https://travis-ci.org/ncaq/sclude.svg?branch=master)](https://travis-ci.org/ncaq/sclude)

# sclude

Scludeは主に[HaskellのPrelude](https://www.stackage.org/package/base)にある関数を,
TypeScriptかJavaScriptの標準ビルドインオブジェクトのメソッドとして,
持ち込むことを目的としたパッケージです.

Sclude is a package intended mainly to bring functions in
[Prelude of Haskell](https://www.stackage.org/package/base)
into TypeScript or JavaScript as methods of standard built in objects.

# To Use

## JavaScript

~~~js
require('sclude');

console.log([1, 2, 3].subsequences)
~~~

## TypeScript

~~~ts
import "sclude";

console.log([1, 2, 3].subsequences);
~~~

# Support language

Sclude自体はTypeScriptで書かれています.
しかしJavaScript(ES2016)以降でも快適に使えるように考えられています.
Flowは対応したいですが簡単にやる方法を知らないのでサポートしていません.

Sclude itself is written in TypeScript.
However, it is thought that it can be used comfortably even after JavaScript (ES2016).
Flow wants to correspond, but does not support it because it does not know how to do it easily.

# Difference from the original Haskell version

ScludeはオリジナルのHaskell版のAPIをあまり重視せずに,
JavaScript標準オブジェクトのライブラリとの親和性を重視しています.

例えば`insertBy`の比較関数`compare`はenum型`Ordering`を返さずに,
`sort`との一貫性を保てる`number`を返します.

Sclude places great emphasis on compatibility with libraries of JavaScript standard objects
without giving much emphasis to the original Haskell version API.

For example, `compare` compare` insertBy` returns `number` which maintains consistency
with` sort` instead of returning enum type `Ordering`.

# TypeScript Optional

Scludeは
[typescript-optional](https://www.npmjs.com/package/typescript-optional)
のオブジェクトを返り値として使います.

Sclude is [typescript-optional](https://www.npmjs.com/package/typescript-optional) We use the
object as a return value.

# Why do I write Sclude

JavaScriptは`takeWhile`など基本的なアルゴリズム関数を欠いていて,とても面倒です.

JavaScript lacks basic algorithm functions such as `takeWhile`, which is very troublesome.

# Why do not I use Lodash

[Lodash](https://lodash.com/)は良いライブラリですが,
標準ライブラリがメソッド記法を使っているなら,
統一してメソッド記法を使いたい.

[Lodash](https://lodash.com/) is a good library,
but if the standard library uses method notation,
I would like to use method notation consistently.

# Bad thing is to extend the prototype

prototypeを拡張する以外に良い方法があれば私もそうしていました.
しかし,今のJavaScriptにはモジュールがありますし,
TypeScriptを使えば被さりはチェック出来るので昔よりは行って良いのでは無いでしょうか.
これは[Mikutter](https://mikutter.hachune.net/)なら普通のことです.

If there was a good way to extend prototype, I did as well.
But now JavaScript has modules,
If you use TypeScript you can check cloudiness so it might not be better than before.
This is normal for [Mikutter](https://mikutter.hachune.net/).

# There is no method that

TypeScriptで型安全にメソッド記法で実装する方法がわからないものは実装していません.
方法がわかったら実装します.

I do not implement those that do not know how to type safely in TypeScript by method notation.
I implement if I know how.

# There are other similar libraries though

ScludeがTypeScriptでHaskellのライブラリをどこまで再現できるのか実験した,
副産物というのは否定できません.

I can not deny that Sclude is a by-product that
I experimented with TypeScript to see how far I can reproduce Haskell 's library.
