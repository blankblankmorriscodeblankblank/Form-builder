import React from "react";
import SupabaseForm from "./components/SupabaseForm";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 md:p-12 flex items-center justify-center font-sans">
      <div className="w-full max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Project Portal</h1>
          <p className="text-slate-500 mt-2">Manage your Supabase connected applications</p>
        </div>
        
        <SupabaseForm />
      </div>
      <Toaster />
    </div>
  );
}

export default App;
