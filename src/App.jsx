import React, { useState, useCallback, useEffect, useRef } from "react";

const App = () => {

  const [length, setlength] = useState(5);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setpassword] = useState("");

  // refHooks 
  const SelectPassword = useRef(null);
  const buttonRef = useRef(null);


  const PasswordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let num = "1243452667889117354121241241241241241231221";
    let char = ">/<*#@^__+*6']&^!+_)(*&^%#@1";

    if (numberAllowed) str += num;
    if (charAllowed) str += char;

    for (let i = 0; i < length; i++) {
      let RandomNum = Math.floor(Math.random() * str.length);
      let value = str.charAt(RandomNum);
      pass += value;
    }
    setpassword(pass);

  }, [length, setcharAllowed, setnumberAllowed, setpassword]);

  useEffect(() => {
    PasswordGenerator();
  }, [length, numberAllowed, charAllowed, setpassword]);

  const copy = () => {
    try {
      window.navigator.clipboard.writeText(password);
      SelectPassword.current.select();

      if (buttonRef.current) {
        buttonRef.current.style.backgroundColor = '#4CAF50'; 
        buttonRef.current.innerText = 'Copied!'; // Change button text

        setTimeout(() => {
          buttonRef.current.style.backgroundColor = '#3B82F6'; // Default blue color
          buttonRef.current.innerText = 'Copy'; // Reset button text
        }, 2000);
      }
    } catch (error) {
      console.log('Error which causing the issue', error);
    }
  };

  return (

    <div className="bg-slate-400 flex justify-center py-8">
      <div className="w-full max-w-[500px] md:w-[470px] min-h-[20rem] bg-slate-800 rounded-md shadow-md mx-[.5rem] md:px-8 px-5 py-5">
        {/* Top Section */}
        <div className="flex justify-center items-center h-[40%]">
          <div className="w-full flex">
            <input
              className="border w-[80%] h-10 rounded-s-lg focus:outline-none px-4 border-slate-400 text-slate-700 font-bold tracking-wider"
              type="text"
              readOnly
              value={password}
              ref={SelectPassword} // Corrected here
            />
            <button
             className="bg-blue-500 flex-grow rounded-e-lg font-bold text-white"
             onClick={() => {
              copy()
             }}
             ref={buttonRef}>
              Copy
            </button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="h-[60%] flex flex-col gap-8 p-5 text-slate-100">
          {/* Range Input */}
          <div className="flex justify-center">
            <input
              type="range"
              className="w-full sm:w-[280px] md:w-[250px]"
              min={5}
              max={30}
              value={length}
              onChange={(e) => setlength(e.target.value)}
            />
            <label className="ml-2 text-white font-bold">{length}</label>
          </div>

          {/* Checkboxes */}
          <div className="flex w-full md:flex-row flex-col gap-[2rem] mx-auto justify-between">
            <label className="flex items-center text-white">
              <input
                type="checkbox"
                className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-2"
                checked={numberAllowed}
                onChange={() => setnumberAllowed((prev) => !prev)}
              />
              <span className="ml-2">Include Numbers</span>
            </label>
            <label className="flex items-center text-white">
              <input
                type="checkbox"
                className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-2"
                checked={charAllowed}
                onChange={() => setcharAllowed((prev) => !prev)}
              />
              <span className="ml-2">Include Special Characters</span>
            </label>
          </div>
        </div>
      </div>
    </div>

  );
};

export default App;
