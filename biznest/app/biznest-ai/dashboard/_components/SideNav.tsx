import React, { useEffect } from "react";
import Image from "next/image";
import {
  LayoutGrid,
  PiggyBank,
  ReceiptText,
  ShieldCheck,
  CircleDollarSign,
  TrendingUp,
  TrendingDownIcon,
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";
function SideNav() {
  const menuList = [
    {
      id: 1,
      name: "Панель",
      icon: LayoutGrid,
      path: "/biznest-ai/dashboard",
    },
    {
      id: 2,
      name: "Доходы",
      icon: CircleDollarSign,
      path: "/biznest-ai/dashboard/incomes",
    },
    {
      id: 2,
      name: "Бюджеты",
      icon: PiggyBank,
      path: "/biznest-ai/dashboard/budgets",
    },
    {
      id: 3,
      name: "Затраты",
      icon: ReceiptText,
      path: "/biznest-ai/dashboard/expenses",
    },
    {
      id: 4,
      name: "Finance Чат",
      icon: ShieldCheck,
      path: "/biznest-ai/dashboard/chat",
    },
    // {
    //   id: 2,
    //   name: "Investments",
    //   icon: TrendingUp,
    //   path: "/dashboard/investments",
    // },
    // {
    //   id: 2,
    //   name: "Debts",
    //   icon: TrendingDownIcon,
    //   path: "/dashboard/debts",
    // },
    {
      id: 5,
      name: "Платная подписка",
      icon: ShieldCheck,
      path: "/biznest-ai/dashboard/upgrade",
    },
  ];
  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, [path]);
  return (
    <div className="fixed top-0 left-0 h-screen w-64 p-5 border-r shadow-sm bg-white z-50">
      <div className="flex flex-row items-center">
        <Image src={"../chart-donut.svg"} alt="logo" width={40} height={25} />
        <span className="text-indigo-950 font-bold text-xl ml-2">BizNest Finance</span>
      </div>
      <div className="mt-5">
        {menuList.map((menu, index) => (
          <Link href={menu.path} key={index}>
            <h2
              className={`flex gap-2 items-center text-gray-500 font-medium mb-2 p-4 cursor-pointer rounded-full hover:text-primary hover:bg-blue-100 ${
                path === menu.path ? "text-primary bg-blue-100" : ""
              }`}
            >
              <menu.icon />
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>
      <div className="fixed bottom-10 p-5 flex gap-2 items-center">
        <UserButton />
        <span>Профиль</span>
      </div>
    </div>
  );
}

export default SideNav;
