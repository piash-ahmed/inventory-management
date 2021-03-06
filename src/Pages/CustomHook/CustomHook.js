import { useEffect, useState } from "react";

export const CustomHook = () => {
    const [products, setProducts] = useState([]);
    const [isReload, setIsreload]= useState(false);

    useEffect(() => {
        fetch('https://laptop-management.herokuapp.com/product')
            .then(res => res.json())
            .then(data => {
                setProducts(data)
                setIsreload(data)
            });
    }, [isReload])
    return [products, setProducts];
}