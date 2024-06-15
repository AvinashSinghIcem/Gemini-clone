import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context';

const Main = () => {
    const {  
        onSent,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        }=useContext(Context);
        const cardsData=[{
            title:'Suggest some tourist places in Pune',
            icon:assets.compass_icon
        },
        {
            title:'Brefily summarize this concept: urban development',
            icon:assets.bulb_icon
        },
        {
            title:'Brainstorm team bonding activities for our work retreat',
            icon:assets.message_icon
        },
        {
            title:'How to improve the readability of code?',
            icon:assets.code_icon
        }
        ];

  return (
    <div className='main'>
        <div className="nav">
            <p>Gemini</p>
            <img src={assets.user_icon} alt="" />
        </div>
        <div className="main-container">
            {!showResult ? <>
            <div className="greet">
                <p><span>Hello, Dev.</span></p>
                <p>How can I help you today?</p>
            </div>
            <div className="cards">
                {cardsData.map((card,index)=>(
                    <div key={index} className="card"  onClick={()=>onSent(card.title)}>
                        <p>{card.title}</p>
                        <img src={card.icon} alt="" />
                    </div>
                ))}
            </div>
            
            </>:
            <div className="result">
                <div className="result-title">
                    <img src={assets.user_icon} alt="" />
                    <p>{recentPrompt}</p>
                </div>
                <div className="result-data">
                    <img src={assets.gemini_icon} alt="" />
                    {loading ? <div className="loader">
                        <hr />
                        <hr />
                        <hr />
                    </div>: 
                    <p dangerouslySetInnerHTML={{__html:resultData}}></p>
                    
                    }
                </div>
            </div>
            }
            
            <div className="main-bottom">
                <div className="search-box">
                    <input type="text" onChange={(e)=>setInput(e.target.value)} value={input} placeholder='Enter a prompt here' />
                    <div>
                        <img src={assets.gallery_icon} alt="GALLERY" />
                        <img src={assets.mic_icon} alt="MIC" />
                       {input ? <img onClick={()=>onSent()} src={assets.send_icon} alt="SEND" />:null}
                    </div>
                </div>
                    <p className="bottom-info">
                        Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy & Gemini Apps
                    </p>
            </div>
        </div>
    </div>
  )
}

export default Main
