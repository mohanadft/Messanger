const colors = {
  Reset: "\x1b[0m",
  Bright: "\x1b[1m",
  Dim: "\x1b[2m",
  Underscore: "\x1b[4m",
  Bold: "\x1b[1m",
  StrikeThrough: "\x1b[9m",
  Italic: "\x1b[3m",
  Blink: "\x1b[5m",
  Reverse: "\x1b[7m",
  Hidden: "\x1b[8m",

  Framed: "\x1b[51m",
  Encircled: "\x1b[52m",

  Black: "\x1b[30m",
  Red: "\x1b[31m",
  Green: "\x1b[32m",
  Yellow: "\x1b[33m",
  Blue: "\x1b[34m",
  Magenta: "\x1b[35m",
  Cyan: "\x1b[36m",
  White: "\x1b[37m",

  "Bg-Black": "\x1b[40m",
  "Bg-Red": "\x1b[41m",
  "Bg-Green": "\x1b[42m",
  "Bg-Yellow": "\x1b[43m",
  "Bg-Blue": "\x1b[44m",
  "Bg-Magenta": "\x1b[45m",
  "Bg-Cyan": "\x1b[46m",
  "Bg-White": "\x1b[47m",
};

const hex2code = (hex, fb) => {
  if (hex[0] == "#") hex = hex.substr(1, hex.length);
  let r = parseInt(hex.slice(0, 2), 16),
    g = parseInt(hex.slice(2, 2), 16),
    b = parseInt(hex.slice(4, 2), 16);
  return `\x1b[${fb.toUpperCase() == "B" ? 4 : 3}8;2;${r};${g};${b}m`;
};

module.exports = {
  colors,
  c: (strings, ...values) => {
    let text = String.raw({ raw: strings }, ...values);
    for (let color in colors) {
      text = text.replace(
        new RegExp(`\\$\\[${color}\\]`, "gim"),
        colors[color]
      );
    }
    return text
      .replace(/\$\[([^]+)\]/g, (_, c) => colors[c] || "")
      .replace(/@\[(f|b)g\-#(\w{6})\]/gi, (_c, a, b) => hex2code(b, a));
  },
};
