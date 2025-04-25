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

import type { HeroData } from "$lib/types/hero";

export const heroes: HeroData[] = [
  {
    name: "D.va",
    role: "tank",
    image: imageDva
  }, {
    name: "Junker Queen",
    role: "tank",
    image: imageJunkerQueen
  }, {
    name: "Orisa",
    role: "tank",
    image: imageOrisa
  }, {
    name: "Reinhardt",
    role: "tank",
    image: imageReinhardt
  }, {
    name: "Zarya",
    role: "tank",
    image: imageZarya
  }, {
    name: "Ashe",
    role: "dps",
    image: imageAshe
  }, {
    name: "Cassidy",
    role: "dps",
    image: imageCassidy
  }, {
    name: "Genji",
    role: "dps",
    image: imageGenji
  }, {
    name: "Mei",
    role: "dps",
    image: imageMei
  }, {
    name: "Reaper",
    role: "dps",
    image: imageReaper
  }, {
    name: "Soldier: 76",
    role: "dps",
    image: imageSoldier76
  }, {
    name: "Ana",
    role: "support",
    image: imageAna
  }, {
    name: "Juno",
    role: "support",
    image: imageJuno
  }, {
    name: "Kiriko",
    role: "support",
    image: imageKiriko
  }, {
    name: "Lúcio",
    role: "support",
    image: imageLucio
  }, {
    name: "Mercy",
    role: "support",
    image: imageMercy
  }, {
    name: "Moira",
    role: "support",
    image: imageMoira
  }
];
