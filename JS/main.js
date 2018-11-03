let TylerClasses = {
    dropSections: { DashBoard : []},
    dragItems: {DashBoard: [] }
}

let dropSections = []
let playerList = ["Tryel", "Kronos"];
let screenwidth = window.innerWidth
console.log(screenwidth)



init = ()=>{
    ArrayBuilders("dropSections")
    TylerClasses.dropSections.DashBoard.forEach((zone)=>{ Dropzones(zone) })
    
    playerList.forEach((player)=>{NewDragable(player)})
   
 document.getElementById("Confirm").addEventListener("click", AddPlayer)
    
document.getElementById("Status").addEventListener("click", StatusReport)
    
     SwipeFun(document.getElementById("FUN"));
     
}

ArrayBuilders = (itemToFind)=>{
    
    let dropzones = document.getElementById(itemToFind).children;
    console.log(dropzones);
    
    for(let i = 0; i<(dropzones.length); i++){
        TylerClasses[itemToFind].DashBoard.push(dropzones[i].id)
    console.log(dropzones[i].id)
    }
    
}

let StatusReport = (ev)=>{
    ev.preventDefault();
    let TargetPoint = document.getElementById("zoneStatus");
    let Col1 = document.getElementById('1').querySelectorAll(".card").length;
    let Col2 = document.getElementById('2').querySelectorAll(".card").length;
    let Col3 = document.getElementById('3').querySelectorAll(".card").length;
    
    TargetPoint.textContent = `Column1: ${Col1} Column2: ${Col2} Column3: ${Col3}`
    
}

let SwipeFun = (elementTargeted)=>{
    let ThreshHold;
    let Current;
    elementTargeted.ondragstart = (ev)=>{
        ThreshHold = ev.screenX;
        console.log(ev.screenX)
    };
    elementTargeted.addEventListener('click', ()=>{ elementTargeted.textContent = `FUN`})
    
    elementTargeted.ondrag = (ev)=>{ (ev.screenX > 0) ? Current = ev.screenX : console.log("done")}
    
     elementTargeted.ondragend= (ev) => {
         console.log(ThreshHold, Current)
         if(ev.screenX > (ThreshHold + 100)){
              elementTargeted.textContent =`Right!`
         }
         else if(ev.screenX < (ThreshHold - 100)){
             elementTargeted.textContent = `Left!`
             
         } 
     }
}

///////////////////// New Drop Zone
let Dropzones = (zone)=>{
        let setup = document.getElementById(zone)
        setup.ondragover = allowDrop;
        setup.ondrop = drop
}

///////////////////// New Draggable
let NewDragable = (player)=>{
    let targetZone = document.getElementById("2")
        let setup = document.createElement("p");
        setup.textContent = player;
        setup.id = player;
        setup.classList.add("card")
        setup.setAttribute("draggable", true)
        setup.ondragstart = DragFunc;
    targetZone.appendChild(setup);
}

let AddPlayer = (ev)=>{
    ev.preventDefault();
    let player = document.getElementById("NewGuy").value;
    NewDragable(player);
}

//////////////////// Drag and Drop
let DragFunc = (ev)=>{
    ev.dataTransfer.setData("player", ev.target.id);}

function allowDrop(ev) {
    ev.preventDefault();}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("player");
    data ? ev.target.appendChild(document.getElementById(data)): console.log("Probably The Wind");}

///////////////////////////////////////////

document.addEventListener("DOMContentLoaded", init)