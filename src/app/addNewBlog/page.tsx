"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import * as Yup from "yup";
import CheckboxGroup from "@/components/formComponents/CheckboxGroup";
import Input from "@/components/formComponents/TextInput";
import TextArea from "@/components/formComponents/TextArea";
import Checkbox from "@/components/formComponents/Checkbox";
import ImageUploader from "@/components/formComponents/ImageUploader";

export type employeeFormDataType = {
  title: string;
  description: string;
  category: string[];
  active: boolean;
  image: string;
};

const initialError = {
  title: "",
  description: "",
  category: "",
  active: "",
  image: "",
};
const initialValue = {
  title: "",
  description: "",
  category: [],
  active: true,
  image: "",
};
const postBlogs = async (body: FormData) => {
  
  try {
    const res = await fetch("/api/blogs", {
      cache: "no-store",
      method : "POST",
      body : body
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};

const AddEmployee: React.FC = () => {
  const [formData, setFormData] = useState<employeeFormDataType>(initialValue);
  const [errors, setErrors] = useState(initialError);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    category: Yup.array()
      .min(1, "Select atleast one category")
      .of(Yup.string())
      .required("Category is required"),
    active: Yup.boolean(),
    image: Yup.string().required("Image is required"),
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (
      type === "checkbox" &&
      name === "category" &&
      e.target instanceof HTMLInputElement
    ) {
      // Check if the event target is an HTMLInputElement
      const checked = e.target.checked;
      setFormData((prevData) => {
        return {
          ...prevData,
          [name]: checked
            ? [...(prevData?.category ?? []), value]
            : prevData?.category?.filter((item: string) => item !== value),
        };
      });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleBlur = async (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    validationSchema
      .validateAt(name, {
        [name]:
          type === "checkbox" && name === "category"
            ? formData.category
            : type === "checkbox" && e.target instanceof HTMLInputElement
            ? e.target.checked
            : value,
      })
      .then(() => {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      })
      .catch((error) => {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error.message }));
      });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      var form_data = new FormData();
      form_data.append('title', formData.title);
      form_data.append('description', formData.description); 
      form_data.append("category", JSON.stringify(formData.category));
      form_data.append("active", `${formData.active}` );
      form_data.append("image", formData.image);
      
      postBlogs(form_data);

      setErrors({ ...initialError });
      setFormData(initialValue);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        // Handle validation errors
        const newErrors: Record<string, string> = {};
        error.inner.forEach((validationError: Yup.ValidationError) => {
          newErrors[validationError?.path ?? ""] = validationError.message;
        });

        setErrors({ ...initialError, ...newErrors });
      }
    }
  };

  return (
    <div className="flex justify-center m-6">
      <div className="w-[70%]">
        <form onSubmit={handleSubmit}>
          <div className=" gap-5">
            <div className="w-[75%]">
              <Input
                label={"Title"}
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.title}
                required
              />
            </div>

            <TextArea
              label={"Description"}
              name="description"
              type="text"
              value={formData.description}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.description}
              required
            />

            <CheckboxGroup
              label={"Category"}
              name="category"
              selectedValues={formData.category}
              options={[
                { label: "Socity", value: "Socity" },
                { label: "Politics", value: "Politics" },
              ]}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.category}
              required
            />
          </div>
          <Checkbox
            name="active"
            value={formData.active}
            onChange={({ target: { name, checked } }) => 
              setFormData((prevData) => ({
                ...prevData,
                [name]: checked,
              }))
            }
            onBlur={handleBlur}
            error={errors.active}
            required
          >
            Active
          </Checkbox>
          <ImageUploader
            label={"Image Uploader"}
            name={"image"}
            value={formData.image}
            onChange={({ target: { name, files } }) => 
            setFormData((prevData) => ({
              ...prevData,
              [name]: files?.[0],
            }))
          }
            // onBlur={handleBlur}
            error={errors.image}
          />
          <div className="flex justify-end">
            <button
              className="h-auto p-1 px-4 bg-red-500 text-white rounded hover:bg-red-600 mr-2"
              type="reset"
              onClick={() => {
                setFormData(initialValue);
                setErrors(initialError);
              }}
            >
              Clear
            </button>
            <button
              className="h-auto p-1 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
