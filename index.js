import fetch from "node-fetch";
import pokemon from "./bundle.js";

const headers = {
  "user-agent":
    "Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Mobile Safari/537.36",
  accept: "application/json",
};

const getPokeRanging = async (id, rst, ts2) => {
  const res = await fetch(
    `https://resource.pokemon-home.com/battledata/ranking/${id}/${rst}/${ts2}/pokemon`,
    headers
  );

  const data = await res.json();

  for (let i = 0; i < 30; i++) {
    getPokedata(id, rst, ts2, data[i].id, data[i].form);
  }
};

const setPdetails = (pokeId) => {
  if (pokeId >= 2 && pokeId <= 199) {
    return 1;
  }

  if (pokeId >= 208 && pokeId <= 384) {
    return 2;
  }

  if (pokeId >= 405 && pokeId <= 598) {
    return 3;
  }

  if (pokeId >= 601 && pokeId <= 799) {
    return 4;
  }

  if (pokeId >= 800 && pokeId <= 898) {
    return 5;
  }

  return 0;
};
const getPokedata = async (id, rst, ts2, pokeId, form) => {
  const pretails = setPdetails(pokeId);
  if (pretails === 0) {
    return;
  }
  const res = await fetch(
    `https://resource.pokemon-home.com/battledata/ranking/${id}/${rst}/${ts2}/pdetail-${pretails}`,
    headers
  );
  const data = await res.json();
  const poke = data[pokeId][form];
  const waza = poke.temoti.waza;
  const tokusei = poke.temoti.tokusei;
  const motimono = poke.temoti.motimono;
  const seikaku = poke.temoti.seikaku;

  console.log("----------------------");
  console.log("----------------------");
  console.log(pokemon.poke[pokeId - 1]);
  console.log("----------------------");
  for (let i = 0; i < waza.length; i++) {
    console.log(pokemon.waza[waza[i].id], waza[i].val);
  }

  console.log("----------------------");
  for (let i = 0; i < seikaku.length; i++) {
    console.log(pokemon.seikaku[seikaku[i].id], seikaku[i].val);
  }

  console.log("----------------------");
  for (let i = 0; i < tokusei.length; i++) {
    console.log(pokemon.tokusei[tokusei[i].id], tokusei[i].val);
  }

  console.log("----------------------");
  for (let i = 0; i < motimono.length; i++) {
    console.log(pokemon.item[motimono[i].id], motimono[i].val);
  }
};

getPokeRanging(10302, 0, 1652699981);
