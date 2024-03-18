import React from "react";
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    TextField
} from "@material-ui/core";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "../../state/auth-reducer/auth-reducer";
import {AppRootStateType} from "../../state/store";
import {Navigate} from "react-router-dom";
import {useAppWithRedux} from "../../hooks/useAppWithRedux";


export const Login = () => {

    const dispatch = useDispatch()
    const {isLoggedIn} = useAppWithRedux()

    const formik = useFormik({
        validate: (values)=>{
            if(!values.email) {return {email: "Email is required"}}
            if(!values.password) {return {email: "Password is required"}}
        },
        initialValues:{
            email: "",
            password:"",
            rememberMe: false
        },
        onSubmit: values => {
            dispatch(loginTC(values))
            // alert(JSON.stringify(values, null, 2))
        }
    })

    if(isLoggedIn) {return <Navigate to={"/"} />}

    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <p>
                                To log in get registered
                                <a href={'https://social-network.samuraijs.com/'} target={'_blank'}>
                                    here
                                </a>
                            </p>
                            <p>or use common test account credentials:</p>
                            <p>Email: free@samuraijs.com</p>
                            <p>Password: free</p>
                        </FormLabel>
                        <FormGroup>
                            <TextField label="Email" margin="normal"
                                       {...formik.getFieldProps("email")}
                            />
                            {formik.errors.email? <div>{formik.errors.email}</div> : null}
                            <TextField type="password" label="Password" margin="normal"
                                       {...formik.getFieldProps("password")}
                            />
                            {formik.errors.password? <div>{formik.errors.password}</div> : null}
                            <FormControlLabel label={'Remember me'}
                                              control={<Checkbox
                                                {...formik.getFieldProps("rememberMe")}
                                                checked={formik.values.rememberMe}
                                              />}
                            />
                            <Button type={'submit'} variant={'contained'} color={'primary'}>
                                Login
                            </Button>
                        </FormGroup>
                    </FormControl>
                </form>

            </Grid>
        </Grid>
    )
}