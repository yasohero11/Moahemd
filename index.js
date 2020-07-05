

let count = 0;

function createElemen(zone, type) {

    let myId = "A" + (count++)
    zone.innerHTML += `<canvas width="300" type="${type}" id = "${myId}" height="300" draggable="true"  class="draggable-elements">
    </canvas>`
}

function checkZone(zone) {
    list = zone.querySelectorAll("canvas")

    for (let canvas of list)
        myCharts2(canvas, canvas.getAttribute("type"))
}


window.onload = function () {
    for (let i = 0; i < 12; i++) {
        const zoneID = localStorage.key(i);
        console.log(zoneID);
        if (zoneID !== null) {
            let obj = JSON.parse(localStorage.getItem(zoneID));           
            zone = document.getElementById(zoneID)   
            console.log(zone)         
            console.log(obj.width + " " + obj.height)
            zone.style.width = obj.width
            zone.style.height = obj.height

            for(let type of obj["types"]){
                createElemen(zone, type)
            }        
            
            checkZone(zone)
        }
    }
}
const items = document.querySelectorAll('.draggable-elements');
const icons = document.querySelectorAll('i');
const dropArea = document.querySelector('.drop-area');

for (let i = 0; i < 12; i++) {
    dropArea.innerHTML += `<div class="drop-zone"  id="${i}"></div>`
}
const dAreas = document.querySelectorAll('.drop-zone');
const button = document.querySelector('button');
button.addEventListener('click', () => {
    localStorage.clear();
})

let draggedItem;

for (let item of items) {
    item.addEventListener('dragstart', function (e) {
        draggedItem = item

        setTimeout(() => {
            item.classList.add('dragging');
        }, 0)

    });
    item.addEventListener('dragend', () => {
        item.classList.remove('dragging');
    })

}


for (let zone of dAreas) {

    zone.addEventListener('dragover', (e) => {
        e.preventDefault();
        zone.style.backgroundColor = 'rgba(255,255,255,0.5)'
    })
    zone.addEventListener('dragleave', () => {

        zone.style.backgroundColor = 'rgba(255,255,255,1)';
    })
    zone.addEventListener('drop', (e) => {
        zone.style.backgroundColor = 'rgba(255,255,255,1)'
        console.log(draggedItem)
        type = draggedItem.getAttribute("type");
        createElemen(zone, type)
        checkZone(zone)
        
    })

  

}




document.querySelector("#saveBtn").addEventListener('click' , e=>{

    document.querySelectorAll(".drop-zone").forEach(e=>{
        let width = e.clientWidth;
        let height = e.clientHeight;
        console.log(width + " " + height)
        let con = e.querySelectorAll("canvas")
        let obj = {}        
        obj["types"] = []
        for(let ele of con){
            let type = ele.getAttribute("type")
            obj["types"].push(type)
        }
        
        obj["width"] = width +"px"
        obj["height"] = height+"px"
        localStorage.setItem(e.getAttribute("id"),JSON.stringify(obj))
    })
    
})

myCharts('chart-1', 'bar');
myCharts('chart-2', 'pie');
myCharts('chart-3', 'line');
myCharts('chart-4', 'horizontalBar');
myCharts('chart-5', 'polarArea');
myCharts('chart-6', 'radar');
myCharts('chart-7', 'doughnut');