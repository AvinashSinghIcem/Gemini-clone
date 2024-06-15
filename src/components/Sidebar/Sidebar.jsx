import React, { useState,useContext } from 'react'
import './Sidebar.css'
import {assets} from '../../assets/assets'
import { Context } from '../../context/Context'
const Sidebar = () => {

    const [expand,setExapnd]=useState(false)
    const {onSent,previousPrompt,setRecentPrompt,newChat}=useContext(Context)
    const loadPrompt=async(prompt)=>{
        setRecentPrompt(prompt)
        await onSent(prompt)
    }
  return (
    <div className='sidebar'>
        <div className="top">
            <img onClick={()=>setExapnd((expd)=>!expd)} className='menu' src={assets.menu_icon} alt="menu" />
            <div onClick={()=>newChat()} className="new-chat">
                <img src={assets.plus_icon} alt="" />
                {expand ? <p>New Chat</p>:null}
            </div>
           { expand ? <div className="recent">
                <p className="recent-title">Recent</p>
                {
                    previousPrompt.map((prompt,index)=>(

                        <div onClick={()=>loadPrompt(prompt)} key={index} className="recent-entry">
                            <img src={assets.message_icon} alt="" />
                            <p>{prompt.slice(0,18)} ...</p>
                        </div>
                    ))
                }

            </div>:null}
        </div>
        <div className="bottom">
            <div className="bottom-item recent-entry">
                <img src={assets.question_icon} alt="" />
                {expand ?<p>Help</p>:null}
            </div>
            <div className="bottom-item recent-entry">
                <img src={assets.history_icon} alt="" />
                {expand ? <p>Activity</p>: null}
            </div>
            <div className="bottom-item recent-entry">
                <img src={assets.setting_icon} alt="" />
                {expand ? <p>Settings</p>:null}
            </div>
        </div>
      
    </div>
  )
}

export default Sidebar
