import { Product } from "./product";

export interface Departament {
	id: number,
	name: string,
	products?: Product[];
}