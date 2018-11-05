import React,{Fragment} from "react";
import {
  withStyles
} from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";


const styles = theme => ({
  cssLabel: {
    fontSize: 2 + "rem",
    "&$cssFocused": {
      color: "rgba(69, 182, 73, 0.7)"
    }
  },
  cssFocused: { fontSize: 2 + "rem", width: "100%" },
  cssUnderline: {
    "&:after": {
      borderBottomColor: "rgba(69, 182, 73, 0.7)"
    }
  }

});
const emailInput = ({
  noviError,
  type,
  name,
  input,
  label,
  meta: { touched, error },
  ...custom,
  classes}) => {
    
  
  
  return (
   
    
 <Fragment>
      
  
   
        <FormControl style={{width:'90%'}} error={touched && (error || noviError)?true:false } aria-describedby="name-error-text">
          <InputLabel

            FormLabelClasses={touched && error? {
              root: classes.cssLabel}:
              {
              root: classes.cssLabel,
              focused: classes.cssFocused
            }}
            htmlFor={name}
          >
           {touched && (error || noviError) ? (error||noviError) : label}
          </InputLabel>

          <Input
            name={name}
            {...input}
            {...custom}
            className={classes.cssFocused}
            type={type}
            classes={{
              underline: classes.cssUnderline
            }}
            id={name}
          />
         
        </FormControl>
        </Fragment>
    
  );
};

export default withStyles(styles)(emailInput);
