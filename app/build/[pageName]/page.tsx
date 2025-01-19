"use client"
import { useParams } from "next/navigation";
import { useState } from "react";
import { FaRegImage } from "react-icons/fa";
import { ImCheckboxUnchecked } from "react-icons/im";
import { MdFullscreenExit } from "react-icons/md";
import { RxButton } from "react-icons/rx";

import rgbHex from "rgb-hex";

export default function page() {
    const params = useParams<{ pageName: string }>()
    const [selected, setSelected] = useState<{ id: string, type: string }>({ id: "", type: "" })
    const [colorPicker, setColorPicker] = useState("#FFFF")
    const [addedElement, setAdded] = useState(false)
    const pcElementsMap =
        [
            {
                "type": "div",
                "style": {},
                "children": [
                    {
                        "type": "div",
                        "style": "dlld",
                        "children":[

                        ]
                    }
                ]
            },
        ]
        type ElementWithChildren = {
            type: string;
            style: {};
            children: ElementWithChildren[]; // Recursively defines children of the same type
          };
          
          function getElementById(id: string): ElementWithChildren | undefined {
            const idParts = id.split('-');
            let currentElement: ElementWithChildren[] = pcElementsMap;  // Assuming `pcElementsMap` is an array of ElementWithChildren objects
          
            console.log(idParts);
          
            for (let i = 0; i < idParts.length - 1; i++) {
              const index = parseInt(idParts[i], 10);
          
              // Ensure that currentElement is an array and contains children
              if (Array.isArray(currentElement)) {
                const nextElement = currentElement[index];
                if (nextElement && Array.isArray(nextElement.children)) {
                  currentElement = nextElement.children;  // Move to the next level of children
                } else {
                  return undefined; // Return undefined if there are no children at this level
                }
              } else {
                return undefined; // Return undefined if currentElement is not an array
              }
            }
          
            // Final step: access the last child element
            const index = parseInt(idParts[idParts.length - 1], 10);
            if (Array.isArray(currentElement)) {
              return currentElement[index]; // Return the element at the specified index
            }
          
            return undefined; // Return undefined if the element isn't found
          }
          
        
    const boarBorder = () => {
        const boards = document.getElementsByClassName("elem")

        for (let i = 0; i < boards.length; i++) {
            const element = boards[i] as HTMLElement
            element.style.outline = "none"
        }
    }

    

    const selectBoard = (id: string,type:string) => {
        boarBorder()
        document.getElementById(id)!.style.outline = "2px blue solid"
        if (document.getElementById(id)!.style.backgroundColor) {
            setColorPicker("#" + rgbHex(document.getElementById(id)!.style.backgroundColor))
        }
        setSelected({
            id: id,
            type: type
        })

    }

    const addBox = ()=>{
        const parentElem = document.getElementById(selected.id)
        const parentPos= getElementById(selected.id)

        const newElem = document.createElement("div")

        newElem.style.width = "30px"
        newElem.style.height = "30px"

        newElem.style.backgroundColor = "rgb(0,0,0)"
        newElem.className = "elem"

        parentPos?.children.push(
            {
                "type":"div",
                "style":newElem.style,
                "children" : []
            }
        )

        newElem.id = `${selected.id}-${parentPos?.children.length}`

        newElem.onclick = ()=>{
            event.stopPropagation()
            selectBoard(newElem.id,"div")
        }

        parentElem?.appendChild(newElem)
        document.getElementById("brd")!.style.pointerEvents = "initial"
        document.getElementById("brd")!.style.filter = "none"

        const elemtens = document.getElementsByClassName("edt")

        for (let i = 0; i < elemtens.length; i++) {
            let el = elemtens[i] as HTMLElement
            el.style.pointerEvents = "initial"
            el.style.filter = "none"
        }

        setAdded(false)


    }

    const addElement = () => {
        return <div className="absolute w-[40vw] h-[15vh] left-[30vw] bg-[#1E1E1E] text-white flex flex-cell m-5 p-5 justify-around">
            <MdFullscreenExit className="hover:text-[red] hover:cursor-pointer" onClick={
                () => {
                    document.getElementById("brd")!.style.pointerEvents = "initial"
                    document.getElementById("brd")!.style.filter = "none"

                    const elemtens = document.getElementsByClassName("edt")

                    for (let i = 0; i < elemtens.length; i++) {
                        let el = elemtens[i] as HTMLElement
                        el.style.pointerEvents = "initial"
                        el.style.filter = "none"
                    }

                    setAdded(false)
                }
            } />

            <div className="border w-1/4 flex flex-col justify-center items-center hover:bg-[gray] hover:text-black hover:cursor-pointer">
                <FaRegImage />
                <h2>Image</h2>
            </div>

            <div className="border w-1/4 flex flex-col justify-center items-center hover:bg-[gray] hover:text-black hover:cursor-pointer" onClick={
                () => {
                    addBox()
                }
            }>
                <ImCheckboxUnchecked />
                <h2>Box</h2>
            </div>

            <div className="border w-1/4 flex flex-col justify-center items-center hover:bg-[gray] hover:text-black hover:cursor-pointer">
                <RxButton />
                <h2>Button</h2>
            </div>

        </div>


    }

    return <main className="flex w-full">
        <div className="w-full flex justify-center items-center" id="brd">

            <div className="w-[45vw] h-[30vw] bg-white elem m-3" id="pc" onClick={
                () => {
                    selectBoard("pc","board")
                }
            }></div>

            <div className="w-[20vw] h-[40vw] bg-white elem " id="mobile" onClick={
                () => {
                    selectBoard("mobile","board")
                }
            }></div>

        </div>

        {addedElement && addElement()}

        {selected.id &&
            <div className="w-[15vw] bg-[#1E1E1E] h-[100vh] p-3 edt" >
                <label className="text-white m-3">bg color : </label>

                <div className="flex">
                    <input type="color" className="w-[20%]" value={colorPicker} onChange={
                        (e) => {
                            setColorPicker(e.target.value)
                            if (selected.id) {
                                document.getElementById(`${selected.id}`)!.style.backgroundColor = e.target.value
                            }

                        }
                    } />
                    <input type="text" className="w-[60%]" value={colorPicker} onChange={
                        (e) => {
                            setColorPicker(e.target.value)
                            if (selected.id) {
                                document.getElementById(`${selected.id}`)!.style.backgroundColor = e.target.value
                            }
                        }
                    } />
                
                
                </div>

                

                <button className="text-white font-bold p-1 bg-[#706f6f] w-fit text-center rounded-sm" onClick={
                    () => {
                        document.getElementById("brd")!.style.pointerEvents = "none"
                        document.getElementById("brd")!.style.filter = "blur(2px)"

                        const elemtens = document.getElementsByClassName("edt")

                        for (let i = 0; i < elemtens.length; i++) {
                            let el = elemtens[i] as HTMLElement
                            el.style.pointerEvents = "none"
                            el.style.filter = "blur(2px)"
                        }

                        setAdded(true)
                    }
                }>
                    add element
                </button>
            </div>}
    </main>
}
