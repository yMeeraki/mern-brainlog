import React from "react";
import CreatePage from "../pages/CreatePage.jsx";
import { PlusIcon } from "lucide-react";
import {Link} from "react-router";

const Navbar = () => {
  return (
    <header className="bg-base-200 border-b border-b-secondary">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-mono font-semibold text-primary  tracking-widest">BrainLog</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/create" className="btn btn-accent btn-ghost btn-outline" >
                <PlusIcon className="h-5 w-5"/>
                <span>New Note</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
