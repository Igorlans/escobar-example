
import styles from './input.module.scss'

import {useFormContext} from "react-hook-form";

const Input = ({label, style, name, type, ...props}) => {
    const methods = name && useFormContext();
    const isRegistered = name && {...methods.register(name)};

    return (
        <label>
            <p>{label}:</p>
            <input
                {...isRegistered}
                {...props}
                type={type}
                style={style}
                className={styles.input}
            />
            {!!methods.formState.errors[name] &&
                <p style={{fontSize: 13, color: "#f52323"}}>{methods.formState.errors[name]?.message ?? ''}</p>
            }
        </label>
      );
}

export default Input;