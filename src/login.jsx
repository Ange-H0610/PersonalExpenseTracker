import '@fortawesome/fontawesome-free/css/all.min.css';
import "./App.css";


function LoginForm (){
    return (
        <>
      <div
        class="min-h-screen flex items-center w-full
       justify-center bg-gradient-to-r
       from-[#341c51] to-gray-800 via-[#471235]"
      >
        <article class=" fixed text-3xl mb-5 font-bold text-balance ml-[-450px] ">
  < h1 className=" mb-1.5 text-[#113257] ">MONEFY</h1>
  <h2 className=" text-balance text-[#ACACAC] ">Never lose track of your expenses !</h2>
  
</article>
        
        <div
          className=" fixed pt-[10px] mt-[30px] ml-[460px]
         bg-[#113257] w-[250px] h-[440px] rounded-[7px]
           text-white font-bold "
        >
          {" "}
          REGISTRATION
          <p className=" pt-[35px] text-balance font-light ">
            Chose to track and how you want to balance your expenses .
          </p>
          <p className=" font-light ">It starts by login </p>
          <div
            className=" fixed bg-[#E9ECEE] mt-[20px] w-[250px]
           h-[280px] rounded-2xl"
          >
            <form className="space-y-4">
            
              <div>
                <label className="block text-sm  font-medium mb-1"></label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-[200px] mt-2.5 text-black p-2 border
               rounded-lg focus:outline-none 
               focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label
                  className="block text-sm ml-0
             text-black font-medium mb-1"
                ></label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-[200px] mt-2.5 p-2 text-black border rounded-lg
               focus:outline-none focus:ring-2
                focus:ring-blue-400"
                />
              </div>
              
              <button
                type="submit"
                className="w-[150px] bg-[#1a384d] text-white py-3
             rounded-lg hover:bg-[#6E9FC1] transition"
              >
                LOG IN  
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
    )
}
export default  LoginForm;