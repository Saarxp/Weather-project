import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { UserType } from "../../types/user/UserType";
import { patchDataUser } from "../../utils/fetchAPI/FetchApi";
import { UserContext } from "../../context/userContext";
import { Link } from "react-router-dom";

function ProfilePage() {
  const token = sessionStorage.getItem("token");
  const userDetails = useContext<UserType | undefined>(UserContext);
  const [userNewDetails, setUserNewDetails] = useState<UserType | undefined>(
    undefined
  );

  useEffect(() => {
    setUserNewDetails(userDetails);
  }, [userDetails]);

  function inputHandler(
    event: ChangeEvent<HTMLInputElement>,
    propertyName: keyof UserType
  ) {
    const value = event.target.value;
    if (userNewDetails) {
      return setUserNewDetails({ ...userNewDetails, [propertyName]: value });
    }
    throw new Error("User Details not found");
  }

  async function updateUserDetails(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (userNewDetails) {
      return patchDataUser(
        "http://localhost:3000/users/update",
        userNewDetails,
        token
      );
    }
    throw new Error("User Details not found to update");
  }

  async function deleteUserButton() {
    try {
      const response = await fetch("http://localhost:3000/users/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      const { result } = await response.json();

      if (response.ok) {
        console.log("User deleted succeffuly");
        alert("User deleted succeffuly")
        sessionStorage.removeItem("token")
        window.location.href = "/"

      } else {
        console.log(result.error);
        alert(result.error);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }

  return (
    <>
      {token ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-3xl font-bold mb-4 flex justify-center">
            Settings
          </h1>
          <p className="text-lg font-bold flex justify-center">
            Update Your User
          </p>

          <form onSubmit={updateUserDetails}>
            <div className="space-y-12 grid justify-center pt-12">
              <div className="border-t border-gray-900/10">
                <div className="mt-10 grid gap-x-4 gap-y-4 ">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      First Name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        autoComplete="given-name"
                        onChange={(ev) => inputHandler(ev, "firstName")}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Last Name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        onChange={(ev) => inputHandler(ev, "lastName")}
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
                      Email Address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        onChange={(ev) => inputHandler(ev, "email")}
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
                        type="text"
                        name="password"
                        id="password"
                        onChange={(ev) => inputHandler(ev, "password")}
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
                        type="text"
                        name="confirmPassword"
                        id="confirmPassword"
                        autoComplete="address-level1"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
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
                >
                  Update User
                </button>
                <button
                  onClick={deleteUserButton}
                  type="button"
                  className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                  Delete User
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        (window.location.href = "/")
      )}
    </>
  );
}

export default ProfilePage;
