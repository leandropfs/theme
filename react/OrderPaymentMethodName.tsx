import React from 'react';
import { useOrder } from 'vtex.order-placed/OrderContext'

const OrderPaymentMethodName: StorefrontFunctionComponent = ({children}) => {

    const order = useOrder()
  
    return (
        <div data-payment-name={order.paymentData.transactions[0].payments[0].paymentSystemName}>
            {children}
        </div>
    );
}

export default OrderPaymentMethodName