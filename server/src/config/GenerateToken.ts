import jsonwebToken from "jsonwebtoken";

export const generateToken = (id: string) => {
  return jsonwebToken.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });
};

