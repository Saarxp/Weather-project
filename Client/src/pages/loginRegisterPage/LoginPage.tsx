import { FormEvent, useState, ChangeEvent } from "react";

function LoginPage() {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: ""
  })

  const token = sessionStorage.getItem("token");

  async function handleLoginSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const credentials = { email: loginDetails.email, password: loginDetails.password };

    try {
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const loginResponse = await response.json()
        alert(loginResponse.error)
        return
      }
      const { token } = await response.json();

      sessionStorage.setItem("token", token);
      window.location.href = '/weather'
    }
    catch (err) {
      console.error(err)
      alert(err)
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    const name = target.name;
    setLoginDetails({ ...loginDetails, [name]: target.value })
  }

  return (
    <>
      {token ? window.location.href = "/" :
        <div className="flex flex-col justify-center h-4/5">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6"
              onSubmit={(event) => handleLoginSubmit(event)}
            >
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(event) => handleChange(event)}
                    value={loginDetails.email}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                    Password
                  </label>
                  <div className="text-sm">
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(event) => handleChange(event)}
                    value={loginDetails.password}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-white">
              Not a member?{' '}
              <a href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Register now for free!
              </a>
            </p>
          </div>
        </div>}

    </>
  )
}

export default LoginPage