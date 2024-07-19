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
      sitekey="6Lelgf4pAAAAAK5JC3Ihag_ca8stfLRxjnRuwxXU"
      onChange={handleCaptchaChange}
    />
  );
};

export default Captcha;
