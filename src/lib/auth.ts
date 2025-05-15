import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("Brakuje JWT_SECRET w pliku .env");
}

// Typ danych użytkownika, które chcesz umieścić w tokenie
export interface JWTPayload {
  userId: string;
  email: string;
}

// Tworzenie tokena
export function signJWT(payload: JWTPayload, expiresIn: string | number = "1h") {
  return jwt.sign(payload, JWT_SECRET as string, { expiresIn });
}

// Weryfikacja tokena
export function verifyJWT(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET as string) as JWTPayload;
  } catch (error) {
    console.error("Nieprawidłowy token:", error);
    return null;
  }
}
