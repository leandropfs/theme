import React from 'react';
import { useOrderGroup } from 'vtex.order-placed/OrderGroupContext'

const OrderNotices: StorefrontFunctionComponent = () => {

    const orders = useOrderGroup()

    const isCustomerCredit = orders.orders[0].paymentData.transactions[0].payments[0].paymentSystemName == "Customer Credit"

    const listNotices = [
        isCustomerCredit && "O seu pedido será analisado pela nossa equipe, mas não se preocupe, todo o pedido realizado por Boleto Parcelado é realizado uma análise de crédito para evitar possíveis fraudes. Em caso de seu pedido não ser liberado devido limite de crédito, nosso time entrará em contato para sugerir alternativas de pagamento. Nos reservamos no direito de cancelar o pedido caso não passe em nossa análise."
    ].filter(Boolean)

    return (
        <ul
        className={`list ma0 pl0 t-body bg-muted-5 tc-m lh-copy`}
        >
        {listNotices.map((item, index) => (
            <li
            className={`pv6 w-80-ns w-90 center c-on-base b--muted-4 bb`}
            key={index}
            >
            {item}
            </li>
        ))}
        </ul>
    );
}

export default OrderNotices