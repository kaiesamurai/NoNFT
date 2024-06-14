// thanks Drew
// https://github.com/archway-network/archway-cli/blob/main/util/deploy.js#L16-L40

export default function b64(inString = "") {
  if (typeof inString == "string")
    try {
      return Buffer.from(inString).toString("base64");
    } catch (error) {
      console.log(
        "Error: failed to create Base64 encoding for arguments " + inString, error
      );
      return false;
    }
  else return false;
}
