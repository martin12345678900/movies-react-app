import React, { FormEvent } from "react";
import classes from "./Form.module.css";

type FormProps = {
    formTitle: string;
    onSubmitHandler: (event: FormEvent<HTMLFormElement>) => void;
}

const Form: React.FC<FormProps> = ({ formTitle, onSubmitHandler, children }) => {
    return (
        <section className={classes.formwrapper}>
            <form onSubmit={onSubmitHandler}>
                <h2 className={classes.formwrappertitle}>{formTitle}</h2>
                {children}
            </form>
        </section>
    );
}

export default Form;