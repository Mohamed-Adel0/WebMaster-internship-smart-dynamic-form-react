import { useFormik } from "formik";
import * as Yup from "yup";

const fields = [
  { name: "fullName", label: "Full Name", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "age", label: "Age", type: "number", required: true, min: 18 },
  { name: "phone", label: "Phone Number", type: "text", required: true },
  { name: "address", label: "Address", type: "text", required: true },
  { name: "city", label: "City", type: "text", required: true },
  { name: "zip", label: "ZIP Code", type: "text", required: true },
  { name: "country", label: "Country", type: "text", required: true },
  { name: "username", label: "Username", type: "text", required: true },
  { name: "password", label: "Password", type: "password", required: true },
  { name: "confirmPassword", label: "Confirm Password", type: "password", required: true },
  { name: "dob", label: "Date of Birth", type: "date", required: true },
  { name: "gender", label: "Gender", type: "text", required: true },
  { name: "bio", label: "Bio", type: "text", required: false },
  { name: "website", label: "Website", type: "url", required: false },
  { name: "linkedin", label: "LinkedIn", type: "url", required: false },
  { name: "github", label: "GitHub", type: "url", required: false },
  { name: "twitter", label: "Twitter", type: "url", required: false },
  { name: "skills", label: "Skills", type: "text", required: true },
  { name: "experience", label: "Experience (Years)", type: "number", required: true, min: 0 },
];
const validationSchema = Yup.object(
  fields.reduce((acc, field) => {
    let validator = Yup.string();

    if (field.type === "email") {
      validator = Yup.string().email("Invalid email format");
    } else if (field.type === "url") {
      validator = Yup.string().url("Invalid URL");
    } else if (field.type === "number") {
      validator = Yup.number().typeError("Must be a number");
      if (field.min !== undefined) {
        validator = validator.min(field.min, `Must be at least ${field.min}`);
      }
    } else if (field.type === "date") {
      validator = Yup.date().typeError("Invalid date");
    }

    if (field.required) {
      validator = validator.required(`${field.label} is required`);
    }

    acc[field.name] = validator;
    return acc;
  }, {})
);
const Form = () => {
  const formik = useFormik({
    initialValues: fields.reduce((acc, field) => {
      acc[field.name] = "";
      return acc;
    }, {}),
    validationSchema,
    onSubmit: (values) => {
      // console.log(values.fullName);
      alert(`Successfully registered, ${values.fullName}! Welcome aboard 🎉`);
    },
  });

  return (
   <>
   <div className="hero w-full h-auto border-2 flex flex-row justify-center items-start !py-10">
     <form onSubmit={formik.handleSubmit} className="max-w-3xl mx-auto p-4 sm:p-6 md:p-8 space-y-4 !m-auto w-[50%]  flex flex-col gap-4 !px-5 !py-5 border-2 border-amber-400 rounded-2xl">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">Dynamic User Information Form</h1>
      {fields.map((e) => (
        <div key={e.name} className="flex flex-col text-sm sm:text-base">
          <label htmlFor={e.name} className="mb-1 font-medium"> {e.label}</label>
          <input  type={e.type}  name={e.name}  id={e.name}  onChange={formik.handleChange}  onBlur={formik.handleBlur}  value={formik.values[e.name]}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"/>
          {formik.touched[e.name] && formik.errors[e.name] && (
            <span className="text-red-500 text-xs sm:text-sm mt-1">{formik.errors[e.name]}</span>
          )}
        </div>
      ))}
      <div className="btn w-full flex justify-center">
        <button type="submit" className="bg-blue-600 text-white rounded hover:bg-blue-700 sm:w-auto !py-2 !w-[50%] cursor-pointer">Submit</button>
      </div>
    </form>
   </div>
   </>
  );
};

export default Form;

