import crypto from 'crypto';

export function verifyPayment(orderId:string,paymentId:string,signature:string){
    const sha = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET as string);
    sha.update(`${orderId}|${paymentId}`);
    const digest = sha.digest('hex');
    console.log(digest,signature)

    return digest === signature;
}