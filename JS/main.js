let dropSections = [1,2,3]
let playerList = ["Tryel", "Kronos", ""];



init = ()=>{
    dropSections.forEach((zone)=>{ Dropzones(zone) })
    
    playerList.forEach((player)=>{NewDragable(player)})
   
 document.getElementById("Confirm").addEventListener("click", AddPlayer)
     
    
     SwipeFun(document.getElementById("FUN"));
     
}

let SwipeFun = (elementTargeted)=>{
    let ThreshHold;
    let Current;
    elementTargeted.ondragstart = (ev)=>{
        ThreshHold = ev.screenX;
        console.log(ev.screenX)
    };
    
    elementTargeted.ondrag = (ev)=>{ (ev.screenX > 0) ? Current = ev.screenX : console.log("done")}
    
     elementTargeted.ondragend= (ev) => {
         console.log(ThreshHold, Current)
         if(ev.screenX > (ThreshHold + 50)){
              elementTargeted.textContent =`Right`
         }
         else if(ev.screenX < (ThreshHold - 50)){
             elementTargeted.textContent = `Left!`
             
         } else { elementTargeted.textContent = `FUN`}
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