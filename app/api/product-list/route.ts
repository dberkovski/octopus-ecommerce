import {NextResponse} from "next/server";
import axios from "axios";
import {canInsertSemicolon} from "sucrase/dist/types/parser/traverser/util";
import {ProductCardProps} from "@/components/product/product-card";
import productList from "@/components/product/product-list";
import {pageDataCalculator} from "@/lib/page-calculator";

export async function GET(
    request: Request
) {

    const urlParams = new URL(request.url).searchParams;
    let page: any = urlParams.get('page') ?? 1
    let per_page: any = urlParams.get('per_page') ?? 9
    let searchString: any = urlParams.get('searchString') ?? ""
    let category: any = urlParams.get('category') ?? ""
    let skip = 0

    let productList: any = {
        products: [],
        limit: per_page,
        skip: 0,
        total: 0
    }
    try {
        if (per_page > 9) {
            per_page = 9
        }
        skip = (parseInt(per_page) * parseInt(page)) - parseInt(per_page)
    } catch (error) {
        console.log("err-", error)
    }

    if (category !== "") {
        if (category.includes(',')) {
            const allCategories = category.split(',').map((item: any) => item.trim());
            for (const index of allCategories) {
                let ctData = await axios.get(`https://dummyjson.com/products/category/${index}`)
                productList.products = productList.products.concat(ctData.data.products)
                productList.total = productList.total + ctData.data.total
            }
        } else {
            const oneCategoryData = await axios.get(`https://dummyjson.com/products/category/${category}`)
            let {firstIndex, lastIndex} = pageDataCalculator(page, per_page, oneCategoryData.data.products.length)
            if (firstIndex == lastIndex) {
                firstIndex = 0
                lastIndex = oneCategoryData.data.products.length
            }

            if (searchString !== "") {
                const searchResults: ProductCardProps[] = oneCategoryData.data.products.filter((product: ProductCardProps) => {
                    for (const key in product) {
                        if (Object.prototype.hasOwnProperty.call(product, key)) {
                            // @ts-ignore
                            const value = product[key];
                            if (typeof value === "string" && value.toLowerCase().includes(searchString)) {
                                return true;
                            }
                        }
                    }
                    return false;
                });
                let {firstIndex, lastIndex} = pageDataCalculator(page, per_page, searchResults.length)
                if (firstIndex == lastIndex) {
                    firstIndex = 0
                    lastIndex = searchResults.length
                }
                return NextResponse.json({
                    products: searchResults.slice(firstIndex, lastIndex),
                    total: searchResults.length,
                    limit: Number(per_page),
                    skip: (page * per_page) - (per_page),
                })
            }

            return NextResponse.json({
                products: oneCategoryData.data.products.slice(firstIndex, lastIndex),
                total: oneCategoryData.data.products.length,
                limit: Number(per_page),
                skip: (page * per_page) - (per_page),
            })
        }
        if (searchString !== "") {
            const searchResults: ProductCardProps[] = productList.products.filter((product: ProductCardProps) => {
                for (const key in product) {
                    if (Object.prototype.hasOwnProperty.call(product, key)) {
                        // @ts-ignore
                        const value = product[key];
                        if (typeof value === "string" && value.toLowerCase().includes(searchString)) {
                            return true;
                        }
                    }
                }
                return false;
            });
            let {firstIndex, lastIndex} = pageDataCalculator(page, per_page, searchResults.length)
            if (firstIndex == lastIndex) {
                firstIndex = 0
                lastIndex = searchResults.length
            }
            return NextResponse.json({
                products: searchResults.slice(firstIndex, lastIndex),
                total: searchResults.length,
                limit: Number(per_page),
                skip: (page * per_page) - (per_page),
            })
        } else {

            let {firstIndex, lastIndex} = pageDataCalculator(page, per_page, productList.products.length)
            if (firstIndex == lastIndex) {
                firstIndex = 0
                lastIndex = productList.products.length
            }
            return NextResponse.json({
                products: productList.products.slice(firstIndex, lastIndex),
                total: productList.total,
                limit: Number(per_page),
                skip: (page * per_page) - (per_page),
            })
        }
    }

    if (searchString !== "") {
        // !!NOTE!!:api "https://dummyjson.com/products?limit=9&skip=18&select=title,price,rating,thumbnail,description/search?q=phone"
        // seklinde hem search hem de pagination içerikli bir query desteklemediği için search querysi geldiginde tüm veri içinden
        // manuel filtreleme yapılmıstır. Bu sebeple de ilgili component client side kurgulanmıstır.
        let productListAllResponse = await axios.get(`https://dummyjson.com/products?limit=${100}&skip=${0}&select=title,price,rating,thumbnail,description,category`)
        let productListAll: ProductCardProps[] = productListAllResponse.data.products
        const searchResults: ProductCardProps[] = productListAll.filter((product: ProductCardProps) => {
            for (const key in product) {
                if (Object.prototype.hasOwnProperty.call(product, key)) {
                    // @ts-ignore
                    const value = product[key];
                    if (typeof value === "string" && value.toLowerCase().includes(searchString)) {
                        return true;
                    }
                }
            }
            return false;
        });

        let {firstIndex, lastIndex} = pageDataCalculator(page, per_page, searchResults.length)
        if (firstIndex == lastIndex) {
            firstIndex = 0
            lastIndex = searchResults.length
        }
        productList = {
            products: searchResults.slice(firstIndex, lastIndex),
            total: searchResults.length,
            limit: Number(per_page),
            skip: (page * per_page) - (per_page),
        }
        return NextResponse.json(productList)
    }

    productList = await axios.get(`https://dummyjson.com/products?limit=${per_page}&skip=${skip}&select=title,price,rating,thumbnail,description,category`)

    let productListData = {
        products: productList.data.products,
        total: productList.data.total,
        limit: productList.data.limit,
        skip: productList.data.skip,
    }
    return NextResponse.json(productListData)
}
