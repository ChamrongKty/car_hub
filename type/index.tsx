import { MouseEventHandler } from "react";

export interface CustomButtonProps {
  title: string;
  btnType: "button" | "submit" | "reset";
  containerStyle?: string;
  textStyles?: string;
  rightIcon?: string;
  disabled:boolean;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface CustomFilterProps {
  title: string;
  options: OptionProps[];
  setFilter:(value:any)=>void
}
export interface OptionProps{
  title:string;
  value:string;
}
export interface SearchManufacturerProps {
  selected: string;
  setSelected: (selected: string) => void;
}

export interface CarProps {
  city_mpg: number;
  class: string;
  combination_mpg: number;
  cylinders: number;
  displacement: number;
  drive: string;
  fuel_type: string;
  highway_mpg: number;
  make: string;
  model: string;
  transmission: string;
  year: number;
}

export interface CarDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
  car: CarProps;
}


export interface FilterProps{

  manufacturer? : string;
  year ?: number;
  fuel ?: string;
  limit? : number;
  model ?: string;
}

export interface ShowMoreProps{
  pageNumber:number;
  isNext:boolean;
  setLimit:(value:number)=>void;
}