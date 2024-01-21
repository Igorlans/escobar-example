
import styles from './textarea.module.scss'
import {useFormContext} from "react-hook-form";

const Textarea = ({label, style, name, type, ...props}) => {
    const methods = name && useFormContext();
    const isRegistered = name && {...methods.register(name)};

    return (
        <label>
            <p>{label}:</p>
            <textarea
                {...props}
                className={styles.textarea}
                {...isRegistered}
            />
        </label>
    );
}

export default Textarea;