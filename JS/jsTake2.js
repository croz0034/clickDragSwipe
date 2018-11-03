let Interractable = {
    HomeInitalized: false,
    init: () => {
        let initList = Object.keys(Interractable);
        for (i = 2; i < (initList.length - 2); i++) {
            console.log(initList[i])
            Interractable.Scour(initList[i]);
            Interractable.allBuild(initList[i]);
        };
        Interractable.page.NaviBuild();
    },
    draggable: {
        List: [],
        Build: (zone) => {
            zone.draggable = "true";
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

        }

    },
    zoneTetheredDrag: {
        List: [],
        Build: (zone) => {
            zone.id = zone.textContent;
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
            zone.draggable = "true";
            let ThreshHold;
            let Current;
            zone.ondragstart = (ev) => {
                ThreshHold = ev.screenX;
                console.log(ev.screenX)
            };
            zone.addEventListener('click', () => {
                zone.textContent = `Center!`
            })
            zone.ondrag = (ev) => {
                (ev.screenX > 0) ? Current = ev.screenX: console.log("done")
            }
            zone.ondragend = (ev) => {
                console.log(ThreshHold, Current)
                if (ev.screenX > (ThreshHold + 100)) {
                    zone.textContent = `Right!`
                } else if (ev.screenX < (ThreshHold - 100)) {
                    zone.textContent = `Left!`

                }
            }

        }

    },
    page: {
        List: [],
        Build: (zone) => {
            if (Interractable.HomeInitalized == false) {} else {
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
            Interractable.page.List[ev.target.id].id = "active";
        },
        NaviBuild: () => {
            if (Interractable.page.List.length > 1) {
                let WebPage = document.querySelector('body');

                let HeaderSection = document.createElement('h4');
                HeaderSection.id = 'nav';
                WebPage.appendChild(HeaderSection);
                let ListSection = document.createElement('ul');
                HeaderSection.appendChild(ListSection);

                let pageNumbers = 0;
                Interractable.page.List.forEach((zone) => {
                    let additions = document.createElement('li');
                    additions.id = pageNumbers;
                    additions.textContent = pageNumbers + 1;
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
