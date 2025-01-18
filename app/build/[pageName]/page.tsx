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

    const boarBorder = () => {
        const boards = document.getElementsByClassName("board")

        for (let i = 0; i < boards.length; i++) {
            const element = boards[i] as HTMLElement
            element.style.outline = "none"
        }
    }

    const selectBoard = (id: string) => {
        boarBorder()
        document.getElementById(id)!.style.outline = "2px blue solid"
        if (document.getElementById(id)!.style.backgroundColor) {
            setColorPicker("#" + rgbHex(document.getElementById(id)!.style.backgroundColor))
        }
        setSelected({
            id: id,
            type: "board"
        })

    }

    const addElement = () => {
        return <div className="absolute w-[40vw] h-[15vh] left-[30vw] bg-[#1E1E1E] text-white flex flex-cell m-5 p-5 justify-around">
           <MdFullscreenExit className="hover:text-[red] hover:cursor-pointer" onClick = {
            ()=>{
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
           }/>

            <div className="border w-1/4 flex flex-col justify-center items-center hover:bg-[gray] hover:text-black hover:cursor-pointer">
                <FaRegImage />
                <h2>Image</h2>
            </div>

            <div className="border w-1/4 flex flex-col justify-center items-center hover:bg-[gray] hover:text-black hover:cursor-pointer" onClick={
                ()=>{
                    const parent = document.getElementById(selected.id)
                    const ele = document.createElement("div")
                    const arr = selected.id.split("")
                    
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

            <div className="w-[45vw] h-[30vw] bg-white board m-3" id="pc-board" onClick={
                () => {
                    selectBoard("pc-board")
                }
            }></div>

            <div className="w-[20vw] h-[40vw] bg-white board " id="mobile-board" onClick={
                () => {
                    selectBoard("mobile-board")
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
