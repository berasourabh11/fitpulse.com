import { motion } from "framer-motion";
import { SelectedPage } from "../../shared/types";
import ContactUsGraphic from "../../assets/ContactUsPageGraphic.png";
import HText from "../../shared/HText";
import { useForm } from "react-hook-form";

type Props = {
    setSelectedPage: (value: SelectedPage) => void;
};

const ContactUs = ({ setSelectedPage }: Props) => {
    const inputStyles = `mb-5 w-full rounded-lg bg-primary-300 px-5 py-3 placeholder-white`;
    const {
        register,
        trigger,
        formState: { errors },
    } = useForm();

    const onSubmit = async (e: any) => {
        const isValid = await trigger();
        if (!isValid) {
            e.preventDefault();
        }
    }
    return (
        <section id="contactus" className="mx-auto w-5/6 pt-24 pb-32">
            <motion.div onViewportEnter={() => setSelectedPage(SelectedPage.ContactUs)}>
                {/* HEADER */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                    variants={{
                        hidden: { opacity: 0, x: -50 },
                        visible: { opacity: 1, x: 0 },
                    }}
                    className="md:w-3/5"
                >
                    <HText>
                        <span className="text-primary-500">JOIN NOW</span> TO GET IN SHAPE
                    </HText>
                    <p className="my-5">
                        Ready to transform your fitness journey? Join FitPulse today and experience a community committed to your well-being. Whether you're a beginner or an experienced fitness enthusiast, our state-of-the-art facilities, expert trainers, and diverse range of classes are tailored to suit your needs. Take the first step towards a healthier, stronger you!
                    </p>
                </motion.div>

                {/* FORM AND IMAGE */}
                <div className="mt-10 justify-between gap-8 md:flex">
                    <motion.div
                        className="mt-10 basis-3/5 md:mt-0"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5 }}
                        variants={{
                            hidden: { opacity: 0, y: 50 },
                            visible: { opacity: 1, y: 0 },
                        }}
                    >
                        <form
                            target="_blank"
                            action="https://formsubmit.co/saurab.bera@gmail.com"
                            onSubmit={onSubmit}
                            method="POST"
                        >
                            {/* Name Input */}
                            <input className={inputStyles}
                                type="text"
                                placeholder="NAME"
                                {...register("name", { required: true, maxLength: 100 })}
                            />
                            {errors.name && (
                                <p className="mt-1 text-primary-500">
                                    {errors.name.type === "required" && "This feild is required."}
                                    {errors.name.type === "maxLength" && "Maximum length must be less than 100 characters."}
                                </p>
                            )}

                            {/* Email Input */}
                            <input className={inputStyles}
                                type="text"
                                placeholder="EMAIL"
                                {...register("email", {
                                    required: true, pattern: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/
                                })}
                            />
                            {errors.email && (
                                <p className="mt-1 text-primary-500">
                                    {errors.email.type === "required" && "This feild is required."}
                                    {errors.email.type === "pattern" && "Not a valid email"}
                                </p>
                            )}

                            {/* MESSAGE */}
                            <textarea className={inputStyles}
                                rows={4}
                                cols={50}
                                placeholder="MESSAGE"
                                {...register("message", {
                                    required: true, maxLength: 2000
                                })}
                            />
                            {errors.message && (
                                <p className="mt-1 text-primary-500">
                                    {errors.message.type === "required" && "This feild is required."}
                                    {errors.message.type === "pattern" && "Maximum length must be less than 2000 characters."}
                                </p>
                            )}

                            <button
                                type="submit"
                                className="mt-5 rounded-lg bg-secondary-500 px-20 py-3 transiton duration-500 hover:text-white"
                            >
                                Submit
                            </button>
                        </form>
                    </motion.div>
                    {/* Image */}
                    <motion.div
                        className="relative mt-16 basis-2/5 md:mt-0"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        variants={{
                            hidden: { opacity: 0, y: 50 },
                            visible: { opacity: 1, y: 0 },
                        }}
                    >
                        <div className="w-full before:absolute before:-bottom-20 before:-right-10 before:z-[-1] md:before:content-evolvetext md:-mt-10 ">
                            <img
                                className="w-full"
                                alt="contact-us-page-graphic"
                                src={ContactUsGraphic}
                            />
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default ContactUs;
