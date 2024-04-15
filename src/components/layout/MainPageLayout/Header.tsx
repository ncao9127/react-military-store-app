"use client";

import Link from "next/link";
import {useSession} from "next-auth/react";
import React, {useContext, useEffect, useState} from "react";
import {CartContext} from "@/components/AppContext";
import Image from "next/image";
import {VscThreeBars} from "react-icons/vsc";
import {FaChevronDown, FaRegHeart, FaRegUser} from "react-icons/fa";
import {RiShoppingCart2Line} from "react-icons/ri";
import {CategoryType} from "@/components/Types/CategoryType";
import {GetCategories} from "@/app/ApiRequest/ApiRequest";

export const Header = () => {
    const session = useSession()
    const status = session.status

    const userData = session.data?.user
    let userName = userData?.name || userData?.email

    const {cartProducts} = useContext(CartContext) as any;

    const [categories, setCategories] = useState([])
    const [isActiveCategory, setIsActiveCategory] = useState(false)

    useEffect(() => {
        GetCategories(setCategories)
    }, [])

    if (userName && userName.includes(" ")) {
        userName = userName?.split(' ')[0]
    }

    return (
        <header>
            <div className="flex items-center justify-between gap-2 my-container">
                <div>
                    <Link className="bg-gradient-to-r from-purple-500 to-blue-600 bg-clip-text text-transparent
            font-semibold text-4xl" href="/">
                        ALANEC
                    </Link>
                </div>

                <div className="flex gap-4">
                    <p>Доставка</p>
                    <p>Про нас</p>
                    <p>Контакти</p>
                </div>

                <div className="flex gap-4">
                    <div className="bg-gray-200 p-3 flex gap-2">
                        <a href="https://www.instagram.com/alamay_necron/">
                            <Image
                                src={'/instagram.svg'}
                                alt={"Img instagram"}
                                width={25}
                                height={25}
                            />
                        </a>
                        <a href="https://t.me/Alamay_Necron">
                            <Image
                                src={'/telegram.svg'}
                                alt={"Img telegram"}
                                width={25}
                                height={25}
                            />
                        </a>
                        <a href="tel:+380684300807">
                            <Image
                                src={'/phone.svg'}
                                alt={"Img phone"}
                                width={25}
                                height={25}
                            />
                        </a>
                    </div>


                    <div className="flex items-center justify-center">
                        Укр
                        <FaChevronDown/>
                    </div>
                </div>

            </div>
            <div className="bg-black max-w-screen">
                <div className="grid grid-cols-[1fr,4fr,1fr] gap-6 my-container">
                    <div>
                        <div className="flex px-10 h-full items-center justify-center text-white gap-1
                        bg-gradient-to-br from-neonNazar to-blue-600">
                            Категорії

                            <VscThreeBars className="h-6 w-6"
                                          onClick={() => setIsActiveCategory(!isActiveCategory)}/>
                        </div>

                        <div className="relative"
                             onMouseLeave={() => setIsActiveCategory(false)}>
                            {isActiveCategory && (
                                <div className="absolute bg-gray-100 p-4 top-0">
                                    <p className="font-bold text-xl">Категорії</p>

                                    {categories?.length > 0 && categories.map((c: CategoryType) => (
                                        <div className="px-4 py-1 gap-2 cursor-pointer" key={c._id}>
                                            <div className="flex graw justify-between items-center">
                                                <Link href={`/category/` + c._id}>
                                                    <span>{c.name}</span>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}

                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <input type="text" placeholder="Search"
                               className="w-1/2"/>
                    </div>


                    <nav className="gap-6 flex items-center font-semibold px-2">
                        {status === "authenticated" && (
                            <>
                                <Link href={'/profile'}>
                                    <p className="text-white flex justify-center items-center">
                                        {userName}
                                        <FaRegUser className="w-5 h-5"/>
                                    </p>
                                </Link>
                            </>
                        )}

                        {status !== "authenticated" && (
                            <>
                                <Link href={'/login'} className="text-white">
                                    Login
                                </Link>
                                <Link href={'/register'} className="bg-gradient-to-br from-neonNazar to-blue-600
                         text-white px-4 py-2 rounded-full">
                                    Register
                                </Link>
                            </>
                        )}

                        <Link href={'/like'} className="relative">
                            <div style={{filter: "brightness(0) invert(1)"}}>
                                <FaRegHeart className="h-5 w-5"/>
                            </div>
                            <span className="absolute bg-gradient-to-br
                                             from-neonNazar to-blue-600 -top-2 -right-4 text-white
                                             text-xs py-1 px-2 rounded-full leading-3">
                                  0
                           </span>
                        </Link>

                        <Link href={'/cart'} className="relative">
                            <div style={{filter: "brightness(0) invert(1)"}}>
                                <RiShoppingCart2Line className="h-6 w-6"/>
                            </div>
                            <span className="absolute bg-gradient-to-br
                                             from-neonNazar to-blue-600 -top-2 -right-4 text-white
                                             text-xs py-1 px-2 rounded-full leading-3">
                                  {cartProducts.length}
                           </span>
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    )
}