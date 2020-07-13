
const plus = document.getElementById('plus')
const minus = document.getElementById('minus')
let priceValue = document.getElementById('priceValue').value
let quantity =document.getElementById('quantity').value
let priceHidden = document.getElementById('priceHidden').value


let finalPrice = () => {
    document.getElementById('quantity').value = quantity
    document.getElementById('priceValue').value = priceValue.toFixed(2)
    document.getElementById('total').innerHTML = quantity
}


    plus.addEventListener('click' , (event) => {
        event.preventDefault()
        priceValue = parseFloat(priceValue)
        quantity = parseInt(quantity)
        priceHidden = parseFloat(priceHidden)

        priceValue += priceHidden
        quantity += 1
        finalPrice()
    })



    minus.addEventListener('click' , (event) => {
        event.preventDefault()

        priceValue = parseFloat(priceValue)
        quantity = parseInt(quantity)
        priceHidden = parseFloat(priceHidden)

      if (quantity === 1) {
          quantity = 1
          priceValue = priceHidden
          return
      } else {
          priceValue -= priceHidden
          quantity -= 1
      }
      finalPrice()
    })
