import React from "react";
import { Circle, Popup } from "react-leaflet";
import numeral from "numeral";

const caseTypeColor = {
  cases: {
    hex: "#CC1034",
    multiplier: 800,
  },
  recovered: {
    hex: "#7DD71D",
    multiplier: 1200,
  },
  deaths: {
    hex: "#fb4443",
    multiplier: 2000,
  },
};

export function PrintStats(stats) {
  return stats ? `+${numeral(stats).format("0,0a")} ` : "+0";
}

export const SortData = (data) => {
  const sortedData = [...data];
  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

//
export const showDataOnMap = (data, casesType) =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      opacity={0.4}
      pathOptions={{
        color: caseTypeColor[casesType].hex,
        fillColor: caseTypeColor[casesType].hex,
      }}
      radius={
        Math.sqrt(country[casesType] / 5) * caseTypeColor[casesType].multiplier
      }
    >
      <Popup>
        <div className="info__container">
          <div
            className="info__image"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          />

          <div className="info__title">{country.country}</div>
          <div className="info__cases">
            cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info__recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info__deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
