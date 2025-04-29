import imageDva from "$lib/images/content/heroes/dva.png";
import imageJunkerQueen from "$lib/images/content/heroes/junkerqueen.png";
import imageOrisa from "$lib/images/content/heroes/orisa.png";
import imageReinhardt from "$lib/images/content/heroes/reinhardt.png";
import imageZarya from "$lib/images/content/heroes/zarya.png";
import imageAshe from "$lib/images/content/heroes/ashe.png";
import imageCassidy from "$lib/images/content/heroes/cassidy.png";
import imageGenji from "$lib/images/content/heroes/genji.png";
import imageMei from "$lib/images/content/heroes/mei.png";
import imageReaper from "$lib/images/content/heroes/reaper.png";
import imageSoldier76 from "$lib/images/content/heroes/soldier76.png";
import imageAna from "$lib/images/content/heroes/ana.png";
import imageJuno from "$lib/images/content/heroes/juno.png";
import imageKiriko from "$lib/images/content/heroes/kiriko.png";
import imageLucio from "$lib/images/content/heroes/lucio.png";
import imageMercy from "$lib/images/content/heroes/mercy.png";
import imageMoira from "$lib/images/content/heroes/moira.png";

import type { HeroName } from "$lib/types/hero";

const heroImageMap: Record<HeroName, string> = {
  "D.Va": imageDva,
  "Junker Queen": imageJunkerQueen,
  Orisa: imageOrisa,
  Reinhardt: imageReinhardt,
  Zarya: imageZarya,
  Ashe: imageAshe,
  Cassidy: imageCassidy,
  Genji: imageGenji,
  Mei: imageMei,
  Reaper: imageReaper,
  "Soldier: 76": imageSoldier76,
  Ana: imageAna,
  Juno: imageJuno,
  Kiriko: imageKiriko,
  Lúcio: imageLucio,
  Mercy: imageMercy,
  Moira: imageMoira,
};
export const heroImage = (hero: HeroName) => heroImageMap[hero];
