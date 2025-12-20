"use client";

import { useState } from "react";
import Link from "next/link";
import { PageHeaderWithBackButton } from "@/components/ui/PageHeader";
import { Input, Select, FileUpload } from "@/components/ui/Inputs";
import { isValidText } from "@/utils/validation";

const GROUP_TYPES = [
  "Study Group",
  "Course Discussion", 
  "Project Team",
  "Club/Community",
  "Other"
];

const TOPIC_OPTIONS = [
  "Mathematics",
  "Programming", 
  "Physics",
  "AI & ML",
  "Language Learning",
  "Soft Skills"
];

export default function CreateGroupPage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "",
    topics: [] as string[],
    customTopic: "",
    status: "public",
    imageUrl: ""      // image path of supabase storage
  });
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    type: ""
  });
  
  const [showCustomTopic, setShowCustomTopic] = useState(false);

  // Validate individual field
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "name":
        if (!isValidText(value, 3, 100, true)) {
          return "Group name must be at least 3 characters";
        }
        return "";
      case "description":
        if (!isValidText(value, 10, 500, true)) {
          return "Description must be at least 10 characters";
        }
        return "";
      case "type":
        if (!value.trim()) {
          return "Please select a group type";
        }
        return "";
      default:
        return "";
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors] !== undefined) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  // Validate on blur
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (errors[name as keyof typeof errors] !== undefined) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleTopicToggle = (topic: string) => {
    setFormData(prev => ({
      ...prev,
      topics: prev.topics.includes(topic)
        ? prev.topics.filter(t => t !== topic)
        : [...prev.topics, topic]
    }));
  };

  const handleAddCustomTopic = () => {
    if (formData.customTopic.trim() && !formData.topics.includes(formData.customTopic.trim())) {
      setFormData(prev => ({
        ...prev,
        topics: [...prev.topics, prev.customTopic.trim()],
        customTopic: ""
      }));
      setShowCustomTopic(false);
    }
  };

  const handleRemoveTopic = (topicToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      topics: prev.topics.filter(topic => topic !== topicToRemove)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all required fields
    const nameError = validateField("name", formData.name);
    const descriptionError = validateField("description", formData.description);
    const typeError = validateField("type", formData.type);

    setErrors({
      name: nameError,
      description: descriptionError,
      type: typeError
    });

    if (nameError || descriptionError || typeError) {
      return;
    }

    // TODO: Upload image first if file exists, get URL, then submit form with imageUrl
    console.log("Creating group with data:", {
      ...formData,
      imageUrl: formData.imageUrl || "" // Will be populated after image upload
    });
    console.log("Image file to upload:", file);
    // TODO: Implement actual group creation logic
  };

  return (
    <div className="min-h-screen bg-white p-6 pt-20 lg:pt-6">
      <div className="mx-auto max-w-4xl">
        <PageHeaderWithBackButton title="Create New Group" subtitle="Set up a new study group to collaborate with others" />

        {/* Image Upload Section (Outside Form - Upload First) */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-2">Group Image (Optional)</h2>
          <p className="text-sm text-slate-600 mb-6">
            Upload an image first to get the URL, then fill out the form below
          </p>
          <FileUpload
            label="Upload Group Image"
            name="groupImage"
            value={file}
            onChange={(uploadedFile) => {
              setFile(uploadedFile);
              // TODO: When backend is ready, upload the file here and set formData.imageUrl
              if (uploadedFile) {
                console.log("Image selected:", uploadedFile.name);
                // After upload completes, set: setFormData(prev => ({...prev, imageUrl: "generated-url"}))
              }
            }}
            placeholder="Click to upload or drag and drop"
            title="SVG, PNG, JPG or GIF (MAX. 800x400px)"
            accept=".svg,.png,.jpg,.jpeg,.gif"
            maxSize={5 * 1024 * 1024} // 5MB
            maxDimensions={{ width: 800, height: 400 }}
            required={false}
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">Basic Information</h2>
            
            <div className="space-y-6">
              {/* Group Name */}
              <Input
                label="Group Name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                error={errors.name}
                placeholder="Enter your group name..."
                title="Group name (minimum 3 characters)"
                required
              />

              {/* Description */}
              <div>
                <Input
                  label="Description"
                  name="description"
                  type="textarea"
                  value={formData.description}
                  onChange={handleInputChange}
                  error={errors.description}
                  placeholder="Describe what this group is about, its goals, and what members can expect..."
                  title="Group description (minimum 10 characters)"
                  required
                  rows={4}
                />
                <p className="text-xs text-slate-500 mt-1">
                  {formData.description.length}/500 characters
                </p>
              </div>

              {/* Group Type */}
              <Select
                label="Group Type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                options={GROUP_TYPES.map(type => ({ value: type, label: type }))}
                error={errors.type}
                placeholder="Select a group type..."
                required
              />
            </div>
          </div>

          {/* Topics Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">Topics & Tags</h2>
            
            {/* Topic Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Select Topics (choose all that apply)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {TOPIC_OPTIONS.map((topic) => (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => handleTopicToggle(topic)}
                    className={`p-3 text-sm font-medium rounded-lg border-2 transition-all ${
                      formData.topics.includes(topic)
                        ? "border-slate-700 bg-slate-100 text-slate-900"
                        : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Topic Input */}
            <div className="mb-4">
              {!showCustomTopic ? (
                <button
                  type="button"
                  onClick={() => setShowCustomTopic(true)}
                  className="text-sm text-slate-700 hover:text-slate-900 font-medium flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add custom topic
                </button>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.customTopic}
                    onChange={(e) => setFormData(prev => ({...prev, customTopic: e.target.value}))}
                    className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-slate-400 outline-none"
                    placeholder="Enter custom topic..."
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCustomTopic())}
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomTopic}
                    className="hidden sm:block px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowCustomTopic(false);
                      setFormData(prev => ({...prev, customTopic: ""}));
                    }}
                    className="px-4 py-2 bg-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            {/* Selected Topics Display */}
            {formData.topics.length > 0 && (
              <div>
                <p className="text-sm font-medium text-slate-700 mb-3">Selected Topics:</p>
                <div className="flex flex-wrap gap-2">
                  {formData.topics.map((topic) => (
                    <span
                      key={topic}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-800 text-sm font-medium rounded-full"
                    >
                      {topic}
                      <button
                        type="button"
                        onClick={() => handleRemoveTopic(topic)}
                        className="ml-1 hover:text-slate-600"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Settings Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">Group Settings</h2>
            
            <div className="space-y-6">
              {/* Privacy Setting */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Privacy Setting
                </label>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="public"
                      checked={formData.status === "public"}
                      onChange={handleInputChange}
                      className="text-slate-600 focus:ring-slate-500"
                    />
                    <div>
                      <div className="font-medium text-slate-900">Public</div>
                      <div className="text-sm text-slate-600">Anyone can find and join this group</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="private"
                      checked={formData.status === "private"}
                      onChange={handleInputChange}
                      className="text-slate-600 focus:ring-slate-500"
                    />
                    <div>
                      <div className="font-medium text-slate-900">Private</div>
                      <div className="text-sm text-slate-600">Only invited members can join</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-4 sm:justify-end">
            <Link
              href="/groups"
              className="w-full sm:w-auto px-6 py-3 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors text-center"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors shadow-lg"
            >
              Create Group
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
