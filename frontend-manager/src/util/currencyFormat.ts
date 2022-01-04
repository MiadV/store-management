export default function currencyFormat(price: string | number) {
    return "RM " + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
