import { CarProps,FilterProps } from "@/type";
import { Stripe, loadStripe } from '@stripe/stripe-js';

export async function fetchCars(filter:FilterProps) {

    const {manufacturer,model,year,fuel,limit} = filter;
    const headers =  {
		'X-RapidAPI-Key': '9852b3cd34msh2450f75b493e038p10fb89jsn19663fa7e223',
		'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
	};
    const response = await fetch(`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=${model}&year=${year}&make=${manufacturer}&limit=${limit}&fuel_type=${fuel}`,{
        headers:headers
    });

    const result = await response.json();
    return result;
}

export const calculateCarRent = (city_mpg: number, year: number) => {
    const basePricePerDay = 50; // Base rental price per day in dollars
    const mileageFactor = 0.1; // Additional rate per mile driven
    const ageFactor = 0.05; // Additional rate per year of vehicle age
  
    // Calculate additional rate based on mileage and age
    const mileageRate = city_mpg * mileageFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;
  
    // Calculate total rental rate per day
    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;
  
    return rentalRatePerDay.toFixed(0);
  };


  export  function generateCarImageUrl(car:CarProps,angle?:string) {
    const url = new URL(`https://cdn.imagin.studio/getimage`);
    const {make,year,model} = car;

    url.searchParams.append('customer','hrjavascript-mastery');
    url.searchParams.append('make',make);
    url.searchParams.append('modelFamily',model.split(' ')[0]);
    url.searchParams.append('zoomType','fullscreen');
    url.searchParams.append('modelYear',`${year}`);
    url.searchParams.append('angle',`${angle}`);

    return `${url}`;
}

export const updateSearchParams = (type:string,value:string) => {
    const searchParams = new URLSearchParams(window.location.search);


      searchParams.set(type, value);


    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

    return newPathname;
  };



let stripePromise: Promise<Stripe | null>;
export const handleLoadStripe = ()=>{
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
}

export function formatAmountForStripe(amount:number, currency:string) {
  // Check the currency and format the amount accordingly
  switch (currency) {
    case 'USD':
      // For USD, multiply the amount by 100 to convert it to cents
      return amount * 100;
    case 'EUR':
      // For EUR, also multiply by 100 as it uses cents
      return amount * 100;
    // Add cases for other currencies as needed
    case 'GBP':
      return amount * 100;
    // Handle other currencies here
    default:
      // If the currency is not recognized, you might want to throw an error or handle it differently
      throw new Error(`Unsupported currency: ${currency}`);
  }
}