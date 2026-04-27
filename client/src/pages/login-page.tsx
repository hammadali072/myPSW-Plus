
import { Link } from 'react-router-dom';
import { HiMail, HiLockClosed, HiArrowRight } from 'react-icons/hi';
import logoLight from '../assets/logo-light.png';

const Login = () => {
  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Circles */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-accent/10 rounded-full blur-3xl" />

      {/* Logo */}
      <div className="mb-10">
        <Link to="/">
          <img src={logoLight} alt="myPSW+ logo" className="h-12 md:h-14 hover:scale-105 duration-300" />
        </Link>
      </div>

      {/* Card */}
      <div className="w-full max-w-2xl bg-white rounded-[2.5rem] p-10 md:p-14 shadow-2xl z-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Sign In to Your Account</h1>
          <p className="text-gray-400 font-medium">Log in to manage care updates</p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-900 ml-1">Email Address</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/60 group-focus-within:text-primary duration-300">
                <HiMail size={22} />
              </div>
              <input
                type="email"
                placeholder="name@company.com"
                className="w-full bg-surface py-5 pl-14 pr-6 rounded-2xl outline-none border-2 border-transparent focus:border-primary/20 focus:bg-white duration-300 text-gray-900 placeholder:text-gray-300 font-medium shadow-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-900 ml-1">Password</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/60 group-focus-within:text-primary duration-300">
                <HiLockClosed size={22} />
              </div>
              <input
                type="password"
                placeholder="*******"
                className="w-full bg-surface py-5 pl-14 pr-6 rounded-2xl outline-none border-2 border-transparent focus:border-primary/20 focus:bg-white duration-300 text-gray-900 placeholder:text-gray-300 font-medium shadow-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-5 bg-gradient-primary text-white font-bold text-xl rounded-2xl shadow-lg hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] duration-300 mt-4"
          >
            Sign In
          </button>
        </form>

        <div className="mt-12 text-center">
          <p className="text-gray-500 font-medium mb-6">Don't have an Account ?</p>
          <Link
            to="/signup"
            className="group w-full flex items-center justify-center gap-3 py-5 px-6 rounded-2xl border-2 border-primary/40 text-primary font-bold text-xl hover:bg-primary/5 duration-300"
          >
            Create Account
            <HiArrowRight className="group-hover:translate-x-1 duration-300" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
