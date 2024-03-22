import React from "react";

// menggunakan cara Class Component
// class Button extends React.Component {
//   render() {
//     return (
//       <button className="h-10 px-6 font-semibold rounded-md bg-slate-700 text-white" type="submit">
//           Buy now
//       </button>
//     );
//   }
// }

// function ButtonBlack() {
//   return (
//     <button className="h-10 px-6 font-semibold rounded-md bg-black text-white" type="submit">
//           Buy now
//       </button>
//   );
// }


// menggunakan cara Functional Component with Arrow Function
const Button = (props) => {
  // destructuring
  const {children, variant = "bg-black"} = props;
  return (
    <button className={`h-10 px-6 font-semibold rounded-md ${variant} text-white`} type="submit">
          {children}
      </button>
  );
}

function App() {

  return (
    <div className="flex justify-center bg-blue-600 min-h-screen items-center">
      <div className="flex gap-x-3">
        <Button variant="bg-red-700" text="Login">Login</Button>
        <Button variant="bg-slate-700" text="Logout">Logout</Button>
        <Button></Button>
        
      </div>
    </div>
  )
}

export default App
