function getPackageType(size) {
    const normalized = size.toLowerCase()
    const sizeMap = {
        "xlarge": "wood",
        "large": "wood",
        "medium": "cardboard",
        "small": "plastic",
        "xsmall": "plastic",
    }
    return sizeMap[normalized] || "plastic"
}

function getFillingType(packageType, deliveryMode) {
    const packageMaterial = packageType.toLowerCase()
    const mode = deliveryMode.toLowerCase()

    const rules = {
        air: {
          plastic: "bubble bags",
          default: "foamballs"
        },
        land: {
          default: "foamballs"
        },
        sea: {
          default: "super absorbent balls and bubble bags"
        }
    }

    const rule = rules[mode]
    if (!rule) return "none"

    return rule[packageMaterial] || rule.default
}

module.exports = { getPackageType, getFillingType }