import { NotebookIcon, PlusIcon } from "lucide-react";
import { Link } from "react-router";

const NoteNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center p-16 space-y-6 max-w-md mx-auto text-center bg-primary/5 border border-secondary/30 rounded-lg shadow-md">
      <div className="bg-secondary/25 rounded-full p-8">
        <NotebookIcon className="size-10 text-primary "/>
      </div>
      <h3 className="text-2xl font-bold">No Notes Yet</h3>
      <p className="text-base-content/70">
        Ready to organize your thoughts? Create your first note to get started
        on your journey.
      </p>
      <Link to="/create" className="btn btn-accent btn-ghost btn-outline">
        <PlusIcon className="h-5 w-5" />
        <span>Create Your First Note</span>
      </Link>
    </div>
  );
};

export default NoteNotFound;
