import { FaPager } from "react-icons/fa"

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
    const pages = ["page1","page2","page3","page4"]
    return <main className="flex flex-row bg-[#B4ADAD]">
        <div className="w-[15vw] bg-[#1E1E1E] h-[100vh] p-3 edt"  >
            <div className="text-white font-bold p-1 bg-[#706f6f] w-fit text-center rounded-sm" >pages</div>
            {
                pages.map(
                    (e,i)=>{
                        return <div key={i} className="text-white flex justify-center items-center cursor-pointer hover:text-[#706f6f]">
                            <div className="w-full h-[1px] bg-white m-[1px] hover:bg-[#706f6f]"></div>
                            <FaPager />
                            <h2 className="m-1">{e}</h2>
                        </div>
                    }
                )
            }
        </div>
        
        {children}
    </main>
}