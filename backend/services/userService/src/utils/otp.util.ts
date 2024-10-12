export const generateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    console.log(otp, 'otp in otp generator ');

    return otp
}
