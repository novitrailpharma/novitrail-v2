import data from "@/data/our-products/novitrail-products.json";
import { OurProduct } from "@/types/product";

export const getOurProducts = (): OurProduct[] => data;
