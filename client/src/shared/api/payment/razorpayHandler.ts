import axios from "axios";
import { BASE_URL } from "../../../config/properties";
import shortid from 'shortid';

async function createOrder(amount: number) {
    try {
        const currency = "INR";
        const receipt = shortid.generate();

        const response = await axios.post(BASE_URL + "api/payment/createOrder/", {
            amount:
                amount * 100,
            currency,
            receipt
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        });
        return response.data;
    } catch (e) {
        console.log(e);
        return null
    }
} 

const loadScript = (src:string) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
     document.body.appendChild(script);
   });
};

export const displayRazorpay = async (amount: number) => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      alert("Razorpay SDK failed to load");
      return;
    }
    const data = await createOrder(amount);
    if (!data) {
        alert("Failed to create order");
        return;
    }

    return new Promise((resolve, reject) => {
        const options = {
            key: "rzp_test_U2QqWxLrNhzH5k",
            currency: data.currency,
            amount: data.amount.toString(),
            order_id: data.id,
            name: "FitPulse",
            description: "This is just a test transaction",
            image: "https://picsum.photos/200",
            handler: async function (response: any) {
                // Payment was successful, resolve the promise
                try{
                    const verifyPayment=await axios.post(BASE_URL + "api/payment/verifyPayment/", {
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_signature: response.razorpay_signature
                    }, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: true
                    });
                    if(verifyPayment.status===200){
                        resolve(true);
                    }
                }catch(e){
                    if(axios.isAxiosError(e)){
                        console.log(e.response);
                    }
                    reject(false);
                }
                
            },
            prefill: {
                name: "Sourabh Bera",
                email: "berasourabh2071@gmail.com",
                contact: "9999999999",
            },
        };
        const paymentObject = new (window as any).Razorpay(options);
        paymentObject.open();

        paymentObject.on('payment.failed', function (response: any) {
            // Payment failed, reject the promise
            reject(false);
        });
    });
};