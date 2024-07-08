import { makeAutoObservable } from "mobx";
import { AbstractStore, Auth } from "./stores";
import { useEffect, useState } from "react";

export class State {
	auth = new Auth(this);
	constructor() {
		makeAutoObservable(this);
	}
	iterStore() {
		return Object.keys(this).map(
			(key) => this[key as keyof State] as AbstractStore
		);
	}
	async hydrate() {
		for (const store of this.iterStore()) {
			console.log(`${store.constructor.name} hydrating`);
			store.hydrate();
		}
	}
}

const state = new State();
export const useAppState = () => {
	return state;
};

export function Hydrate({ children, fallback = "" }: { children: React.ReactNode, fallback?: React.ReactNode }) {
	const [hydrated, setHydrated] = useState(false);
	useEffect(
		() => (state.hydrate().then(() => setHydrated(true)), undefined),
		[]
	);
	return hydrated ? children : fallback;
}