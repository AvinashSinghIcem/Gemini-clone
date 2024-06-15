import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = ({ children }) => {
    const [input, setInput] = useState('');
    const [recentPrompt, setRecentPrompt] = useState('');
    const [previousPrompt, setPreviousPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState('');

    const delayedPara = (index, next) => {
        setTimeout(() => {
            setResultData(prev => prev + next);
        }, 75 * index);
    };

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    };

    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        
        let response;
        if (prompt !== undefined) {
            response = await run(prompt);
            setRecentPrompt(prompt);
        } else {
            setPreviousPrompt(prev => [...prev, input]);
            setRecentPrompt(input);
            response = await run(input);
        }

        const resArray = response.split("**");
        let formattedResponse = "";
        for (let i = 0; i < resArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                formattedResponse += resArray[i];
            } else {
                formattedResponse += "<b>" + resArray[i] + "</b><br/>";
            }
        }
        const newResponse = formattedResponse.split("*").join("<br/>");
        const newResponseArray = newResponse.split(" ");
        newResponseArray.forEach((word, i) => {
            delayedPara(i, word + " ");
        });

        setLoading(false);
        setInput("");
    };

    const contextValue = {
        previousPrompt,
        setPreviousPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        run,
        newChat
    };

    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default ContextProvider;
