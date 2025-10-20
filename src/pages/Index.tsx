import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import EmployeeTable, { Employee } from "@/components/EmployeeTable";
import EmployeeForm from "@/components/EmployeeForm";
import { toast } from "sonner";
import { addEmployee, deleteEmployee, getEmployees, updateEmployee } from "@/api/employeeApi";
import axios from "axios";
const Index = () => {
  // State for managing employees list
   
  const [employees, setEmployees] = useState<Employee[]>([]);
  

  // State for managing form dialog
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);


  const loadEmployees = async()=>{
    try{
      const data=await getEmployees();
      setEmployees(data);
    } catch (err){
      console.error("Error loading employees", err);
      toast.error("Failed to fetch employees, check console for errors.");
    }
  };

  useEffect(()=>{

    loadEmployees();
  },[])
  

  
  

  const handleAddClick = () => {
    setEditingEmployee(null);
    setIsFormOpen(true);
  };

  // Handle opening form for editing existing employee
  const handleEdit = (employee: Employee) => {
    loadEmployees()
    setIsFormOpen(true);
  };

  
  

  // Handle deleting an employee
  const handleDelete = async (id: number) => {

      await deleteEmployee(id);

      await loadEmployees();
      
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Employee Management</h1>
          <p className="text-muted-foreground">
            Manage your team members and their information
          </p>
        </div>

        {/* Action buttons */}
        <div className="mb-6 flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Total Employees: <span className="font-semibold text-foreground">{employees.length}</span>
          </div>
          <Button onClick={handleAddClick}>
            <Plus className="mr-2 h-4 w-4" />
            Add Employee
          </Button>
        </div>

        {/* Employee table */}
        <EmployeeTable
          employees={employees}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Employee form dialog */}
        <EmployeeForm
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          onSubmit={loadEmployees}
          employee={editingEmployee}
        />
      </div>
    </div>
  );
};

export default Index;
