
import {Controller, useFormContext} from "react-hook-form";
import classes from './mySelect.module.scss'
export default function MySelect({name, label, options, callback, ...props}) {
    const methods = name && useFormContext();

  
    return (
          <Controller
              name={name}
              control={methods.control}
              defaultValue={options?.length ? options[0].value : ''}
              render={({ field }) => (
                  <label>
                      <p>{label}:</p>
                      <select
                          {...field}
                          {...props}
                          onChange={(event) => {
                              field.onChange(event.target.value);
                              callback && callback(event.target.value);
                          }}
                          className={classes.select}
                      >
                          {options.length
                              ? options.map(option =>
                                  <option key={option.value} value={option.value} className={classes.option}>{option.label}</option>
                              )
                              : <option className={classes.option} >немає</option>
                          }
                      </select>
                  </label>
              )}
          />
    );
  }