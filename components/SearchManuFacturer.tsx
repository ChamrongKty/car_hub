"use client";
import { manufacturers } from "@/constants/constant";
import { SearchManufacturerProps } from "@/type";
import { Combobox, Transition } from "@headlessui/react";
import Image from "next/image";
import React, { Fragment, useState } from "react";
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const SearchManuFacturer = ({
  selected,
  setSelected,
}: SearchManufacturerProps) => {
  const [query, setQuery] = useState("");

  const filteredManufacturer =
    query === ""
      ? manufacturers
      : manufacturers.filter((manufacturer) => {
          return manufacturer
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""));
        });
  return (
    <div className="search-manufacturer">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative w-full">
          <Combobox.Button className={"absolute top-[14px]"}>
            <Image
              src={"/car-logo.svg"}
              alt="Car logo"
              width={20}
              height={20}
              className="ml-4"
            />
          </Combobox.Button>
          <Combobox.Input
            className={"search-manufacturer__input"}
            placeholder="Volswagen"
            displayValue={(manufacturer: string) => {
              return manufacturer;
            }}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options>
              {filteredManufacturer.map((manufacturer) => (
                <Combobox.Option
                  key={manufacturer}
                  className={({ active }) =>
                    `relative search-manufacturer__option ${
                      active ? "bg-primary-blue text-white" : "text-gray-900"
                    }`
                  }
                  value={manufacturer}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {manufacturer}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-white" : "text-teal-600"
                          }`}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchManuFacturer;
