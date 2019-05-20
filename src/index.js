import { h, useEffect, useState } from "@atomico/core";

/**
 * It allows to load a component asynchronously.
 * @param {Function} callback
 * @return {object}
 */
export function lazy(callback) {
	return ({ loading, ...props }) => {
		let state = useImport(callback, props);

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
	let [state, setState] = useState({ loading: true });
	useEffect(() => {
		let loading = true;
		callback(props).then(
			md =>
				loading &&
				setState({
					loading: false,
					...md
				})
		);
		return () => (loading = false);
	}, [callback]);
	return state;
}
