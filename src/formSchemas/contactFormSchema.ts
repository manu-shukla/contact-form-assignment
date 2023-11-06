import * as Yup from "yup";

const digitsOnly = (value: string | undefined) =>
    /^\d+$/.test(value!) || value!.length === 0;

const contactFormSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email().required("Email is required"),
    phone: Yup.string()
        .required('Phone No. is required')
        .test('phone', 'Enter a valid Phone No', digitsOnly).length(10, "Enter a valid Phone No"),
    message: Yup.string().required("Message is required").min(10, "Message should be atleast 10 characters long")
});

export default contactFormSchema;
