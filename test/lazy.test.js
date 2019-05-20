import { h, render, useEffect } from "@atomico/core";
import { lazy } from "../src/index";

function ShowLoad({ children }) {
	return <button>{children}</button>;
}

function ShowLoading({ children }) {
	return <span>{children}</span>;
}

function createScope() {
	return document.createElement("div");
}

describe("test", () => {
	it("lazy", async done => {
		let LazyComponent = lazy(
			() =>
				new Promise(resolve =>
					setTimeout(() => resolve({ default: ShowLoad }), 100)
				)
		);

		let scope = createScope();

		function Step1() {
			useEffect(() => {
				expect(scope.querySelector("span")).not.toBe(null);
			});
		}

		function Step2() {
			useEffect(() => {
				expect(scope.querySelector("button")).not.toBe(null);
				done();
			});
		}

		render(
			<LazyComponent
				loading={
					<ShowLoading>
						<Step1 />
					</ShowLoading>
				}
			>
				<Step2 />
			</LazyComponent>,
			scope
		);
	});
});
