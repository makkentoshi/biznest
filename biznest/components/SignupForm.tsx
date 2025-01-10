// components/SignupForm.tsx
import Link from "next/link";


interface SignUpFormProps {
  signUpWithEmail: ({emailAddress, password }:{emailAddress: string, password: string}) => void
  clerkError: string
}

const SignupForm = ({signUpWithEmail, clerkError}: SignUpFormProps) => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
        <div className="flex justify-center mb-4">
          <h1 className="text-2xl font-bold">Sign Up</h1>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const target = e.target as typeof e.target & {
              email: {value: string};
              password: {value: string};
            };
            const email = target.email.value;
            const password = target.password.value;
            signUpWithEmail({emailAddress: email, password: password});
          }}
        >
          <input
            name="email"
            className="block w-full pb-4 pl-4 mb-3 text-sm font-light bg-transparent border-0 border-b-2 h-37 border-slate-600 text-black caret-slate-700 focus:border-black"
            placeholder="Email address"
            type="email"
            required
          />
          <input
            name="password"
            className="block w-full pb-4 pl-4 mb-3 text-sm font-light bg-transparent border-0 border-b-2 h-37 border-slate-600 text-black caret-slate-700 focus:border-black"
            placeholder="Password"
            type="password"
            required
          />
          <h2 className="text-red mb-8">
            {clerkError && <p>{clerkError}</p>}
          </h2>
          <button
            className="w-full h-12 mb-6 text-sm font-light text-white hover:text-blue-900 hover:bg-white bg-black rounded-md"
            type="submit"
          >
            Create an account
          </button>
        </form>
        <div className="flex justify-center mb-4">
   
        </div>
        <p className="text-sm font-light text-center text-black">
          Already have an account?
          <Link className="ml-2 text-blue-600" href="/sign-in">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;