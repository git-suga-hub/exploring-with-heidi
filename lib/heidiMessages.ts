/**
 * Playful lines for Heidi the mascot — distance in km to target,
 * optional previous distance for warmer/colder, and whether this is the first guess.
 */

function absTease(distanceKm: number): string {
  if (distanceKm < 400) {
    return "You're really close — I can almost see you from here!";
  }
  if (distanceKm < 1500) {
    return "Ooh, warm! I'm not far from that neck of the woods.";
  }
  if (distanceKm < 4000) {
    return "Getting warmer… but I'm hiding somewhere else today!";
  }
  if (distanceKm < 9000) {
    return "Hmm, not there! I'm a long way from that place.";
  }
  return "Brrr — so far away! I'm nowhere near that country.";
}

function relativeTease(deltaKm: number): string {
  if (deltaKm > 500) {
    return "Colder than your last guess… try another direction!";
  }
  if (deltaKm > 100) {
    return "A bit colder — but keep hunting!";
  }
  if (deltaKm < -500) {
    return "Warmer! Warmer! You're honing in!";
  }
  if (deltaKm < -100) {
    return "Yes! Getting warmer than before!";
  }
  return "About the same distance — wiggle your guess a little!";
}

export function getHeidiLine(opts: {
  distanceKm: number;
  previousDistanceKm: number | null;
  isWin: boolean;
  guessedName: string;
}): string {
  if (opts.isWin) {
    return "You found me! I was hiding here all along — great job, explorer!";
  }

  const abs = absTease(opts.distanceKm);

  if (opts.previousDistanceKm === null) {
    return `I'm not hiding in ${opts.guessedName}! ${abs}`;
  }

  const delta = opts.distanceKm - opts.previousDistanceKm;
  const rel = relativeTease(delta);
  return `${rel} ${abs}`;
}

export function getHeidiWelcome(): string {
  return (
    "Hey, thanks for coming to my game, I'm going to hide somewhere in the world, " +
    "do you think you can find me? Catch me if you can hehehe!"
  );
}

export function getHeidiGiveUpReveal(countryName: string): string {
  return `Okay… I was hiding in ${countryName}! Want another go? Tap New game!`;
}
