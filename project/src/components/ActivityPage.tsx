import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { TaskForm } from "./TaskForm";
import { TaskList } from "./TaskList";
import { Dashboard } from "./Dashboard";
import { ListTodo, PlusCircle } from "lucide-react";
import Footer from "./Footer";

export const ActivityPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="backdrop-blur-lg bg-white/5 border-b border-white/10 py-4 px-6">
        <h1 className="text-2xl font-semibold">Activity</h1>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="tasks" className="space-y-8">
          <TabsList className="bg-white/5">
            <TabsTrigger
              value="tasks"
              className="text-white data-[state=active]:bg-white/10"
            >
              <ListTodo className="w-4 h-4 mr-2" />
              Tasks
            </TabsTrigger>
            <TabsTrigger
              value="new"
              className="text-white data-[state=active]:bg-white/10"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              New Task
            </TabsTrigger>
            
          </TabsList>

          <TabsContent value="tasks">
            <TaskList />
          </TabsContent>

          <TabsContent value="new">
            <div className="max-w-2xl mx-auto backdrop-blur-lg bg-white/5 p-8 rounded-xl">
              <TaskForm />
            </div>
          </TabsContent>

          <TabsContent value="dashboard">
            <Dashboard />
          </TabsContent>
        </Tabs>
      </main>
      <Footer/>
    </div>
  );
};
