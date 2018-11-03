let Interractable = {
    HomeInitalized: false,
    init: () => {
        console.log(document.elementFromPoint(5,5))
        console.log(screen.height)
        if(!Interractable.HomeInitalized){
        let initList = Object.keys(Interractable);
        for (i = 2; i < (initList.length - 2); i++) {
            console.log(initList[i])
            Interractable.Scour(initList[i]);
            Interractable.allBuild(initList[i]);
        };
        Interractable.page.NaviBuild();}
    },
    draggable: {
        List: [],
        Build: (zone) => {
            let Start = {
                x: 0,
                y: 0
            };
            let Current = {
                x: 0,
                y: 0
            };

            let screenwidth = window.innerWidth;
            let screenheight = window.innerHeight;
            console.log(screenwidth);
            console.log(screenheight);
            zone.style.top = `${
(((zone.getAttribute("FromTop"))/100)*screenheight)}px`;
            zone.style.left = `${
(((zone.getAttribute("FromLeft"))/100)*screenwidth)}px`;



//////////////// Desktop Drag
            zone.draggable = "true";
            zone.ondragstart = (ev) => {
                Start.x = ev.clientX;
                Start.y = ev.clientY;
                console.log('start')
            };

            zone.ondrag = (ev) => {
                if (ev.clientX > 0 && ev.clientY > 0) {
                    Current.x = ev.clientX;
                    Current.y = ev.clientY;
                };

                console.log(Current)
            }
            zone.ondragend = (ev) => {
                differenceX = parseInt(zone.style.left) + (Current.x - Start.x);
                differenceY = parseInt(zone.style.top) + (Current.y - Start.y);
                zone.style.top = `${differenceY}px`;
                zone.style.left = `${differenceX}px`;
                console.log(`Moved to X: ${differenceX}px, Y: ${differenceY}px`)
            }

//////////////// Mobile Drag
            let draggo = (ev)=> {
                let newArea = {x: ev.targetTouches[0].screenX, y: ev.targetTouches[0].screenY}; 
                if(newArea.x > 0 && newArea.y){
                    Current = newArea;
                    console.log(newArea)
                }
            }
            let dragstart = (ev) => {
                let newArea = {x: ev.targetTouches[0].screenX, y: ev.targetTouches[0].screenY}; 
                if(newArea.x > 0 && newArea.y){
                    Start = newArea;
                    console.log(newArea)
                }
            };
            let dragend = (ev) => {
                differenceX = parseInt(zone.style.left) + (Current.x - Start.x);
                differenceY = parseInt(zone.style.top) + (Current.y - Start.y);
                zone.style.top = `${differenceY}px`;
                zone.style.left = `${differenceX}px`;
                console.log(`Moved to X: ${differenceX}px, Y: ${differenceY}px`)
                
            }
            
            zone.addEventListener("touchstart", dragstart);
            zone.addEventListener("touchmove", draggo);
            zone.addEventListener("touchend", dragend);

        }

    },
    zoneTetheredDrag: {
        List: [],
        Build: (zone) => {
            zone.id = zone.textContent;
//////////////// Mobile Drag
            let dragstart = (ev)=>{
                ev.preventDefault()
                console.log(ev)
            }
            zone.addEventListener("touchstart", dragstart)
/////////////// Desktop Drag
            zone.setAttribute("draggable", true)
            zone.ondragstart = Interractable.zoneTetheredDrag.DragFunc;
        },
        DragFunc: (ev) => {
            ev.dataTransfer.setData("player", ev.target.id);
        }
    },
    dropZone: {
        List: [],
        ItemCount: () => {
            Interractable.dropZone.List.forEach((zone) => {
                console.log(`${zone.childElementCount} items in column ${zone.id}`)
            })
        },
        Build: (zone) => {
            
            ///////// Mobile Drop
            let zoneTarget;
            Draggo = (ev)=>{
                let targetArea = ev.targetTouches[0];
                zoneTarget = {x: Math.floor(targetArea.clientX), y: Math.floor(targetArea.clientY)}
            }
            Dragend = (ev)=>{document.elementFromPoint(zoneTarget.x, zoneTarget.y).appendChild(ev.target);
            }
            zone.addEventListener("touchmove", Draggo);
            zone.addEventListener("touchend", Dragend);
            ////////////// Desktop Drop
            zone.ondragover = Interractable.dropZone.allowDrop;
            zone.ondrop = Interractable.dropZone.drop
        },
        drop: (ev) => {
            ev.preventDefault();
            var data = ev.dataTransfer.getData("player");
            data ? ev.target.appendChild(document.getElementById(data)) : console.log("Probably The Wind");
            Interractable.dropZone.ItemCount();
        },
        allowDrop: (ev) => {
            ev.preventDefault();
        }
    },
    swipeCard: {
        List: [],
        Build: (zone) => {
            let ThreshHold;
            let Current;
            
////////////////////// Mobile Drag 
            let draggo = (ev)=> {
                let newArea = ev.targetTouches[0].screenX
                if(newArea > 0){
                    Current = newArea;
                    console.log(newArea)
                }
            }
            let dragstart = (ev) => {
                ThreshHold = ev.targetTouches[0].screenX;
                console.log(ev.targetTouches[0].screenX)
            };
            let dragend = (ev) => {
                if (Current > (ThreshHold + 100)) {
                    zone.textContent = `Right!`;
                    console.log("right")
                } else if (Current < (ThreshHold - 100)) {
                    zone.textContent = `Left!`
                    console.log("left")

                }
            }
            
            zone.addEventListener("touchstart", dragstart);
            zone.addEventListener("touchmove", draggo);
            zone.addEventListener("touchend", dragend);
            
//////////////// Desktop Drag
            zone.draggable = "true";
            zone.ondragend = (ev) => {
                console.log(ev.screenX);
                Current = ev.screenX;
                console.log(zone)
                if (ev.screenX > (ThreshHold + 100)) {
                    ev.target.textContent = `Right!`;
                } else if (ev.screenX < (ThreshHold - 100)) {
                    zone.textContent = `Left!`;

                }
            };           
            zone.ondragstart = (ev) => {
                ThreshHold = ev.screenX;
                console.log(ev.screenX)
            };
/////////////////////////////////
            zone.addEventListener('click', () => {
                zone.textContent = `Center!`
            })
            

        }

    },
    page: {
        List: [],
        Build: (zone) => {
            if (Interractable.HomeInitalized == false) {
            } else {
                zone.id = "hidden"
            }
            Interractable.HomeInitalized = true
        },
        NaviGate: (ev) => {
            let pageList = Interractable.Scour('page');
            console.log(Interractable.page.List[ev.target.id])
            Interractable.page.List.forEach((zone) => {
                zone.id = "hidden"
            });
            ev.target.parentElement.childNodes.forEach((Gate)=>{Gate.classList.remove("Current")});
            Interractable.page.List[ev.target.id].id = "active";
            ev.target.classList.add("Current")
        },
        NaviBuild: () => {
            if (Interractable.page.List.length > 1) {
                let WebPage = document.querySelector('body');

                let HeaderSection = document.createElement('h4');
                HeaderSection.id = 'nav';
                WebPage.appendChild(HeaderSection);
                let ListSection = document.createElement('ul');
                HeaderSection.appendChild(ListSection);
                let zoneTitle;
                let pageNumbers = 0;
                Interractable.page.List.forEach((zone) => {
                    zone.id != "hidden"? zoneTitle = zone.id : zoneTitle = pageNumbers + 1;
                    let additions = document.createElement('li');
                    additions.id = pageNumbers;
                    additions.textContent = zoneTitle;
                    pageNumbers != 0? console.log(pageNumbers): additions.classList.add("Current");
                    additions.addEventListener('click', Interractable.page.NaviGate);
                    pageNumbers++;
                    ListSection.appendChild(additions)
                })

            }
        }

    },
    Scour: (Item) => {
        Interractable[Item].List = document.querySelectorAll(`.${Item}`);
    },
    allBuild: (Item) => {
        Interractable[Item].List.forEach((X) => {
            Interractable[Item].Build(X)
        })
    }
}

///////////////////////////////////////////

document.addEventListener("DOMContentLoaded", Interractable.init)
