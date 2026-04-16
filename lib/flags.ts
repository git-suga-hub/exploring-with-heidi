const SPECIAL_FLAG_URLS: Record<string, string> = {
  "gb-sct":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Flag_of_Scotland.svg/640px-Flag_of_Scotland.svg.png",
  "gb-wls":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Flag_of_Wales.svg/640px-Flag_of_Wales.svg.png",
  "gb-nir":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Ulster_Banner.svg/640px-Ulster_Banner.svg.png",
};

export function getFlagImageUrl(code: string, width = 640): string {
  const normalized = code.toLowerCase();
  const special = SPECIAL_FLAG_URLS[normalized];
  if (special) return special.replace("640px-", `${width}px-`);
  return `https://flagcdn.com/w${width}/${normalized}.png`;
}
