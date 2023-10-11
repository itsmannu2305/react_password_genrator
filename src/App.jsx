import { useEffect, useCallback, useRef, useState } from "react";

function App() {
  // <======================== Methods State ==========================>
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [symbolAllowed, setsymbolAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // <======================== Random password genrate with optimazation ==========================>
  const passwordGenrate = useCallback(() => {
    let pass = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghjiklmnopqrstuvwxyz";
    let number = "0123456789";
    let symbols = "!@#$~%-&*_";

    if (numberAllowed) {
      string += number;
    }

    if (symbolAllowed) {
      string += symbols;
    }

    for (let index = 1; index <= length; index++) {
      let char = Math.floor(Math.random() * string.length + 1);
      pass += string.charAt(char);
    }

    setPassword(pass);
  }, [numberAllowed, symbolAllowed, length, setPassword]);

  // <======================== Random password genrate call method ==========================>
  useEffect(() => {
    passwordGenrate();
  }, [length, numberAllowed, symbolAllowed, passwordGenrate]);

  // <======================== string clipboard ==========================>
  const passwordRef = useRef();

  const stringClipboard = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
  };

  return (
    <>
      <div className="password-genrator w-full h-screen flex justify-center items-start bg-gray-950">
        <h1 className="text-white text-3xl tracking-wide text-center mt-20 fixed">
          Password Genrator
        </h1>
        <div className="password-genrator-card p-8 mt-40 bg-white shadow-md rounded-lg shadow-purple-400 w-[35%]">
          {/* <=================== Password Form =================> */}
          <div className="password-form flex">
            <input
              type="text"
              placeholder="Password"
              name="password"
              ref={passwordRef}
              value={password}
              onChange={() => {
                setPassword(password);
              }}
              readOnly
              className="border-2 border-purple-400 rounded-l-md px-2 py-2 outline-purple-600 w-full"
            />

            {/* <=============== Password Copy Button =================>  */}
            <div className="password-copy-btn">
              <button
                onClick={() => stringClipboard()}
                className="px-4 py-2.5 rounded-r-md bg-purple-600 text-white font-medium tracking-wide -translate-x-1 hover:bg-purple-700"
              >
                Copy
              </button>
            </div>
          </div>

          {/* <========================== Password Methods (Numbers, Symbols, Length) ====================> */}
          <div className="password-methods flex items-center pt-8 gap-6">
            <div className="password-length">
              <input
                type="range"
                name="password-length"
                id="password-length"
                className="accent-purple-600"
                onChange={(e) => setLength(e.target.value)}
                value={length}
                min={8}
                max={30}
              />
              <label htmlFor="password-length" className="ml-3 text-gray-600">
                Password Length ({length < 10 ? "0" + length : length})
              </label>
            </div>

            <div className="string flex items-center">
              <input
                type="checkbox"
                name="number"
                id="number"
                className="mt-1 mr-1 accent-purple-600"
                defaultChecked={numberAllowed}
                onChange={() => {
                  setNumberAllowed((pre) => !pre);
                }}
              />
              <label htmlFor="number" className="text-gray-600">
                {" "}
                : Numbers
              </label>
            </div>

            <div className="string flex items-center">
              <input
                type="checkbox"
                name="string"
                id="string"
                className="mt-1 mr-1 accent-purple-600"
                defaultChecked={symbolAllowed}
                onChange={() => {
                  setsymbolAllowed((pre) => !pre);
                }}
              />
              <label htmlFor="string" className="text-gray-600">
                {" "}
                : Symbols
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
