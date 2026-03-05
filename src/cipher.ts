export const transformText = (text: string, offset: number): string => {
  return text
    .split("")
    .map((char) => {
      // Sjekk om tegnet er en bokstav (A-Z eller a-z)
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        let base = code >= 65 && code <= 90 ? 65 : 97; // Sjekk om det er stor eller liten bokstav

        // Formelen for Caesar Cipher med "wrap-around" (Z blir A)
        // Vi bruker Modulo (%) for å holde oss innenfor de 26 bokstavene i alfabetet
        return String.fromCharCode(
          ((((code - base + offset) % 26) + 26) % 26) + base,
        );
      }

      // Hvis det ikke er en bokstav (f.eks. mellomrom eller punktum), la det stå i fred
      return char;
    })
    .join("");
};

export const decryptText = (text: string, offset: number): string => {
  return transformText(text, -offset);
};
