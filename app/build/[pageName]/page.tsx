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
    const [board, setBoard] = useState<string>()
    const [colorPicker, setColorPicker] = useState("#FFFF")
    const [addedElement, setAdded] = useState(false)
    let [pcElementsMap, setPcElement] = useState<ElementWithChildren[]>([]);
    let [mbElementsMap, setMbElement] = useState<ElementWithChildren[]>([]);


    type ElementWithChildren = {
        type: string;
        style: {};
        children: ElementWithChildren[]; // Recursively defines children of the same type
    };

    function getElementById(id: string, arr: ElementWithChildren[]): ElementWithChildren | undefined {
        const idPath = id.split("-")
        let element

        for (let i = 0; i < idPath.length; i++) {
            if (i == 0) {
                element = arr[Number(idPath[i])]
            } else {
                element = element!.children[Number(idPath[i])]
            }
        }

        return element;
    }


    const boarBorder = () => {
        const boards = document.getElementsByClassName("elem")

        for (let i = 0; i < boards.length; i++) {
            const element = boards[i] as HTMLElement
            element.style.outline = "none"
        }
    }

    const closeAdding = () => {
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

    const selectBoard = (id: string, type: string) => {
        boarBorder()
        document.getElementById(id)!.style.outline = "2px blue solid"
        if (document.getElementById(id)!.style.backgroundColor) {
            setColorPicker("#" + rgbHex(document.getElementById(id)!.style.backgroundColor))
        }
        if (type == "board") {
            setBoard(id)
        }
        setSelected({
            id: id,
            type: type
        })

    }

    const addBox = () => {
        const parentElem = document.getElementById(selected.id);
        const newBox = document.createElement("div")

        newBox.style.width = "100px"
        newBox.style.height = "100px"
        newBox.style.backgroundColor = "rgb(0,0,0)"
        newBox.className = "elem"

        let id;
        const el = {
            "type": "div",
            "style": newBox.style,
            "children": []
        }

        if (selected.id === board) {
            console.log("hii");

            if (board === "mobile") {
                setMbElement((arr) => {
                    arr.push(el)
                    const id = `${arr.length - 1}`
                    newBox.id = id

                    return arr
                })

                parentElem?.appendChild(newBox)
            } else if (board === "pc") {
                setPcElement(
                    (arr) => {
                        arr.push(el)
                        id = `${pcElementsMap.length}`
                        newBox.id = id
                        return arr
                    }
                )

                parentElem?.appendChild(newBox)

            }

        } else {
            if (board == "pc") {
                setPcElement(
                    (arr) => {
                        const parentPath = getElementById(selected.id, arr)
                        parentPath?.children.push(el)
                        id = `${selected.id}-${parentPath!.children.length - 1}`
                        newBox.id = id

                        return arr
                    }
                )
            } else if (board == "mobie") {
                setMbElement(
                    (arr) => {
                        const parentPath = getElementById(selected.id, arr)
                        parentPath?.children.push(el)
                        id = `${selected.id}-${parentPath!.children.length - 1}`
                        newBox.id = id

                        return arr
                    }
                )
            }
            parentElem?.appendChild(newBox)
        }
        console.log(id);

        newBox.onclick = () => {
            event?.stopPropagation()
            selectBoard(id!, "div")
        }

        closeAdding()
    }

    const addElement = () => {
        return <div className="absolute w-[40vw] h-[15vh] left-[30vw] bg-[#1E1E1E] text-white flex flex-cell m-5 p-5 justify-around">
            <MdFullscreenExit className="hover:text-[red] hover:cursor-pointer" onClick={
                () => {
                    closeAdding()
                }
            } />

            <div className="border w-1/4 flex flex-col justify-center items-center hover:bg-[gray] hover:text-black hover:cursor-pointer">
                <FaRegImage />
                <h2>Image</h2>
            </div>

            <div className="border w-1/4 flex flex-col justify-center items-center hover:bg-[gray] hover:text-black hover:cursor-pointer" onClick={
                () => {
                    console.log('dkopkd');

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
                    selectBoard("pc", "board")
                }
            }></div>

            <div className="w-[20vw] h-[40vw] bg-white elem " id="mobile" onClick={
                () => {
                    selectBoard("mobile", "board")
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
