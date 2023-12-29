import Razorpay from "razorpay";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID as string,
    key_secret: process.env.RAZORPAY_SECRET as string,
});

export async function createOrder(amount: number, currency: string, receipt:string) {
    console.log(amount,currency,receipt);
    try{
        const order = await razorpay.orders.create({
            amount,
            currency,
            receipt, 
        });
        return order;
    }catch(error){
        console.log(error);
        return null;
    }
    
}
