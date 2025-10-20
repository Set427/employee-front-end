import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Employee } from "./EmployeeTable";
import { addEmployee, updateEmployee } from "@/api/employeeApi";
import { toast } from "sonner";
import { AArrowUp } from "lucide-react";

interface EmployeeFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Omit<Employee, "id">) => void;
  employee?: Employee | null;
}

// Form data type (without id)
type FormData = Omit<Employee, "id">;

const EmployeeForm = ({ open, onOpenChange, onSubmit, employee }: EmployeeFormProps) => {
  // Initialize form with react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  // Reset form when dialog opens/closes or employee changes
  useEffect(() => {
    if (open && employee) {
      // If editing, populate form with existing data
      reset({
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        jobTitle: employee.jobTitle,
        phone: employee.phone,
        employeeCode: employee.employeeCode,
        salary: employee.salary,
      });
    } else if (open) {
      // If adding new, reset to empty form
      reset({
        firstName: "",
        lastName: "",
        email: "",
        jobTitle: "",
        phone: "",
        employeeCode: "",
        salary: 0,
      });
    }
  }, [open, employee, reset]);

  // Handle form submission
  const handleFormSubmit = async (data: FormData) => {
    try{
      if(employee){
        await updateEmployee(Number(employee.id),data);
        toast.success("Employee has been update");
      }else{
        await addEmployee(data);
        toast.success("Employee added successfully");''
      }
      await onSubmit(data);
      onOpenChange(false);
    }catch (err){
      toast.error("Failed to save employee");
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{employee ? "Edit Employee" : "Add New Employee"}</DialogTitle>
          <DialogDescription>
            {employee
              ? "Update the employee information below."
              : "Fill in the employee information below."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              {/* First Name */}
              <div className="grid gap-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  {...register("firstName", { required: "First name is required" })}
                  placeholder="John"
                />
                {errors.firstName && (
                  <span className="text-sm text-destructive">{errors.firstName.message}</span>
                )}
              </div>

              {/* Last Name */}
              <div className="grid gap-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  {...register("lastName", { required: "Last name is required" })}
                  placeholder="Doe"
                />
                {errors.lastName && (
                  <span className="text-sm text-destructive">{errors.lastName.message}</span>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                placeholder="john.doe@company.com"
              />
              {errors.email && (
                <span className="text-sm text-destructive">{errors.email.message}</span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Job Title */}
              <div className="grid gap-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input
                  id="jobTitle"
                  {...register("jobTitle", { required: "Job title is required" })}
                  placeholder="Software Engineer"
                />
                {errors.jobTitle && (
                  <span className="text-sm text-destructive">{errors.jobTitle.message}</span>
                )}
              </div>

              {/* Phone */}
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  {...register("phone", { required: "Phone is required" })}
                  placeholder="+1 (555) 000-0000"
                />
                {errors.phone && (
                  <span className="text-sm text-destructive">{errors.phone.message}</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Employee Code */}
              <div className="grid gap-2">
                <Label htmlFor="employeeCode">Employee Code</Label>
                <Input
                  id="employeeCode"
                  {...register("employeeCode", { required: "Employee code is required" })}
                  placeholder="EMP001"
                />
                {errors.employeeCode && (
                  <span className="text-sm text-destructive">{errors.employeeCode.message}</span>
                )}
              </div>

              {/* Salary */}
              <div className="grid gap-2">
                <Label htmlFor="salary">Salary</Label>
                <Input
                  id="salary"
                  type="number"
                  {...register("salary", {
                    required: "Salary is required",
                    min: { value: 0, message: "Salary must be positive" },
                  })}
                  placeholder="50000"
                />
                {errors.salary && (
                  <span className="text-sm text-destructive">{errors.salary.message}</span>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{employee ? "Update Employee" : "Add Employee"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeForm;
