# @atomico/lazy

[![CircleCI](https://circleci.com/gh/atomicojs/lazy.svg?style=svg)](https://circleci.com/gh/atomicojs/lazy)
[![npm](https://badgen.net/npm/v/@atomico/lazy)](http://npmjs.com/@atomico/lazy)
[![gzip](https://badgen.net/bundlephobia/minzip/@atomico/lazy)](https://bundlephobia.com/result?p=@atomico/lazy)

This function allows the dynamic importation of components.

```jsx
import { h } from "@atomico/core";
import { lazy } from "@atomio/lazy";
import Loading from "./components/loading";

let PageHome = lazy(() => import("./pages/home"));

function App() {
	return <PageHome loading={<Loading title="loading home..." />} />;
}
```

| Property | Type          | Description                                                                    |
| -------- | ------------- | ------------------------------------------------------------------------------ |
| loading  | string, vnode | the loading property will be tricked while waiting for the module's resolution |

## useLazy

This hooks allows to generate the same effect as lazy, but without depending on HoCs.

```jsx
function importHome() {
	return import("./page/home");
}
function App() {
	let state = useLazy(importHome);
	return state.loading ? "loading..." : state.default;
}
```
