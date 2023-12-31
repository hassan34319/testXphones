'use client'
import Link from "next/link";
import React, { useEffect } from "react";
import { BsBagCheckFill } from "react-icons/bs";
import { useStateContext } from "../context/stateContext";
import { runFireworks } from "../../lib/utils";

import "dotenv/config";

interface ResponseData {
  TransID?: string;
  // Include other properties as needed
}



interface Item {
  image: string;
  name: string;
  productId: string;
  color: string;
  capacity: number;
  grade: string;
  price: number;
  quantity: number;
}

type Props = {
};

function Success(Props: Props) {
  const { setCartItems, setTotalPrice, setTotalQuantity } = useStateContext();

  useEffect(() => {
    runFireworks();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantity(0);
    localStorage.removeItem('hMac Generation')
  }, [setCartItems, setTotalPrice, setTotalQuantity]);

  return (
    <div className="w-3/4 bg-white mx-auto mt-20 rounded p-4">
      <h1 className="text-center text-3xl">Merci pour votre commande !</h1>
      <BsBagCheckFill className="text-9xl text-green-500 mx-auto my-8" />
      <p className="text-center">
        Votre commande est en preparation, vous recevrez toutes les informations
        par mail.
      </p>
      <div className="cursor-pointer">
        <Link href="/">
          <h1 className="text-2xl text-center border border-black bg-green-600 px-4 py-2 w-2/3 mx-auto mt-8 rounded text-white">
            La boutique
          </h1>
        </Link>
      </div>
    </div>
  );
}

export default Success;

