import { useCallback, useState, useEffect, useRef } from "react";
export default function Mini() {
  let [password, setPassword] = useState("");
  let [number, setNumber] = useState(false);
  let [length, setLength] = useState(8);
  let [character, setCharacter] = useState(false);
  const passwordRef = useRef(null);

  let passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (character) str += "!@#$%^&*()_+";
    if (number) str += "0123456789";

    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length));
    }
    setPassword(pass);
  }, [character, number, length]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator, character, number, length]);

  return (
    <div
      className=" w-full
      text-center
      max-w-md
      mx-auto
      shadow-md
      rounded-lg
      px-4
      py-3
      my-8
      bg-gray-800
      text-orange-500"
    >
      <div className="flex shadow rounded-lg overflow-hidden mb-4 center">
        <input
          type="text"
          className="w-72 h-10 py-1 px-3   text-orange-500"
          placeholder="Password"
          value={password}
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          s
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
        >
          copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-2">
          <input
            type="range"
            max={40}
            min={8}
            id="length"
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(e.target.value)}
          />
          <label htmlFor="length">Length-{length}</label>
        </div>
        <div className="flex items-center gap-x-2">
          <input
            type="checkbox"
            id="number"
            defaultChecked={number}
            onChange={() => setNumber((prev) => !prev)}
          />
          <label htmlFor="number">Number</label>
        </div>
        <div className="flex items-center gap-x-2">
          <input
            type="checkbox"
            id="character"
            defaultChecked={character}
            onChange={() => setCharacter((prev) => !prev)}
          />
          <label htmlFor="character">Character</label>
        </div>
      </div>
    </div>
  );
}
