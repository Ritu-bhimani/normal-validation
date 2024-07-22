import { FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

function Validation(props) {
    const [state, setState] = React.useState({
        traveling: true,
        playing:true,
        cooking: false,
        dance: false,
        reading: false,
    });

    const handleCheckChange = (event) => {
        const newState = {
            ...state,
            [event.target.name]: event.target.checked,
        };
        setState(newState);

        const selectedHobbies = Object.keys(newState).filter(key => newState[key]);
        formik.setFieldValue('checkboxes', selectedHobbies);
    };

    const { traveling,playing, cooking, dance, reading } = state;

    const validationSchema = Yup.object().shape({
        firstname: Yup.string().required("Enter firstname").matches(/^[A-Za-z ]*$/, 'Please enter valid name'),
        lastname: Yup.string().required("Enter lastname").matches(/^[A-Za-z ]*$/, 'Please enter valid name'),
        image: Yup.mixed()
            .test("file-size", "file select must be 2 mb lessthan", (value) => value?.size <= 1024 * 1024 * 2)
            .test(
                "fileFormat",
                "Unsupported Format",
                (value) => {
                    const array = ["image/jpg", "image/jpeg", "image/png", "image/avif", "application/pdf"]
                    if (array.includes(value?.type)) {
                        return true
                    } else {
                        return false
                    }
                }
            ),
        message:
            Yup.string().required("message is required")
                .test(
                    "space", "space not allow", (value) => !value.trim().includes('  ')
                )
                .test(
                    "word", "max 5 word", (value) => {
                        let check = value.split(" ");
                        if (check.length <= 5) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                ),
        checkboxes: Yup.array()
            .min(3, 'Please select at least 3 hobbies.'),
        contact: Yup.string()
            .required('contact number is required').matches(/^\d{10}$/, "please enter 10 digit number"),
            number: Yup.string(),
        password: Yup.string()
            .required('password is required'),
        gender: Yup.string()
            .required('Gender is required'),
        age: Yup.date()
            .max(new Date(new Date().setFullYear(new Date().getFullYear() - 18)), 'You must be at least 18 years old.')
            .required('Age is required'),
    });

    const formik = useFormik({
        initialValues: {
            checkboxes: [],
            gender: '',
            age: '',
            image: "",
            number: "",
            message: "",
            firstname: "",
            lastname: "",
            contact: "",
            password: ""
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            console.log(values);
            resetForm();
        },
    });

    const { errors, handleSubmit, handleChange, values, setFieldValue, touched } = formik;

    return (
        <div style={{ margin: "0 auto", padding: "50px 200px" }}>
            <form onSubmit={handleSubmit}>


                <Box sx={{ m: 3 }}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Firstname</FormLabel>
                        <TextField
                            id="standard-basic"
                            variant="standard"
                            type="text"
                            name="firstname"
                            value={values.firstname}
                            onChange={handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {errors.firstname && (
                            <div style={{ color: 'red', marginTop: '8px' }}>{errors.firstname}</div>
                        )}
                    </FormControl>
                </Box>
                <Box sx={{ m: 3 }}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Lastname</FormLabel>
                        <TextField
                            id="standard-basic"
                            variant="standard"
                            type="text"
                            name="lastname"
                            value={values.lastname}
                            onChange={handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {errors.lastname && (
                            <div style={{ color: 'red', marginTop: '8px' }}>{errors.lastname}</div>
                        )}

                        <TextField
                            id="standard-basic"
                            variant="standard"
                            type="number"
                            name="number"
                            value={values.number}
                            onChange={handleChange}
                            onBlur={formik.handleBlur}
                        />

                    </FormControl>
                </Box>
                <Box sx={{ m: 3 }}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Contact</FormLabel>
                        <TextField
                            id="standard-basic"
                            variant="standard"
                            type="text"
                            name="contact"
                            value={values.contact}
                            onChange={handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {errors.contact && (
                            <div style={{ color: 'red', marginTop: '8px' }}>{errors.contact}</div>
                        )}
                    </FormControl>
                </Box>
                <Box sx={{ m: 3 }}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Password</FormLabel>
                        <TextField
                            id="standard-basic"
                            variant="standard"
                            type="text"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {errors.password && (
                            <div style={{ color: 'red', marginTop: '8px' }}>{errors.password}</div>
                        )}
                    </FormControl>
                </Box>

                <Box sx={{ m: 3 }}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Message</FormLabel>
                        <TextField
                            id="standard-basic"
                            variant="standard"
                            multiline
                            rows={2}
                            type="text"
                            name="message"
                            value={values.message}
                            onChange={handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {errors.message && (
                            <div style={{ color: 'red', marginTop: '8px' }}>{errors.message}</div>
                        )}
                    </FormControl>
                </Box>
                <Box sx={{ m: 3 }}>

                    <input
                        id="image"
                        name="image"
                        type="file"
                        onChange={(event) => {
                            setFieldValue("image", event.currentTarget.files[0]);
                        }}
                    />
                    {errors.image && touched.image && (
                        <div style={{ color: 'red' }}>{errors.image}</div>
                    )}
                </Box>
                <Box sx={{ m: 3 }}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Age</FormLabel>
                        <TextField
                            id="standard-basic"
                            variant="standard"
                            type="date"
                            name="age"
                            value={values.age}
                            onChange={handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {errors.age && (
                            <div style={{ color: 'red', marginTop: '8px' }}>{errors.age}</div>
                        )}
                    </FormControl>
                </Box>
                <Box sx={{ display: 'flex' }}>
                    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                        <FormLabel component="legend">Hobbies</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={reading}
                                        onChange={handleCheckChange}
                                        name="reading"
                                    />
                                }
                                label="Reading"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={dance}
                                        onChange={handleCheckChange}
                                        name="dance"
                                    />
                                }
                                label="Dance"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={cooking}
                                        onChange={handleCheckChange}
                                        name="cooking"
                                    />
                                }
                                label="Cooking"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={traveling}
                                        onChange={handleCheckChange}
                                        name="traveling"
                                    />
                                }
                                label="Traveling"
                            />
                             <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={playing}
                                        onChange={handleCheckChange}
                                        name="playing"
                                    />
                                }
                                label="playing"
                            />
                        </FormGroup>
                        {errors.checkboxes && (
                            <div style={{ color: 'red', marginTop: '8px' }}>{errors.checkboxes}</div>
                        )}
                    </FormControl>
                </Box>
                <Box sx={{ m: 3 }}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="gender"
                            value={values.gender}
                            onChange={handleChange}
                        >
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                        </RadioGroup>
                        {errors.gender && (
                            <div style={{ color: 'red', marginTop: '8px' }}>{errors.gender}</div>
                        )}
                    </FormControl>
                </Box>

                <Button type="submit" variant='outlined'>Submit</Button>
            </form>
        </div>
    );
}

export default Validation;

