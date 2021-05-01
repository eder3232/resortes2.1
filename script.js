//variables para graficar
const graficoNodos = []
const graficoEnlaces = []

//funciones necesarias

function countProperties(obj) {
  var count = 0

  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) ++count
  }

  return count
}

function twoDimensionArray(a, b) {
  let arr = []

  // creating two dimensional array
  for (let i = 0; i < a; i++) {
    for (let j = 0; j < b; j++) {
      arr[i] = []
    }
  }

  // inserting elements to array
  for (let i = 0; i < a; i++) {
    for (let j = 0; j < b; j++) {
      arr[i][j] = 0
    }
  }
  return arr
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//funcion que grafica
function init(nodos, enlaces) {
  let $ = go.GraphObject.make
  myDiagram = $(
    go.Diagram,
    'myDiagramDiv', // must name or refer to the DIV HTML element
    {
      initialAutoScale: go.Diagram.Uniform, // an initial automatic zoom-to-fit
      contentAlignment: go.Spot.Center, // align document to the center of the viewport
      layout: $(
        go.ForceDirectedLayout, // automatically spread nodes apart
        {
          maxIterations: 200,
          defaultSpringLength: 30,
          defaultElectricalCharge: 100,
        }
      ),
    }
  )

  myDiagram.nodeTemplate = $(
    go.Node,
    'Auto', // the whole node panel
    { locationSpot: go.Spot.Center },
    // define the node's outer shape, which will surround the TextBlock
    $(go.Shape, 'Rectangle', {
      fill: $(go.Brush, 'Linear', {
        0: 'rgb(254, 201, 0)',
        1: 'rgb(254, 162, 0)',
      }),
      stroke: 'black',
    }),
    $(
      go.TextBlock,
      { font: 'bold 10pt helvetica, bold arial, sans-serif', margin: 4 },
      new go.Binding('text', 'text')
    )
  )

  myDiagram.linkTemplate = $(
    go.Link, // the whole link panel
    $(
      go.Shape, // the link shape
      { stroke: 'black' }
    ),
    $(
      go.Shape, // the arrowhead
      { toArrow: 'standard', stroke: null }
    ),
    $(
      go.Panel,
      'Auto',
      $(
        go.Shape, // the label background, which becomes transparent around the edges
        {
          fill: $(go.Brush, 'Radial', {
            0: 'rgb(240, 240, 240)',
            0.3: 'rgb(240, 240, 240)',
            1: 'rgba(240, 240, 240, 0)',
          }),
          stroke: null,
        }
      ),
      $(
        go.TextBlock, // the label text
        {
          textAlign: 'center',
          font: '10pt helvetica, arial, sans-serif',
          stroke: '#555555',
          margin: 4,
        },
        new go.Binding('text', 'text')
      )
    )
  )

  let nodeDataArray = nodos
  let linkDataArray = enlaces
  myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray)
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//clase que crea el grafo ponderado no dirigido

class WeightedGraph {
  constructor() {
    this.adjacencyList = {}
  }
  addVertex(name) {
    if (!this.adjacencyList[name]) {
      this.adjacencyList[name] = {}
    }
  }
  addEdge(vert1, vert2, weight) {
    this.adjacencyList[vert1][vert2] = weight
    this.adjacencyList[vert2][vert1] = weight
  }
  removeEdge(v1, v2) {
    delete this.adjacencyList[v1][v2]
    delete this.adjacencyList[v2][v1]
  }
  removeVertex(vert) {
    for (let i in this.adjacencyList[vert]) {
      this.removeEdge(vert, i)
    }
    delete this.adjacencyList[vert]
  }
  DFS(target) {
    const result = []
    const visited = {}
    const helper = (vert) => {
      if (!vert) return null
      visited[vert] = true
      result.push(vert)
      for (let neighbor in this.adjacencyList[vert]) {
        if (!visited[neighbor]) {
          return helper(neighbor)
        }
      }
    }
    helper(target)
    return result
  }
  BFS(start) {
    const queue = [start]
    const result = []
    const visited = {}
    while (queue.length) {
      let current = queue.shift()
      visited[current] = true
      result.push(current)
      for (let neighbor in this.adjacencyList[current]) {
        if (!visited[neighbor]) {
          visited[neighbor] = true
          queue.push(neighbor)
        }
      }
    }
    return result
  }

  Dijkstras(start, finish) {
    // List1
    const costFromStartTo = {}
    // List2
    const checkList = new PriorityQueue()
    // List3
    const prev = {}

    let current
    let result = []
    for (let vert in this.adjacencyList) {
    }
    while (checkList.values.length) {}
  }
}

//agregar quitar nodos
const agregarNudo = document.getElementById('addNode')
const removeNudo = document.getElementById('removeNode')
const tbodyNudo = document.getElementById('tbodyNode')
const tablaNudo = document.getElementById('tableNode')

agregarNudo.addEventListener('click', () => {
  const nudos = document.querySelectorAll('.nodo')
  tbodyNudo.innerHTML += `
  <tr class="nodo">
            <td><input type="number" class="number datosNudos" value="${
              nudos.length + 1
            }"></td>
            <td><input class="number datosFuerza" onfocus="this.value=''"></td> 
            <td><input class="number datosDesplazamiento" value="0" onfocus="this.value=''"></td>          
          </tr> 
  `
})
removeNudo.addEventListener('click', () => {
  tbodyNudo.removeChild(tbodyNudo.lastElementChild)
})

// agregar quitar resortes
const agregarBorde = document.getElementById('addEdge')
const removeBorde = document.getElementById('removeEdge')
const tbodyBorde = document.getElementById('tbodyEdge')
const tablaBorde = document.getElementById('tableEdge')

agregarBorde.addEventListener('click', () => {
  const resortes = document.querySelectorAll('.resorte')
  tbodyBorde.innerHTML += `
  <tr class="resorte">
            <td><input type="number" class="number" value="${
              resortes.length + 1
            }"></td>
            <td><input type="number" class="number datosk" onfocus="this.value=''"></td>    
            <td><input type="number" class="number from" onfocus="this.value=''"></td>
            <td><input type="number" class="number to" onfocus="this.value=''"></td>       
          </tr>  
  `
})
removeBorde.addEventListener('click', () => {
  tbodyBorde.removeChild(tbodyBorde.lastElementChild)
})

//crear la funcion lectora
let vertices = []

function datosFuerzas() {
  const datosFuerza = document.querySelectorAll('.datosFuerza')
  const datosDesplazamiento = document.querySelectorAll('.datosDesplazamiento')
  //console.log(datosFuerza[1].value)
  //console.log(datosFuerza.length)
  for (let i = 0; i < datosFuerza.length; i++) {
    vertices.push({
      modulo: parseFloat(datosFuerza[i].value),
      desplazamiento: parseFloat(datosDesplazamiento[i].value),
    })
  }
  //console.log(vertices)
}
let inputK = []
let inputFrom = []
let inputTo = []

function datosResortes() {
  const datosK = document.querySelectorAll('.datosk')
  //console.log(datosK[1].value)
  for (let i = 0; i < datosK.length; i++) {
    inputK.push(parseFloat(datosK[i].value))
  }
  const datosFrom = document.querySelectorAll('.from')
  for (let i = 0; i < datosFrom.length; i++) {
    inputFrom.push(parseFloat(datosFrom[i].value))
  }
  const datosTo = document.querySelectorAll('.to')
  for (let i = 0; i < datosTo.length; i++) {
    inputTo.push(parseFloat(datosTo[i].value))
  }
}

let edges = []

function escribiendoResortes() {
  //console.log(inputK)
  for (let i = 0; i < inputK.length; i++) {
    edges.push({ k: inputK[i] })
  }
  //console.log(edges)
  //console.log(inputFrom)
  //console.log(inputTo)
  //console.log(edges)
  //console.log(vertices)
}

//funcion creadora del grafo
function creagrafo() {
  let eder = new WeightedGraph()
  for (let i = 0; i < vertices.length; i++) {
    eder.addVertex(i + 1)
  }

  for (let i = 0; i < edges.length; i++) {
    eder.addEdge(inputFrom[i], inputTo[i], i + 1)
  }
  //console.log(eder)

  //aca se escriben la constante necesaria para graficar graficoNodos
  for (let i = 0; i < vertices.length; i++) {
    graficoNodos.push({ key: i + 1, text: `Nodo ${i + 1}` })
  }

  // esta es la parte logica que se encarga de ejecutar el calculo
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  let reacciones = 0
  vertices.forEach((elemento) => {
    if (isNaN(elemento.modulo)) {
      reacciones++
    }
  })
  /* console.log(reacciones)
  console.log(vertices)
  console.log(vertices.length) */
  let Fu = twoDimensionArray(vertices.length - reacciones, 1)
  // escribiendo Fu
  for (let i = reacciones; i < vertices.length; i++) {
    Fu[i - reacciones][0] = vertices[i].modulo
    //console.log(vertices[i].modulo)
    //console.log(i)
  }

  let k = twoDimensionArray(vertices.length, vertices.length)

  let ur = twoDimensionArray(reacciones, 1)

  let kuu = twoDimensionArray(
    vertices.length - reacciones,
    vertices.length - reacciones
  )

  let kur = twoDimensionArray(vertices.length - reacciones, reacciones)

  let conexiones = []

  for (let i = 1; i <= edges.length; i++) {
    for (let j = 1; j <= vertices.length; j++) {
      for (let k = 1; k <= vertices.length; k++) {
        let parcial = []
        //console.log('i', i, 'j', j, 'k', k)
        if (eder.adjacencyList[j][k] == i) {
          parcial.push(
            i,
            [j, k].sort((a, b) => a - b)
          )
          //console.log(parcial)
          conexiones.push(parcial)
        }
      }
    }
  }

  let stringArray = conexiones.map(JSON.stringify)
  let uniqueStringArray = new Set(stringArray)
  let uniqueArray = Array.from(uniqueStringArray, JSON.parse)

  //aca se escribe la variable necesaria para graficar graficoEnlaces
  for (let i = 0; i < uniqueArray.length; i++) {
    graficoEnlaces.push({
      from: uniqueArray[i][1][0],
      to: uniqueArray[i][1][1],
      text: `Resorte ${i + 1}`,
    })
  }
  /* console.log('grafico')
  console.log(graficoNodos)
  console.log(graficoEnlaces) */

  //console.log(uniqueArray)

  //crea la matriz k completa
  for (let i = 0; i < uniqueArray.length; i++) {
    let a = uniqueArray[i][1][0] - 1
    let b = uniqueArray[i][1][1] - 1
    //console.log('a', a, 'b', b)

    k[a][a] += edges[i].k
    k[a][b] += -edges[i].k
    k[b][a] += -edges[i].k
    k[b][b] += edges[i].k
  }
  //console.log(k)
  //creamos kuu
  for (let i = reacciones; i < vertices.length; i++) {
    for (let j = reacciones; j < vertices.length; j++) {
      kuu[i - reacciones][j - reacciones] = k[i][j]
    }
  }
  //console.log(kuu)

  //creamos kur
  for (let i = reacciones; i < vertices.length; i++) {
    for (let j = 0; j < reacciones; j++) {
      kur[i - reacciones][j] = k[i][j]
    }
  }
  //escribimos ur
  for (let i = 0; i < reacciones; i++) {
    ur[i][0] = vertices[i].desplazamiento
  }

  //comprobacion de las submatrices necesarias para el calculo
  console.log('k')
  console.log(k)
  console.log('kuu')
  console.log(kuu)
  console.log('Fu')
  console.log(Fu)
  console.log('kur')
  console.log(kur)
  console.log('ur')
  console.log(ur)

  // calculo y comprobacion final

  let respuesta = math.inv(kuu)
  let respuesta2 = math.multiply(kur, ur)
  let respuesta3 = math.subtract(Fu, respuesta2)
  let uu = math.multiply(respuesta, respuesta3)
  /* console.log(respuesta)
  console.log(respuesta2)
  console.log(respuesta3)
  console.log('respuesta')
  console.log(uu) */
  ///////////////////////////////////////////////////////////////////
  // calculo de reacciones
  console.log('Reacciones')
  const krr = twoDimensionArray(reacciones, reacciones)
  for (let i = 0; i < reacciones; i++) {
    for (let j = 0; j < reacciones; j++) {
      krr[i][j] = k[i][j]
    }
  }
  const kru = twoDimensionArray(reacciones, vertices.length - reacciones)
  for (let i = 0; i < reacciones; i++) {
    for (let j = reacciones; j < vertices.length; j++) {
      kru[i][j - reacciones] = k[i][j]
    }
  }

  let resp1 = math.multiply(krr, ur)
  let resp2 = math.multiply(kru, uu)
  let fr = math.add(resp1, resp2)
  console.log('fr')
  console.log(fr)

  //impresion
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const desplazamientos = document.getElementById('tbodyOutPut')
  for (let i = 0; i < uu.length; i++) {
    desplazamientos.innerHTML += `
    <tr>
            <td><input type="number" class="number outputU" value="${
              reacciones + i + 1
            }"></td>
            <td><input type="number" class="number outputU" value="${
              Math.round(uu[i][0] * 1000) / 1000
            }" ></td>          
          </tr> 
    
    `
  }

  const laUltima = document.getElementById('tbodyOutPut2')
  for (let i = 0; i < reacciones; i++) {
    laUltima.innerHTML += `<tr>
    <td><input type="number" class="number outputU" value="${i + 1}"></td>
    <td><input type="number" class="number outputU" value="${
      Math.round(fr[i][0] * 1000) / 1000
    }" ></td>          
  </tr> 
  `
  }
}

//crear la funcion que quita la clase visible
function muestra() {
  tablafinal.classList.remove('notVisible')
  elgrafico.classList.remove('notVisible')
}

//boton calcular
const tablafinal = document.getElementById('finalTable')
const calcular = document.getElementById('calculate')
const elgrafico = document.getElementById('myDiagramDiv')

function boton() {
  datosFuerzas()
  datosResortes()
  escribiendoResortes()
  creagrafo()
  muestra()
  init(graficoNodos, graficoEnlaces)
}

// paso final
calcular.addEventListener('click', boton)
/* tabla.rows[3].cells[2].innerText = 2 */

/* console.log(tabla.rows[3].cells[2]) */
