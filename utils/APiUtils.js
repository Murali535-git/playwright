class APiUtils {
    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async createOrder(orderPayload) {
        // Login to get token
        const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
            data: this.loginPayload
        });
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;

        // Add to cart
        const productId = orderPayload.orders[0].productOrderedId;
        await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/user/add-to-cart', {
            data: { productId: productId },
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });

        // Create order
        const orderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
            data: orderPayload,
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });
        const orderResponseJson = await orderResponse.json();
        console.log('Order response:', orderResponseJson);
        const orderIds = orderResponseJson.orders ? orderResponseJson.orders.map(order => order.orderId) : [];

        return {
            token: token,
            orderId: orderIds
        };
    }
}

module.exports = { APiUtils };