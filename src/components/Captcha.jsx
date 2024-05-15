import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

const Captcha = ({ onChange }) => {
  const handleCaptchaChange = (value) => {
    if (value) {
      onChange(true);
    }
  };

  return (
    <ReCAPTCHA
      sitekey="6Leys90pAAAAAPkiL_lmRG70wtkmTO5lwNOuLWsL"
      onChange={handleCaptchaChange}
    />
  );
};

export default Captcha;