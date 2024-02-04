import CryptoJS from "crypto-js";

export const encryptJson = (data) => {
  const encryptedData = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    process.env.customKey.toString()
  ).toString();
  return encryptedData;
};
export const encrypt = (data) => {
  try {
    const encryptedData = CryptoJS.AES.encrypt(
      data,
      process.env.customKey.toString()
    ).toString();
    return encryptedData;
  } catch (error) {}
};
export const decrypt = (encryptedData) => {
  try {
    const bytes = CryptoJS.AES.decrypt(
      encryptedData,
      process.env.customKey.toString()
    );
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
  } catch (error) {}
};
