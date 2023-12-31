import { Request, Response } from 'express';
import { verifyPayment } from '../services/veifyPayments';


const verfiyPaymentController=(req: Request, res: Response) => {
    try {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
        // Verify the payment
        const isValidPayment = verifyPayment(razorpay_order_id,razorpay_payment_id,razorpay_signature);

        if (isValidPayment) {
            res.status(200).json({ success: true, message: 'Payment verified successfully' });
        } else {
            res.status(400).json({ success: false, message: 'Payment verification failed' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

export default verfiyPaymentController;