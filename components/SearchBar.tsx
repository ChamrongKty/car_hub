"use client";
import React, { useState } from "react";
import { SearchManuFacturer } from ".";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SearchButton = ({ otherClass }: { otherClass: string }) => {
  return (
    <button type="submit" className={`ml-3 z-10 ${otherClass}`}>
      <Image
        src={`/magnifying-glass.svg`}
        alt="maginifying glass"
        width={40}
        height={40}
        className="object-contain"
      />
    </button>
  );
};

const SearchBar = ({
  setManufacturer,setModel
}:any) => {
  const [searchManufacturer, setSearchMenufacturer] = useState("");
  const [searchModel, setSearchModel] = useState("");

  const router = useRouter();
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchManufacturer === "" && searchModel === "") {
      // return alert("Please fill in the search bar");
    }
    setModel(searchModel)
    setManufacturer(searchManufacturer);
  };

  return (
    <form className="searchbar" onSubmit={(e)=>handleSearch(e)}>
      <div className="searchbar__item">
        <SearchManuFacturer
          selected={searchManufacturer}
          setSelected={setSearchMenufacturer}
        />
      </div>

      <div className="searchbar__item">
        <Image
          src={`/model-icon.png`}
          width={25}
          height={25}
          className="absolute w-[20px] h-[20px] ml-4"
          alt="car model"
        />
        <input
          type="text"
          name="model"
          value={searchModel}
          onChange={(e) => setSearchModel(e.target.value)}
          placeholder="Tiguan"
          className="searchbar__input"
        />
        <SearchButton otherClass={"sm:hidden"} />
      </div>
      <SearchButton otherClass={"max-sm:hidden"} />
    </form>
  );
};

export default SearchBar;
