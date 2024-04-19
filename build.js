const { argv } = require("node:process")
const { parse, format, normalize } = require("node:path")
const { writeFile } = require("node:fs/promises")

const kebabize = (str) => str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? "-" : "") + $.toLowerCase())

const tokensToCss = (object = {}, base = `-`) =>
  Object.entries(object).reduce((css, [key, value]) => {
    let newBase = base + `-${key}`
    if (typeof value !== "object") {
      return css + kebabize(newBase) + `: ${value};\n`
    }
    return css + tokensToCss(value, newBase)
  }, ``)

const saveTokens = async (name, tokens, path) => {
  try {
    await writeFile(`${path}/${name}.css`, tokens)
  } catch (e) {
    console.log("There was an error while saving a file.\n", e)
  }
}

try {
  const args = argv.slice(2)
  const tokensPath = format({ root: "./", base: normalize(args[0]) })
  const tokens = require(tokensPath)
  const { name } = parse(tokensPath)

  const cssVariables = tokensToCss(tokens)
  const cssClass = `:root {\n${cssVariables.replaceAll("--", "  --")}}\n`
  saveTokens(name, cssClass, normalize(args[1]))
} catch (e) {
  console.log(
    "Provide a correct argument - a relative path to design tokens.\n",
    e
  )
}