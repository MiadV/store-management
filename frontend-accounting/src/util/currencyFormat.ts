export default function currencyFormat(price: string | number) {
    const amount = typeof price === "string" ? parseFloat(price) : price;
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "MYR",
    }).format(amount);
}
