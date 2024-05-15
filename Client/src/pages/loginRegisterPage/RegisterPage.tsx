import { UserCircleIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";

function RegisterPage() {
  const [registerObj, setRegisterObj] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: "",
  });

  const token = sessionStorage.getItem("token");

  async function newRegister(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const newUser = { ...registerObj };
    if (newUser.password !== newUser.confirmPassword) {
      alert("Passwords doesn't match")
    }
    else {
      try {
        const response = await fetch("http://localhost:3000/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });
        if (!response.ok) {
          const errorResponse = await response.json();
          console.log(errorResponse);
          alert(errorResponse.error)
        }
        else {
          alert(`Registered Succefully With Email: ${newUser.email}`)
          window.location.href = '/';
        }
      } catch (error) {
        console.error("Error:", error instanceof Error ? error.message : error);
      }
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    const name = target.name;
    setRegisterObj({ ...registerObj, [name]: target.value })
  }

  return (
    <>
      {token ? window.location.href = "/" :
        <form>
          <div className="space-y-12 grid justify-center pt-12">
            <div className="border-t border-gray-900/10">
              <div className="mt-10 grid gap-x-4 gap-y-4 ">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    First name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      autoComplete="given-name"
                      value={registerObj.firstName}
                      onChange={(event) => handleChange(event)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Last name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      value={registerObj.lastName}
                      onChange={(event) => handleChange(event)}
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={registerObj.email}
                      onChange={(event) => handleChange(event)}
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={registerObj.password}
                      onChange={(event) => handleChange(event)}
                      autoComplete="address-level2"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Confirm Password
                  </label>
                  <div className="mt-2">
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      value={registerObj.confirmPassword}
                      onChange={(event) => handleChange(event)}
                      autoComplete="address-level1"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="border-b border-gray-900/10 pb-6">
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="photo"
                    className="block text-lg font-medium leading-6 text-gray-900 text-center"
                  >
                    Photo
                  </label>
                  <div className="mt-2 flex items-center justify-center gap-x-3">
                    <UserCircleIcon
                      className="h-12 w-12 text-gray-300"
                      aria-hidden="true"
                      name="profileImage"
                      id="profileImage"
                    />
                    <button
                      type="button"
                      className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      Change
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-around">
              <Link
                to={"/"}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={(event) => newRegister(event)}
              >
                Register
              </button>
            </div>
            <p className="mt-10 text-center text-sm text-gray-500">
              Already a member?{' '}
              <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Log In!
              </a>
            </p>
          </div>

        </form>}

    </>
  );
}
export default RegisterPage;
