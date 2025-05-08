function basePrice(quantity, price) {
    return price * quantity
}

function bulkDiscount(price, quantity) {
    return quantity > 100 ? price * 0.2 : price
}

function packagingAdjustment(price, packageType) {
    const materialMap = {
        wood: 1.05,
        plastic: 1.10,
        cardboard: 0.99
    }
    return price * (materialMap[packageType] || 1)
}

function countryTax(price, country) {
    const countryMap = {
        usa: 1.18,
        bolivia: 1.13,
        india: 1.19
    }
    return price * (countryMap[country.toLowerCase()] || 1.15)
}

function deliveryFee(deliveryMode, quantity) {
    const mode = deliveryMode.toLowerCase()
    if (mode === "sea") return 400
    if (mode === "land") return 10 * quantity
    if (mode === "air") {
        const fee = 30 * quantity
        return quantity > 1000 ? fee * 0.85 : fee
    }
    return 0
}


function calculateTotal({ quantity, unitPrice, packageType, country, deliveryMode }) {
    let price = basePrice(quantity, unitPrice)
    price = bulkDiscount(price, quantity)
    price = packagingAdjustment(price, packageType)
    price = countryTax(price, country)
    const delivery = deliveryFee(deliveryMode, quantity)
    return price + delivery
}

module.exports = {
    calculateTotal
}