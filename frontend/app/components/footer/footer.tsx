import React from "react";
import Image from "next/image";
const Footer = () => {
  return (
    <div>
      <footer className="flex flex-col flex-wrap bg-slate-700 gap-4 p-8 w-full md:flex-row md:justify-between md:sticky md:bottom-0 md:left-64 md:w-[calc(100%-256px)]">
        <div className="flex flex-col gap-4">
          <div className="w-52 h-52 rounded-full bg-slate-50"><Image
            src="/images/AirFinLogo.png"
            alt="AirFin Logo"
            width={200}
            height={200}
          />
          </div>
          <p className="font-bold text-zinc-200">
            Empowering Your Financial Future
          </p>
        </div>

        <div className="flex-col">
          <p className="font-bold text-slate-400">Navigation</p>
          <ul className="list-none text-zinc-200">
            <li>Home</li>
            <li>Info</li>
          </ul>
        </div>

        <div className="flex-col">
          <p className="font-bold text-slate-400">Get in touch</p>

          <ul className="list-none text-blue  italic">
            <a href="mailto:dorindaania19@gmail.com" className="hover:text-slate-500">
                <li>dorindaania19@gmail.com</li>
            </a>
            <a href="mailto:thierrydagbey45@gmail.com" className="hover:text-slate-500">
                <li>thierrydagbey45@gmail.com</li>
            </a>          
            <a href="mailto:austinmorlu693@gmail.com" className="hover:text-slate-500">
                <li>austinmorlu693@gmail.com</li>
            </a>             
          </ul>
        </div>

        <div className="flex-col">
            <p className="font-bold text-slate-400">Our Address</p>
            <address className="text-zinc-200">
                123 Main Street <br />
                Suite 400 <br />
                Accra, Ghana
            </address>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
