import { Fragment } from "react";
import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";

import { Container } from "@/components/Container";
import { Logo } from "@/components/Logo";
import { NavLink } from "@/components/NavLink";

function MobileNavLink({ href, children }) {
  return (
    <Popover.Button as={Link} href={href} className="block w-full p-2">
      {children}
    </Popover.Button>
  );
}

function MobileNavigation() {
  return (
    <Popover>

      <Transition.Root>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Popover.Overlay className="fixed inset-0 bg-slate-300/50" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            as="div"
            className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5"
          >

            <hr className="m-2 border-slate-300/40" />
            <MobileNavLink href="/login">Sign in</MobileNavLink>
          </Popover.Panel>
        </Transition.Child>
      </Transition.Root>
    </Popover>
  );
}

export function Header() {
  return (
    <header className="py-10">
      <Container>
        <nav className="relative z-50 flex justify-between">
          <div className="flex w-full items-center justify-between md:gap-x-12">
            <div className="-mr-1 md:hidden">
              <MobileNavigation />
            </div>
            <Link href="#" aria-label="Home">
              <Logo className="h-10 w-auto" />
              
            </Link>
            <strong>
            FamilyHub
            </strong>
            <div className="flex justify-between items-center">
              <div className="mr-2 ">
              </div>
              <div className="w-20 hidden md:block items-center">
                <NavLink href="/login">Sign in</NavLink>
              </div>
            </div>

          </div>
        </nav>
      </Container>
    </header>
  );
}
