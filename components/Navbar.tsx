// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Menu, X } from "lucide-react";

// const NAV_LINKS = [
//   { href: "/about", label: "About" },
//   { href: "/products", label: "Our Products" },
//   { href: "/formulations", label: "Formulations" },
//   { href: "/manufacturing", label: "Manufacturing" },
//   { href: "/export", label: "Export" },
// ];

// export default function Navbar() {
//   const [open, setOpen] = useState(false);

//   return (
//     <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
//       <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between">
//         {/* Logo */}
//         <Link href="/" className="flex items-center">
//           <Image
//             src="/logo.png"
//             alt="Novitrail Pharmaceuticals"
//             width={140}
//             height={40}
//             priority
//           />
//         </Link>

//         {/* Desktop Nav */}
//         <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-700">
//           {NAV_LINKS.map(link => (
//             <Link
//               key={link.href}
//               href={link.href}
//               className="hover:text-novitrail-blue"
//             >
//               {link.label}
//             </Link>
//           ))}
//         </nav>

//         {/* Desktop CTA */}
//         <Link
//           href="/contact"
//           className="hidden md:inline-block bg-novitrail-orange text-white px-4 py-2 rounded-md text-sm hover:opacity-90 transition"
//         >
//           Request Quote
//         </Link>

//         {/* Mobile Menu Button */}
//         <button
//           onClick={() => setOpen(!open)}
//           className="md:hidden text-novitrail-blue"
//           aria-label="Toggle navigation menu"
//         >
//           {open ? <X size={26} /> : <Menu size={26} />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {open && (
//         <div className="md:hidden border-t bg-white">
//           <nav className="flex flex-col px-6 py-4 space-y-4 text-sm font-medium text-gray-700">
//             {NAV_LINKS.map(link => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 onClick={() => setOpen(false)}
//                 className="hover:text-novitrail-blue"
//               >
//                 {link.label}
//               </Link>
//             ))}

//             <Link
//               href="/contact"
//               onClick={() => setOpen(false)}
//               className="mt-2 bg-novitrail-orange text-white px-4 py-2 rounded-md text-center"
//             >
//               Request Quote
//             </Link>
//           </nav>
//         </div>
//       )}
//     </header>
//   );
// }

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ChevronRight } from "lucide-react";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/products", label: "Our Products" },
  { href: "/formulations", label: "Formulations" },
  { href: "/export", label: "Export" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    // Added 'h-20' to reserve height to prevent layout shifts
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-100">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/logo.png"
            alt="Novitrail Pharmaceuticals"
            width={140}
            height={40}
            className="w-auto h-8 md:h-10" // Responsive logo sizing
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-novitrail-blue"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/contact"
            className="bg-novitrail-orange text-white px-8 py-3 rounded-md font-medium hover:opacity-90 transition-all"
          >
            Request Quote
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 -mr-2 text-gray-600 hover:text-novitrail-blue transition-colors focus:outline-none"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {/* We use specific logic here: absolute positioning to float over content, shadow for depth */}
      <div
        className={`md:hidden absolute left-0 right-0 top-16 bg-white border-b shadow-xl transition-all duration-300 ease-in-out origin-top ${
          open 
            ? "opacity-100 visible translate-y-0" 
            : "opacity-0 invisible -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex flex-col p-6 space-y-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="group flex items-center justify-between border-b border-gray-100 pb-3 text-base font-medium text-gray-700 hover:text-novitrail-blue transition-colors"
            >
              {link.label}
              {/* Subtle arrow icon that appears/moves on hover */}
              <ChevronRight 
                size={16} 
                className="text-gray-400 group-hover:text-novitrail-blue group-hover:translate-x-1 transition-all" 
              />
            </Link>
          ))}

          <div className="pt-4">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-center bg-novitrail-orange text-white px-8 py-3 rounded-md font-medium hover:opacity-90 transition-all"
            >
              Request Quote
            </Link>
            
            {/* Optional: Add contact info or secondary links below CTA */}
            <p className="mt-4 text-center text-xs text-gray-400 font-medium">
              Novitrail Pharmaceuticals &copy; {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}