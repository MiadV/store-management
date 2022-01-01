export default function currencyFormat(x:string) {

    return "RM " +  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}