import React from "react";
import Link from "next/link";
import Image from "next/image";
import { footerLinks } from "@/constants/constant";

const Footer = () => {
  return (
    <footer className="flex flex-col text-black-100 mt-5 border-t border-gray-100">
      <div className="flex max-md:flex-col flex-wrap justify-between gap-5 px-6 py-10">
        <div className="flex flex-col justify-start items-start gap-6">
          <Image
            src={"/logo.svg"}
            alt="logo"
            width={118}
            height={18}
            className="object-contain"
          />
          <p className="text-base text-gray-700">
            Car Hub <br /> All rights reserved &copy;
          </p>
        </div>
        <div className="footer__links">
          {footerLinks.map((link) => {
            return (
              <div key={link.title} className="footer__link">
                <h3 className="font-bold">{link.title}</h3>
                {link.links.map((item) => {
                  return (
                    <Link key={item.title} href={item.url}>
                      {item.title}
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-between items-center flex-wrap mt-10 border-t border-gray-100 px-6 py-10">
        <p>@2023 CarHub.All rights reserved.</p>
        <div className="footer__copyrights-link">
          <Link href={"/"} className="text-gray-100">
            Policy Policy
          </Link>
          <Link href={"/"} className="text-gray-100">
            Terms of use
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
