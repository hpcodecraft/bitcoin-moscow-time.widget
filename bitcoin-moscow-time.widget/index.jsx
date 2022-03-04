// Bitcoin Moscow Time widget for Übersicht
// by Volker Wieban (https://github.com/hpcodecraft)
// Version 1.0

// the CSS style for this widget, written using Emotion
// https://emotion.sh/

const CURRENCIES = ["USD"]; // you can add more currencies here

const textColor = "white";
const glowColor = "hotpink";
const glowStrength = 0.75;

const glowStyle = () => {
  let css = "";
  for (let i = 1; i <= 7; i++) {
    css += `0 0 ${i * glowStrength}px ${i <= 2 ? textColor : glowColor}${
      i < 7 ? "," : ""
    }`;
  }
  return css;
};

export const className = `
  @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@600&display=swap');

  left: 30px;
  top: 450px;

  opacity: 0.85;

  font-size: 0.8em;

  fieldset {
    border: 2px solid white;
    border-radius: 5px;
    box-shadow: 0 0 ${glowStrength * 15}px hotpink, inset 0 0 ${
  glowStrength * 15
}px hotpink;
    ${CURRENCIES.length === 1 && `padding: 0.25em 1.5em 0.5em 1.5em;`}
  }

  h1 {
    margin: 0;
    text-align: center;
    font-size: 300%;
  }

  h2 {
    margin: 0;
  }

  .glow {
    color: ${textColor};
    font-family: 'Rajdhani', cursive;
    text-shadow: ${glowStyle()};
  }
`;

export const command = `curl -sS https://blockchain.info/ticker`;
export const refreshFrequency = 30 * 1000;

export const render = command => {
  const data = command?.output && JSON.parse(command.output);
  if (!data) return null;
  return (
    <fieldset>
      <legend className="glow">BTC Moscow Time</legend>
      {CURRENCIES.map(currency => {
        const btcPrice = data[currency]?.last;
        const moscowTime = Math.round(
          new Number(1 / btcPrice).toFixed(8) * 100 * 1000000
        );

        if (CURRENCIES.length === 1) {
          return (
            <h1 className="glow" key={currency}>
              {moscowTime}
            </h1>
          );
        }

        return (
          <h2 className="glow" key={currency}>
            Sats/{currency}: {moscowTime}
          </h2>
        );
      })}
    </fieldset>
  );
};
