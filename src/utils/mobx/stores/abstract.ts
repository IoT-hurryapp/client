import { State } from "../state";

export interface AbstractStore {
	readonly state: State;
	hydrate(): void;
	// abstract default(): D;
	// abstract clean(input: Partial<D>): D;
}