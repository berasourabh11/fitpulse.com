import Logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-primary-100 py-16">
      <div className="justify-content mx-auto w-5/6 gap-16 md:flex">
        <div className="mt-16 basis-1/2 md:mt-0">
          <img src={Logo} alt="Logo" />
          <p className="my-5">
            Join our community and stay connected for the latest fitness trends, exclusive offers, and health tips. Follow us on social media to be a part of the FitPulse family.
          </p>
          <p>&#169; FITPULSE All Rights Reserved. </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;