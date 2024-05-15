import { Disclosure } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function NavbarLo() {

  const navigationItems = [{ name: "Home", href: "/", current: true }];

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  const location = useLocation();
  const [navigation, setNavigation] = useState(navigationItems);

  useEffect(() => {
    setNavigation((prevNavigation) =>
      prevNavigation.map((item) => ({
        ...item,
        current: location.pathname === item.href,
      }))
    );
  }, [location.pathname]);

  return (
    <Disclosure as="nav" className="bg-gray-800 fixed top-0 w-full z-10">
        <>
          <div className="mx-auto max-w-8xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
    </Disclosure>
  );
}

export default NavbarLo;
