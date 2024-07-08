import { AbstractStore } from ".";
import { State } from "../state";
import { makeAutoObservable } from "mobx";

export interface User {
	username: string;
	locations: any[];
}

export class Auth implements AbstractStore {
	user: User | null = null;
	loading = true;
	fetching = false;
	constructor(public state: State) {
		makeAutoObservable(this);
	}
	setUser(user: User) {
		this.user = user;
	}
	async hydrate() {}
}
