import Two from 'two.js'
import './styles.css'

// change background color on click
const changeColor = document.getElementById('color'),
  colors = ['#ffe1a8', '#cbc0d3', '#8e9aaf', '#b8b8ff', '#52796f', '#c9cba3']

let colorIndex = 0

changeColor.addEventListener('click', (event) => {
  event.preventDefault()
  document.body.style.backgroundColor = colors[colorIndex]
  colorIndex = (colorIndex + 1) % colors.length
})

const container = document.querySelector('section')

const params = {
  width: 500,
  height: 500
}

const two = new Two(params)
two.appendTo(container)

const numOfShapes = 20
const plotRadius = 150

// store all of our shapes in array
const shapes = []

// run the shape 12 times in a loop
for (let i = 0; i < numOfShapes; i++) {
  const angle = (Math.PI * 2 * i) / numOfShapes

  const x = plotRadius * Math.cos(angle)
  const y = plotRadius * Math.sin(angle)

  const shape = two.makeRectangle(x, y, 65, 7)
  shape.noStroke()
  shape.fill = '#e26d5c'
  shape.rotation = angle
  shapes.push(shape)
}

const group = two.makeGroup(shapes)
group.translation.set(250, 250)

// increase scale for each shape overtime
let scaler = 1
let scaling = 'grow'

// listen for update and increase rotation on every individual shape
// select each individual shape
two.bind('update', function () {
  group.rotation += 0.005

  // conditionally scale each shape in size to grow and shrink
  if (scaling === 'grow') {
    scaler += 0.005
  }
  if (scaling === 'shrink') {
    scaler -= 0.005
  }
  if (scaler > 3) {
    scaling = 'shrink'
  }
  if (scaler < 0.05) {
    scaling = 'grow'
  }

  shapes.forEach((shape) => {
    shape.rotation += 0.015
    shape.scale = scaler
  })
})

two.play()

// single square animation
// Add a square
// shape.fill = '#e26d5c'
// shape.noStroke()
// shape.rotation = Math.PI * 0.25

// listen for update and increase rotation
// two.bind('update', function() {
// shape.rotation = shape.rotation + 0.02
//   shape.rotation += 0.03
// })
