import {create} from 'zustand';
import axios from "axios";
import {toast} from "sonner";


interface shoppingCardPropsZu {
    amount: number,
    title: string,
    updateAmount: (newAmount: number) => void,
    cardData: [],
    loading: boolean,
    hasErrors: boolean,
    fetch: () => Promise<void>
    updateCardData: (productId:number) => Promise<void>
    total: number
}

export const useShoppingCard = create<shoppingCardPropsZu>((set, get) => ({
    amount: 40,
    title: "A new super book",
    updateAmount: (newAmount: number) => {
        const amountState = get().amount
        set(state => ({amount: newAmount + state.amount}))
    },
    cardData: [],
    loading: false,
    hasErrors: false,
    total: 0,
    fetch: async () => {
        set(() => ({loading: true}));
        try {
            const response = await axios.get(
                "https://dummyjson.com/carts/1"
            );
            set({cardData: response.data.products});
            set({total: response.data.total});
        } catch (err) {
            set(() => ({hasErrors: true, loading: false}));
        }
    },
    updateCardData: async (productId: number) => {
        try {
            const response = await axios.put(
                `https://dummyjson.com/carts/${productId}`, {
                    "merge": true,
                    "products": [
                        {
                            "id": productId,
                            "quantity": 1
                        }
                    ]
                }
            );
            set({cardData: response.data.products});
            set({total: response.data.total});
            toast.success(`Ürün Başarıyle eklendi.`)

        } catch (err) {
            set(() => ({hasErrors: true, loading: false}));
        }
    }
}));