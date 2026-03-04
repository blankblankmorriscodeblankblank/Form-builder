import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function SupabaseForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      isPublic: false,
    },
  });

  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: "", message: "" });

    try {
      // Simulate network request to Supabase
      console.log("Mock Supabase Submission:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setSubmitStatus({
        type: "success",
        message: "Project details submitted successfully to Supabase!",
      });
      reset(); // Clear all fields
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Failed to submit. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus({ type: "", message: "" });
      }, 5000);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
      <div className="bg-slate-900 px-8 py-6 text-white">
        <h2 className="text-2xl font-semibold tracking-tight">
          New Project Registration
        </h2>
        <p className="text-slate-400 mt-2 text-sm">
          Enter the deployment details for your Supabase project.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Field 1: Project Name (Text) */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 block">
              Project Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              data-testid="input-project-name"
              className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:outline-none transition-all duration-200 ${
                errors.projectName
                  ? "border-red-300 focus:ring-red-200 bg-red-50"
                  : "border-slate-200 focus:border-slate-900 focus:ring-slate-100 bg-slate-50 focus:bg-white"
              }`}
              placeholder="e.g. Nexus Dashboard"
              {...register("projectName", {
                required: "Project name is required",
                minLength: {
                  value: 5,
                  message: "Must be at least 5 characters long",
                },
              })}
            />
            {errors.projectName && (
              <p className="text-red-500 text-xs font-medium mt-1">
                {errors.projectName.message}
              </p>
            )}
          </div>

          {/* Field 2: Developer Email (Email) */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 block">
              Developer Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              data-testid="input-developer-email"
              className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:outline-none transition-all duration-200 ${
                errors.developerEmail
                  ? "border-red-300 focus:ring-red-200 bg-red-50"
                  : "border-slate-200 focus:border-slate-900 focus:ring-slate-100 bg-slate-50 focus:bg-white"
              }`}
              placeholder="dev@example.com"
              {...register("developerEmail", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address format",
                },
              })}
            />
            {errors.developerEmail && (
              <p className="text-red-500 text-xs font-medium mt-1">
                {errors.developerEmail.message}
              </p>
            )}
          </div>

          {/* Field 3: Priority Level (Select) */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 block">
              Priority Level
            </label>
            <div className="relative">
              <select
                data-testid="select-priority-level"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-100 focus:outline-none transition-all duration-200 bg-slate-50 focus:bg-white appearance-none"
                {...register("priorityLevel")}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Field 4: Deployment Date (Date) */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 block">
              Deployment Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              data-testid="input-deployment-date"
              className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:outline-none transition-all duration-200 ${
                errors.deploymentDate
                  ? "border-red-300 focus:ring-red-200 bg-red-50"
                  : "border-slate-200 focus:border-slate-900 focus:ring-slate-100 bg-slate-50 focus:bg-white"
              }`}
              {...register("deploymentDate", {
                required: "Deployment date is required",
              })}
            />
            {errors.deploymentDate && (
              <p className="text-red-500 text-xs font-medium mt-1">
                {errors.deploymentDate.message}
              </p>
            )}
          </div>

          {/* Field 5: Version Number (Number) */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 block">
              Version Number <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              step="0.1"
              data-testid="input-version-number"
              className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:outline-none transition-all duration-200 ${
                errors.versionNumber
                  ? "border-red-300 focus:ring-red-200 bg-red-50"
                  : "border-slate-200 focus:border-slate-900 focus:ring-slate-100 bg-slate-50 focus:bg-white"
              }`}
              placeholder="1.0"
              {...register("versionNumber", {
                required: "Version number is required",
                min: {
                  value: 0.1,
                  message: "Must be greater than 0",
                },
                valueAsNumber: true,
              })}
            />
            {errors.versionNumber && (
              <p className="text-red-500 text-xs font-medium mt-1">
                {errors.versionNumber.message}
              </p>
            )}
          </div>

          {/* Field 6: Repository URL (URL) */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 block">
              Repository URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              data-testid="input-repository-url"
              className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:outline-none transition-all duration-200 ${
                errors.repositoryUrl
                  ? "border-red-300 focus:ring-red-200 bg-red-50"
                  : "border-slate-200 focus:border-slate-900 focus:ring-slate-100 bg-slate-50 focus:bg-white"
              }`}
              placeholder="https://github.com/..."
              {...register("repositoryUrl", {
                required: "Repository URL is required",
                pattern: {
                  value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                  message: "Must be a valid URL",
                },
              })}
            />
            {errors.repositoryUrl && (
              <p className="text-red-500 text-xs font-medium mt-1">
                {errors.repositoryUrl.message}
              </p>
            )}
          </div>

          {/* Field 7: Team Lead (Text) */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 block">
              Team Lead <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              data-testid="input-team-lead"
              className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:outline-none transition-all duration-200 ${
                errors.teamLead
                  ? "border-red-300 focus:ring-red-200 bg-red-50"
                  : "border-slate-200 focus:border-slate-900 focus:ring-slate-100 bg-slate-50 focus:bg-white"
              }`}
              placeholder="Alice Smith"
              {...register("teamLead", {
                required: "Team Lead is required",
              })}
            />
            {errors.teamLead && (
              <p className="text-red-500 text-xs font-medium mt-1">
                {errors.teamLead.message}
              </p>
            )}
          </div>

          {/* Field 8: Budget Code (Password) */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 block">
              Budget Code
            </label>
            <input
              type="password"
              data-testid="input-budget-code"
              className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:outline-none transition-all duration-200 ${
                errors.budgetCode
                  ? "border-red-300 focus:ring-red-200 bg-red-50"
                  : "border-slate-200 focus:border-slate-900 focus:ring-slate-100 bg-slate-50 focus:bg-white"
              }`}
              placeholder="••••••••"
              {...register("budgetCode", {
                maxLength: {
                  value: 8,
                  message: "Maximum 8 characters allowed",
                },
              })}
            />
            {errors.budgetCode && (
              <p className="text-red-500 text-xs font-medium mt-1">
                {errors.budgetCode.message}
              </p>
            )}
          </div>

          {/* Field 9: Description (Textarea) */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-700 block">
              Project Description
            </label>
            <textarea
              data-testid="input-description"
              rows={3}
              className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all duration-200 resize-none ${
                errors.description
                  ? "border-red-300 focus:ring-red-200 bg-red-50"
                  : "border-slate-200 focus:border-slate-900 focus:ring-slate-100 bg-slate-50 focus:bg-white"
              }`}
              placeholder="Briefly describe the project..."
              {...register("description", {
                maxLength: {
                  value: 200,
                  message: "Maximum 200 characters allowed",
                },
              })}
            />
            {errors.description && (
              <p className="text-red-500 text-xs font-medium mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Field 10: Is Public (Checkbox) */}
          <div className="md:col-span-2 pt-2 pb-4">
            <label className="flex items-center cursor-pointer group">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  data-testid="checkbox-is-public"
                  className="peer sr-only"
                  {...register("isPublic")}
                />
                <div className="w-5 h-5 rounded border-2 border-slate-300 bg-white peer-checked:bg-slate-900 peer-checked:border-slate-900 transition-colors flex items-center justify-center">
                  <svg
                    className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <span className="ml-3 text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                Make repository public upon deployment
              </span>
            </label>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
          <div className="flex-1 mr-4">
            {submitStatus.message && (
              <div
                className={`text-sm px-4 py-3 rounded-lg ${
                  submitStatus.type === "success"
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                } animate-in fade-in slide-in-from-bottom-2 duration-300`}
              >
                {submitStatus.message}
              </div>
            )}
          </div>
          <button
            type="submit"
            data-testid="button-submit-form"
            disabled={isSubmitting}
            className="px-6 py-3 rounded-lg bg-slate-900 text-white font-medium text-sm hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 flex items-center shadow-sm"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving to Supabase...
              </>
            ) : (
              "Save Project"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
