import React from "react";
import { useField } from "../hooks/useField";

const Form = () => {
  const name = useField("text", "name");
  const born = useField("date");
  const height = useField("number", "height");

  return (
    <div>
      <form>
        <input
          type={name.type}
          value={name.value}
          onChange={name.onChange}
          placeholder={name.placeholder}
        />
        {/*simplified form*/}
        <input {...name} />
        <input {...born} />
        <input {...height} />
      </form>
    </div>
  );
};

export default Form;
