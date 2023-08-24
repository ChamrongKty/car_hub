"use client";
import { CustomFilter, Hero, SearchBar } from "@/components";
import CarCard from "@/components/CarCard";
import ShowMore from "@/components/ShowMore";
import { fuels, yearsOfProduction } from "@/constants/constant";
import { fetchCars } from "@/utils";
import { Suspense, useEffect, useState } from "react";
import Loading from "./loading";
import CarCardList from "@/components/CarCardList";

export default function Home() {
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  const [fuel, setFuel] = useState("");
  const [year, setYear] = useState(2022);

  const [limit, setLimit] = useState(10);
  return (
    <main className="overflow-hidden">
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container mt-12">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>
        <div className="home__filters">
          <SearchBar setManufacturer={setManufacturer} setModel={setModel} />
          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} setFilter={setFuel} />
            <CustomFilter
              title="year"
              options={yearsOfProduction}
              setFilter={setYear}
            />
          </div>
        </div>
        <Suspense fallback={<h1>Loading.....</h1>}>
            {/* <CarCardList model={model} fuel={fuel} manufacturer={manufacturer} limit={limit} setLimit={setLimit} year={year} /> */}
            <CarCardList/>
        </Suspense>
      </div>
    </main>
  );
}
