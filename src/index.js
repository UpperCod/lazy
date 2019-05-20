import { h, useEffect, useState } from "@atomico/core";

/**
 * It allows to load a component asynchronously.
 * @param {Function} callback
 * @return {object}
 */
export function lazy(callback) {
	return ({ loading, ...props }) => {
		let state = useImport(callback, props);

		if (state.wait) return;

		return state.loading
			? loading
			: typeof state.default == "function"
			? h(state.default, props)
			: state.default;
	};
}
/**
 * It allows to load a component asynchronously.
 * @param {Function} callback
 * @param {object} [props]
 */
export function useImport(callback, props) {
	let [state, setState] = useState({ wait: true });
	useEffect(() => {
		let loading = true;
		callback(props).then(md => {
			loading && setState(md);

			loading = false;
		});
		fps(() => {
			loading && setState({ loading: true });
		});
		return () => (loading = false);
	}, [callback]);
	return state;
}

function fps(callback, count = 3) {
	count-- ? requestAnimationFrame(() => fps(callback, count)) : callback();
}
