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
            <td><input type="number" class="number datosFuerza"></td>          
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
            <td><input type="number" class="number datosk"></td>    
            <td><input type="number" class="number from"></td>
            <td><input type="number" class="number to"></td>       
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
  //console.log(datosFuerza[1].value)
  //console.log(datosFuerza.length)
  for (let i = 0; i < datosFuerza.length; i++) {
    vertices.push({ modulo: parseFloat(datosFuerza[i].value) })
  }
  //console.log(vertices)
}
let inputK = []
let inputFrom = []
let inputTo = []

function datosResortes() {
  const datosK = document.querySelectorAll('.datosk')
  console.log(datosK[1].value)
  for (let i = 0; i < datosK.length; i++) {
    inputK.push(parseFloat(datosK[i].value))
  }
  const datosFrom = document.querySelectorAll('.from')
  for (let i = 0; i < datosFrom.length; i++) {
    inputFrom.push(parseFloat(datosFrom[i].value))
  }
  const datosTo = document.querySelector('.to')
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
}

//crear la funcion que quita la clase visible
function muestra() {
  tablafinal.classList.remove('notVisible')
}

//boton calcular
const tablafinal = document.getElementById('finalTable')
const calcular = document.getElementById('calculate')

function boton() {
  datosFuerzas()
  datosResortes()
  escribiendoResortes()
  muestra()
}

// paso final
calcular.addEventListener('click', boton)
/* tabla.rows[3].cells[2].innerText = 2 */

/* console.log(tabla.rows[3].cells[2]) */
