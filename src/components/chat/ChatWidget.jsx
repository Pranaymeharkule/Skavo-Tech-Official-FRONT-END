import { useState } from "react";
import api from "../../api/axios";

export default function ChatWidget(){

 const [open,setOpen]=useState(false);
 const [msg,setMsg]=useState("");
 const [chat,setChat]=useState([]);

 const send = async ()=>{
  if(!msg) return;

  setChat([...chat,{role:"user",text:msg}]);

  const res = await api.post("/chat",{sessionId:"web",message:msg});

  setChat(c=>[...c,{role:"assistant",text:res.data.reply}]);
  setMsg("");
 };

 return(
  <div className="fixed bottom-6 right-6 z-50">

   {open && (
    <div className="w-80 h-96 bg-white shadow-2xl rounded-xl flex flex-col">

     <div className="bg-brand text-white p-4 rounded-t-xl">
      Skavo AI Assistant
     </div>

     <div className="flex-1 p-3 overflow-y-auto space-y-2">
      {chat.map((c,i)=>(
       <div key={i} className={c.role==="user"?"text-right":""}>
        <span className="inline-block bg-gray-100 px-3 py-1 rounded">
         {c.text}
        </span>
       </div>
      ))}
     </div>

     <div className="p-3 flex gap-2">
      <input
       value={msg}
       onChange={e=>setMsg(e.target.value)}
       className="border flex-1 p-2 rounded"
       placeholder="Ask something..."
      />
      <button
       onClick={send}
       className="bg-brand text-white px-3 rounded"
      >
       →
      </button>
     </div>

    </div>
   )}

   <button
    onClick={()=>setOpen(!open)}
    className="w-14 h-14 bg-brand text-white rounded-full shadow-xl"
   >
    💬
   </button>

  </div>
 );
}